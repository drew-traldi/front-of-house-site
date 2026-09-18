// Branded "thanks, we got your note" email sent to a prospect after the
// contact form reaches the studio. Email-safe HTML: tables, inline styles,
// web-safe font stacks (Cormorant/Inter are not reliable in mail apps), no
// images, and a plain-text part. FOH house style: Paper ground, Ink text,
// one italic Ember word in the headline, no em dashes.
import { site, steps } from "../data/site.ts";

const C = {
  paper: "#FBF7F0",
  bone: "#F4ECDD",
  ink: "#221C18",
  body: "#4A4038",
  muted: "#9A8E7E",
  ember: "#C75B39",
  line: "#E4D9C4",
};
const SERIF = "'Cormorant Garamond', Cormorant, Georgia, 'Times New Roman', serif";
const SANS = "Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

// Only a short first name and restaurant name are echoed back, so the form
// cannot be used to push arbitrary text to someone else's inbox.
function clean(s: string, max: number): string {
  return s.replace(/[\r\n\t<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

export function buildConfirmation(lead: { name: string; restaurant?: string }) {
  const first = clean(lead.name.split(" ")[0] || "there", 40) || "there";
  const restaurant = clean(lead.restaurant || "", 60);
  const url = site.url.replace(/\/$/, "");
  const subject = `Thanks, ${first}. We got your note.`;
  const about = restaurant ? ` about ${restaurant}` : "";

  const stepRows = steps
    .map(
      (s) => `
      <tr>
        <td valign="top" style="width:44px;padding:0 0 18px 0;font-family:${SERIF};font-size:30px;line-height:30px;color:${C.ember};font-weight:700;">${esc(s.n)}</td>
        <td valign="top" style="padding:2px 0 18px 0;font-family:${SANS};">
          <div style="font-size:15px;line-height:20px;color:${C.ink};font-weight:600;">${esc(s.title)}</div>
          <div style="font-size:14px;line-height:21px;color:${C.body};padding-top:3px;">${esc(s.body)}</div>
        </td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">We got your note. Here is what happens next.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

      <tr><td style="padding:0 4px 18px 4px;border-bottom:3px solid ${C.ember};">
        <span style="font-family:${SERIF};font-size:30px;line-height:34px;color:${C.ink};font-weight:700;">Front of House</span><br>
        <span style="font-family:${SANS};font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${C.ember};font-weight:600;">Restaurant web studio</span>
      </td></tr>

      <tr><td style="background:#FFFFFF;border:1px solid ${C.line};border-top:0;padding:36px 36px 28px 36px;">
        <div style="font-family:${SANS};font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${C.ember};font-weight:600;padding-bottom:12px;">Note received</div>
        <h1 style="margin:0 0 18px 0;font-family:${SERIF};font-size:36px;line-height:40px;color:${C.ink};font-weight:700;">Thanks, ${esc(first)}. We saved you a <em style="color:${C.ember};font-style:italic;font-weight:600;">table</em>.</h1>
        <p style="margin:0 0 14px 0;font-family:${SANS};font-size:16px;line-height:26px;color:${C.body};">We got your note${esc(about)}. Drew or someone on our team will reach out within one business day to talk through what you need.</p>
        <p style="margin:0 0 26px 0;font-family:${SANS};font-size:16px;line-height:26px;color:${C.body};">No need to do anything else. If something comes to mind first, just reply to this email.</p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bone};border:1px solid ${C.line};">
          <tr><td style="padding:22px 22px 6px 22px;">
            <div style="font-family:${SANS};font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${C.ember};font-weight:600;padding-bottom:14px;">What happens next</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepRows}
            </table>
          </td></tr>
        </table>

        <p style="margin:26px 0 16px 0;font-family:${SANS};font-size:16px;line-height:26px;color:${C.body};">Want a head start? See the restaurants we have built for, or how pricing works.</p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:${C.ember};border-radius:999px;">
              <a href="${url}/work" style="display:inline-block;padding:13px 24px;font-family:${SANS};font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;">See our work</a>
            </td>
            <td style="width:10px;"></td>
            <td style="border:1px solid ${C.ink};border-radius:999px;">
              <a href="${url}/pricing" style="display:inline-block;padding:12px 23px;font-family:${SANS};font-size:15px;font-weight:600;color:${C.ink};text-decoration:none;">See pricing</a>
            </td>
          </tr>
        </table>

        <p style="margin:30px 0 0 0;font-family:${SANS};font-size:16px;line-height:26px;color:${C.body};">Talk soon,</p>
        <p style="margin:2px 0 0 0;font-family:${SERIF};font-size:22px;line-height:28px;color:${C.ink};font-weight:600;">Drew Traldi</p>
        <p style="margin:0;font-family:${SANS};font-size:14px;line-height:20px;color:${C.muted};">Front of House</p>
      </td></tr>

      <tr><td style="padding:22px 4px 0 4px;font-family:${SANS};font-size:12px;line-height:19px;color:${C.muted};">
        <a href="${esc(site.contact.phoneHref)}" style="color:${C.muted};text-decoration:none;">${esc(site.contact.phone)}</a>
        &nbsp;·&nbsp; <a href="mailto:${esc(site.contact.email)}" style="color:${C.muted};text-decoration:none;">${esc(site.contact.email)}</a>
        &nbsp;·&nbsp; <a href="${url}" style="color:${C.muted};text-decoration:none;">${esc(url.replace(/^https?:\/\//, ""))}</a><br>
        You are getting this one-time email because you sent us a message at ${esc(url.replace(/^https?:\/\//, ""))}. You are not on a mailing list.
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  const text = [
    `Thanks, ${first}. We saved you a table.`,
    "",
    `We got your note${about}. Drew or someone on our team will reach out within one business day to talk through what you need.`,
    "No need to do anything else. If something comes to mind first, just reply to this email.",
    "",
    "WHAT HAPPENS NEXT",
    ...steps.map((s) => `${s.n}. ${s.title}: ${s.body}`),
    "",
    `See our work: ${url}/work`,
    `See pricing: ${url}/pricing`,
    "",
    "Talk soon,",
    "Drew Traldi",
    "Front of House",
    `${site.contact.phone} · ${site.contact.email} · ${url}`,
    "",
    `You are getting this one-time email because you sent us a message at ${url}. You are not on a mailing list.`,
  ].join("\n");

  return { subject, html, text };
}
