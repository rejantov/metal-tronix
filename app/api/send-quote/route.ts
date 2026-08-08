import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const COMPANY_EMAIL = "metal.tronixx@gmail.com";

// Support both old (ANON_KEY) and new (PUBLISHABLE_KEY) Supabase env var names
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, supabaseKey);

const serviceLabels: Record<string, string> = {
  "laser-cutting": "CNC Laser Cutting",
  "press-brake": "Press Brake Forming",
  "tube-cutting": "Tube & Pipe Cutting",
  "full-fabrication": "Custom Fabrication",
  assembly: "Assembly Services",
  other: "Other / Multiple Services",
};

const materialLabels: Record<string, string> = {
  "carbon-steel": "Carbon Steel (A36, 1018, etc.)",
  stainless: "Stainless Steel (304, 316, etc.)",
  aluminum: "Aluminum (5052, 6061, etc.)",
  "ar-plate": "AR Plate (AR400, AR500, Hardox)",
  copper: "Copper / Brass",
  other: "Other / Multiple Materials",
};

const quantityLabels: Record<string, string> = {
  prototype: "Prototype (1–5 pieces)",
  small: "Small Run (6–50 pieces)",
  medium: "Medium Run (51–500 pieces)",
  production: "Production (500+ pieces)",
  kanban: "Kanban / Blanket Order",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name        = formData.get("name")        as string;
    const company     = formData.get("company")     as string | null;
    const email       = formData.get("email")       as string;
    const phone       = formData.get("phone")       as string | null;
    const projectType = formData.get("projectType") as string;
    const material    = formData.get("material")    as string | null;
    const quantity    = formData.get("quantity")    as string | null;
    const message     = formData.get("message")     as string;
    const rawFiles    = formData.getAll("files")    as File[];
    const attachedFiles = rawFiles.filter((f) => f && f.size > 0);

    // ── 1. Upload attachments to Supabase storage ─────────────────────────
    const fileLinks: { name: string; url: string }[] = [];
    for (const file of attachedFiles) {
      const ext = file.name.split(".").pop() || "bin";
      const storageName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("quote-attachments")
        .upload(storageName, file, { contentType: file.type || "application/octet-stream" });
      if (!uploadErr) {
        const { data: { publicUrl } } = supabase.storage
          .from("quote-attachments")
          .getPublicUrl(storageName);
        fileLinks.push({ name: file.name, url: publicUrl });
      } else {
        console.error("File upload error:", uploadErr);
      }
    }

    // ── 2. Save to Supabase ───────────────────────────────────────────────
    const { error: dbError } = await supabase.from("quotes").insert({
      name,
      company: company || null,
      email,
      phone: phone || null,
      service: projectType,
      material: material || null,
      quantity: quantity || null,
      message,
      read: false,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { success: false, message: `Database error: ${dbError.message}` },
        { status: 500 }
      );
    }

    // ── 2. Send email ─────────────────────────────────────────────────────
    const serviceName = serviceLabels[projectType] || projectType;
    const materialName = material ? (materialLabels[material] || material) : null;
    const quantityName = quantity ? (quantityLabels[quantity] || quantity) : null;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0f1a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.3);">
        <tr>
          <td style="background:linear-gradient(135deg,#3b82f6,#06b6d4);padding:30px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:28px;font-weight:bold;">Metal Tronix</h1>
            <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:14px;">New Quote Request Received</p>
          </td>
        </tr>
        <tr><td style="padding:30px;">
          <h2 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #334155;padding-bottom:10px;margin-bottom:15px;">Customer Information</h2>
          <table width="100%" cellpadding="6" cellspacing="0">
            <tr><td width="130" style="color:#94a3b8;font-size:14px;">Name:</td><td style="color:#f1f5f9;font-size:14px;font-weight:500;">${name}</td></tr>
            ${company ? `<tr><td style="color:#94a3b8;font-size:14px;">Company:</td><td style="color:#f1f5f9;font-size:14px;font-weight:500;">${company}</td></tr>` : ""}
            <tr><td style="color:#94a3b8;font-size:14px;">Email:</td><td style="font-size:14px;"><a href="mailto:${email}" style="color:#3b82f6;">${email}</a></td></tr>
            ${phone ? `<tr><td style="color:#94a3b8;font-size:14px;">Phone:</td><td style="font-size:14px;"><a href="tel:${phone}" style="color:#3b82f6;">${phone}</a></td></tr>` : ""}
          </table>
          <h2 style="color:#06b6d4;font-size:16px;border-bottom:1px solid #334155;padding-bottom:10px;margin:25px 0 15px;">Project Details</h2>
          <table width="100%" cellpadding="6" cellspacing="0">
            <tr><td width="130" style="color:#94a3b8;font-size:14px;">Service:</td><td style="color:#f1f5f9;font-size:14px;font-weight:500;">${serviceName}</td></tr>
            ${materialName ? `<tr><td style="color:#94a3b8;font-size:14px;">Material:</td><td style="color:#f1f5f9;font-size:14px;font-weight:500;">${materialName}</td></tr>` : ""}
            ${quantityName ? `<tr><td style="color:#94a3b8;font-size:14px;">Quantity:</td><td style="color:#f1f5f9;font-size:14px;font-weight:500;">${quantityName}</td></tr>` : ""}
          </table>
          <h2 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #334155;padding-bottom:10px;margin:25px 0 15px;">Project Description</h2>
          <div style="background:#1e293b;border-radius:8px;padding:20px;border-left:4px solid #3b82f6;">
            <p style="margin:0;color:#f1f5f9;font-size:14px;line-height:1.6;white-space:pre-wrap;">${message}</p>
          </div>
          ${fileLinks.length > 0 ? `
          <h2 style="color:#3b82f6;font-size:16px;border-bottom:1px solid #334155;padding-bottom:10px;margin:25px 0 15px;">Attachments (${fileLinks.length})</h2>
          <table width="100%" cellpadding="6" cellspacing="0">
            ${fileLinks.map((f) => `
            <tr>
              <td style="font-size:14px;">
                <a href="${f.url}" style="color:#3b82f6;text-decoration:none;">📎 ${f.name}</a>
              </td>
            </tr>`).join("")}
          </table>` : ""}
        </td></tr>
        <tr>
          <td style="background:#0a0f1a;padding:20px 30px;text-align:center;border-top:1px solid #334155;">
            <p style="margin:0;color:#94a3b8;font-size:12px;">Submitted via metal-tronix.com &mdash; ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const textContent = [
      "NEW QUOTE REQUEST — METAL TRONIX",
      "=".repeat(40),
      "",
      "CUSTOMER INFORMATION",
      `Name:     ${name}`,
      company ? `Company:  ${company}` : "",
      `Email:    ${email}`,
      phone ? `Phone:    ${phone}` : "",
      "",
      "PROJECT DETAILS",
      `Service:  ${serviceName}`,
      materialName ? `Material: ${materialName}` : "",
      quantityName ? `Quantity: ${quantityName}` : "",
      "",
      "PROJECT DESCRIPTION",
      message,
      ...(fileLinks.length > 0
        ? ["", `ATTACHMENTS (${fileLinks.length})`, ...fileLinks.map((f) => `  ${f.name}: ${f.url}`)]
        : []),
      "",
      "=".repeat(40),
      `Submitted: ${new Date().toLocaleString()}`,
    ].join("\n");

    const emailSent = await sendEmail({
      subject: `New Quote Request from ${name}${company ? ` — ${company}` : ""}${fileLinks.length > 0 ? ` [${fileLinks.length} file${fileLinks.length > 1 ? "s" : ""}]` : ""}`,
      html: htmlContent,
      text: textContent,
      replyTo: email,
    });

    if (!emailSent) {
      // Quote was saved, email just failed — still return success so user isn't confused
      console.warn("Quote saved to DB but email notification failed.");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("send-quote error:", error);
    return NextResponse.json({ success: false, message: "Server error. Please try again." }, { status: 500 });
  }
}

async function sendEmail({
  subject,
  html,
  text,
  replyTo,
}: {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}): Promise<boolean> {
  // ── Option A: Resend ──────────────────────────────────────────────────
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Metal Tronix <onboarding@resend.dev>",
          to: [COMPANY_EMAIL],
          subject,
          html,
          text,
          reply_to: replyTo,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("Resend error:", err);
        return false;
      }
      return true;
    } catch (e) {
      console.error("Resend exception:", e);
      return false;
    }
  }

  // ── Option B: Gmail SMTP via nodemailer ───────────────────────────────
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Metal Tronix" <${process.env.GMAIL_USER}>`,
        to: COMPANY_EMAIL,
        replyTo,
        subject,
        html,
        text,
      });
      return true;
    } catch (e) {
      console.error("Gmail SMTP error:", e);
      return false;
    }
  }

  // ── No email provider configured ─────────────────────────────────────
  console.log("No email provider configured. Quote saved to DB only.");
  console.log("Subject:", subject);
  return false;
}
