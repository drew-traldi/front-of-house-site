// Lead endpoint for the contact form. Emails each inquiry to the studio
// through SendGrid, with Reply-To set to the visitor so a reply goes straight
// to them. Runs on the FOH server (Astro Node adapter); the SendGrid key lives
// only in the server's environment.
//
// Env (runtime, set in Coolify):
//   SENDGRID_API_KEY   a SendGrid key allowed to send mail
//   LEAD_TO_EMAIL      where leads go (drew@fohrestaurants.com)
//   LEAD_FROM_EMAIL    a SendGrid-verified sender
//   LEAD_FROM_NAME     optional display name (default "Front of House website")
//   LEAD_CONFIRM_FROM  optional sender of the prospect's thank-you email
//                      (default LEAD_TO_EMAIL, so replies reach the studio)
//
// After the studio email sends, the prospect gets a branded thank-you email
// (src/lib/lead-emails.ts). A failure there is logged and never blocks the lead.
//
// If sending fails, the lead is written to the server log (so it is never
// silently dropped) and the endpoint returns 502; the form then falls back
// to opening the visitor's email app, exactly as before.
import type { APIRoute } from "astro";
import { site } from "../../data/site.ts";
import { buildConfirmation } from "../../lib/lead-emails.ts";

export const prerender = false;

const RATE_LIMIT = 5; // submissions per IP …
const RATE_WINDOW_MS = 10 * 60_000; // … per 10 minutes
const LIMITS: Record<string, number> = {
  name: 120,
  restaurant: 160,
  locations: 40,
  email: 200,
  phone: 40,
  tier: 60,
  build_brief: 2000,
  message: 4000,
};

const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function reply(ok: boolean, message: string, status = 200): Response {
  return new Response(JSON.stringify({ ok, message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function env(name: string): string {
  return ((import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name] ?? "").trim();
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Same-origin guard: the main domain, its subdomains, previews, local dev.
  const origin = request.headers.get("origin");
  if (origin) {
    let host = "";
    try {
      host = new URL(origin).hostname;
    } catch {
      /* rejected below */
    }
    const siteHost = new URL(site.url).hostname;
    const allowed =
      host === siteHost ||
      host.endsWith("." + siteHost) ||
      host.endsWith(".vercel.app") ||
      origin.startsWith("http://localhost");
    if (!allowed) return reply(false, "Not allowed.", 403);
  }

  let ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "";
  if (!ip) {
    try {
      ip = clientAddress ?? "unknown";
    } catch {
      ip = "unknown";
    }
  }
  if (rateLimited(ip)) {
    return reply(false, "Too many submissions. Please try again in a few minutes.", 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return reply(false, "Invalid request.", 400);
  }

  // Honeypot: real visitors never see or fill this field. Bots do.
  if (typeof body.company_website === "string" && body.company_website.trim()) {
    return reply(true, "Thanks, we'll be in touch within a business day.");
  }

  const lead: Record<string, string> = {};
  for (const [field, max] of Object.entries(LIMITS)) {
    const v = body[field];
    lead[field] = typeof v === "string" ? v.trim().slice(0, max) : "";
  }
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) {
    return reply(false, "Please include your name and a valid email.", 400);
  }

  const receivedAt = new Date().toISOString();
  const subject = `New build inquiry: ${lead.restaurant || lead.name}`;
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Restaurant", lead.restaurant || "n/a"],
    ["Locations", lead.locations || "n/a"],
    ["Email", lead.email],
    ["Phone", lead.phone || "n/a"],
    ["Interested in", lead.tier || "Not sure yet"],
    ["Build brief", lead.build_brief || "n/a"],
  ];
  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    lead.message || "(no message)",
    "",
    `Sent from the contact form at ${site.url}/contact on ${receivedAt}.`,
    "Reply to this email to answer the lead directly.",
  ].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#221C18">
<h2 style="margin:0 0 12px">${escapeHtml(subject)}</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#9A8E7E">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>
<p style="white-space:pre-wrap;margin:16px 0">${escapeHtml(lead.message || "(no message)")}</p>
<p style="color:#9A8E7E;font-size:13px">Sent from ${escapeHtml(site.url)}/contact on ${receivedAt}. Reply to this email to answer the lead directly.</p>
</div>`;

  const apiKey = env("SENDGRID_API_KEY");
  const to = env("LEAD_TO_EMAIL");
  const from = env("LEAD_FROM_EMAIL");
  if (!apiKey || !to || !from) {
    console.error("[lead] not configured; lead kept in log:", JSON.stringify({ receivedAt, ...lead }));
    return reply(false, "Our form is not set up yet.", 502);
  }

  const sandbox = env("LEAD_SANDBOX") === "1" ? { sandbox_mode: { enable: true } } : undefined;
  const sendMail = (payload: Record<string, unknown>) =>
    fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, mail_settings: sandbox }),
    });

  try {
    const res = await sendMail({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: env("LEAD_FROM_NAME") || "Front of House website" },
      reply_to: { email: lead.email, name: lead.name },
      subject,
      content: [
        { type: "text/plain", value: text },
        { type: "text/html", value: html },
      ],
      categories: ["foh-lead"],
    });
    if (res.ok) {
      console.log(`[lead] sent: ${lead.restaurant || lead.name} (${receivedAt})`);
      // Branded thank-you to the prospect. Never blocks or fails the lead.
      try {
        const confirm = buildConfirmation({ name: lead.name, restaurant: lead.restaurant });
        const confirmFrom = env("LEAD_CONFIRM_FROM") || to;
        const c = await sendMail({
          personalizations: [{ to: [{ email: lead.email, name: lead.name }] }],
          from: { email: confirmFrom, name: "Front of House" },
          reply_to: { email: to, name: "Front of House" },
          subject: confirm.subject,
          content: [
            { type: "text/plain", value: confirm.text },
            { type: "text/html", value: confirm.html },
          ],
          categories: ["foh-lead-confirmation"],
        });
        if (!c.ok) console.error(`[lead] confirmation SendGrid ${c.status}: ${(await c.text()).slice(0, 200)}`);
      } catch (err) {
        console.error("[lead] confirmation failed:", err);
      }
      return reply(true, "Thanks, we'll be in touch within a business day.");
    }
    console.error(`[lead] SendGrid ${res.status}: ${(await res.text()).slice(0, 300)}; lead kept in log:`, JSON.stringify({ receivedAt, ...lead }));
  } catch (err) {
    console.error("[lead] send failed:", err, "; lead kept in log:", JSON.stringify({ receivedAt, ...lead }));
  }
  return reply(false, "We couldn't send that just now.", 502);
};
