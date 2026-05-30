import { NextResponse } from "next/server";

const COMPANY_EMAIL = "metal.tronixx@gmail.com";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const {
      name,
      company,
      email,
      phone,
      projectType,
      material,
      quantity,
      message,
    } = data;

    // Format the service type for readability
    const serviceLabels: Record<string, string> = {
      "laser-cutting": "CNC Laser Cutting",
      "press-brake": "Press Brake Forming",
      "tube-cutting": "Tube & Pipe Cutting",
      "full-fabrication": "Custom Fabrication",
      "assembly": "Assembly Services",
      "other": "Other / Multiple Services",
    };

    // Format the material for readability
    const materialLabels: Record<string, string> = {
      "carbon-steel": "Carbon Steel (A36, 1018, etc.)",
      "stainless": "Stainless Steel (304, 316, etc.)",
      "aluminum": "Aluminum (5052, 6061, etc.)",
      "ar-plate": "AR Plate (AR400, AR500, Hardox)",
      "copper": "Copper / Brass",
      "other": "Other / Multiple Materials",
    };

    // Format quantity for readability
    const quantityLabels: Record<string, string> = {
      "prototype": "Prototype (1-5 pieces)",
      "small": "Small Run (6-50 pieces)",
      "medium": "Medium Run (51-500 pieces)",
      "production": "Production (500+ pieces)",
      "Rate Production": "Rate Production / Blanket Order",
    };

    // Build styled HTML email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request - Metal Tronix</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0f1a; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0f1a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111827; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                Metal Tronix
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                New Quote Request Received
              </p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Customer Information Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 1px solid #334155;">
                    <h2 style="margin: 0; color: #3b82f6; font-size: 18px; font-weight: bold;">
                      Customer Information
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 15px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td width="140" style="color: #94a3b8; font-size: 14px; vertical-align: top;">Name:</td>
                        <td style="color: #f1f5f9; font-size: 14px; font-weight: 500;">${name}</td>
                      </tr>
                      ${company ? `
                      <tr>
                        <td width="140" style="color: #94a3b8; font-size: 14px; vertical-align: top;">Company:</td>
                        <td style="color: #f1f5f9; font-size: 14px; font-weight: 500;">${company}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td width="140" style="color: #94a3b8; font-size: 14px; vertical-align: top;">Email:</td>
                        <td style="color: #f1f5f9; font-size: 14px;">
                          <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      ${phone ? `
                      <tr>
                        <td width="140" style="color: #94a3b8; font-size: 14px; vertical-align: top;">Phone:</td>
                        <td style="color: #f1f5f9; font-size: 14px;">
                          <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Project Details Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 1px solid #334155;">
                    <h2 style="margin: 0; color: #06b6d4; font-size: 18px; font-weight: bold;">
                      Project Details
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 15px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td width="140" style="color: #94a3b8; font-size: 14px; vertical-align: top;">Service:</td>
                        <td style="color: #f1f5f9; font-size: 14px; font-weight: 500;">
                          ${serviceLabels[projectType] || projectType}
                        </td>
                      </tr>
                      ${material ? `
                      <tr>
                        <td width="140" style="color: #94a3b8; font-size: 14px; vertical-align: top;">Material:</td>
                        <td style="color: #f1f5f9; font-size: 14px; font-weight: 500;">
                          ${materialLabels[material] || material}
                        </td>
                      </tr>
                      ` : ''}
                      ${quantity ? `
                      <tr>
                        <td width="140" style="color: #94a3b8; font-size: 14px; vertical-align: top;">Quantity:</td>
                        <td style="color: #f1f5f9; font-size: 14px; font-weight: 500;">
                          ${quantityLabels[quantity] || quantity}
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Message Section -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 1px solid #334155;">
                    <h2 style="margin: 0; color: #3b82f6; font-size: 18px; font-weight: bold;">
                      Project Description
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 15px;">
                    <div style="background-color: #1e293b; border-radius: 8px; padding: 20px; border-left: 4px solid #3b82f6;">
                      <p style="margin: 0; color: #f1f5f9; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0f1a; padding: 20px 30px; text-align: center; border-top: 1px solid #334155;">
              <p style="margin: 0 0 5px 0; color: #94a3b8; font-size: 12px;">
                This quote request was submitted via the Metal Tronix website
              </p>
              <p style="margin: 0; color: #64748b; font-size: 11px;">
                ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Plain text version for email clients that don't support HTML
    const textContent = `
NEW QUOTE REQUEST - METAL TRONIX
================================

CUSTOMER INFORMATION
--------------------
Name: ${name}
${company ? `Company: ${company}` : ''}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}

PROJECT DETAILS
---------------
Service: ${serviceLabels[projectType] || projectType}
${material ? `Material: ${materialLabels[material] || material}` : ''}
${quantity ? `Quantity: ${quantityLabels[quantity] || quantity}` : ''}

PROJECT DESCRIPTION
-------------------
${message}

================================
Submitted: ${new Date().toLocaleString()}
    `;

    // Use Resend or another email service
    // For now, we'll use a simple fetch to a webhook or email service
    // You can replace this with your preferred email provider
    
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      // Send via Resend
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Metal Tronix <onboarding@resend.dev>",
          to: [COMPANY_EMAIL],
          subject: `New Quote Request from ${name}${company ? ` - ${company}` : ''}`,
          html: htmlContent,
          text: textContent,
          reply_to: email,
        }),
      });

      if (!resendResponse.ok) {
        const error = await resendResponse.json();
        console.error("Resend error:", error);
        throw new Error("Failed to send email");
      }
    } else {
      // Log the email data for development/testing
      console.log("=== QUOTE REQUEST EMAIL ===");
      console.log("To:", COMPANY_EMAIL);
      console.log("From:", email);
      console.log("Subject:", `New Quote Request from ${name}${company ? ` - ${company}` : ''}`);
      console.log("---");
      console.log(textContent);
      console.log("===========================");
      
      // In production without Resend, you might want to:
      // 1. Store in database
      // 2. Use another email service
      // 3. Send to a webhook
    }

    return NextResponse.json({ 
      success: true, 
      message: "Quote request sent successfully" 
    });
    
  } catch (error) {
    console.error("Error sending quote request:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send quote request" },
      { status: 500 }
    );
  }
}
