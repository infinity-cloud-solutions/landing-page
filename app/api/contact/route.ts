import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getResendClient } from "@/lib/resend";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email().max(200),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10).max(1500),
  locale: z.enum(["es", "en"]) 
});

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const parsed = bodySchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid request payload"
        },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      return NextResponse.json(
        {
          ok: false,
          error: "Server is missing CONTACT_EMAIL"
        },
        { status: 500 }
      );
    }

    const { name, email, company, phone, message, locale } = parsed.data;

    const resend = getResendClient();

    await resend.emails.send({
      from: "Infinity Cloud Solutions <noreply@infinitycloudsolutions.com>",
      to: contactEmail,
      subject: `Nuevo lead desde landing: ${name}`,
      reply_to: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company ?? "N/A"}`,
        `Phone: ${phone ?? "N/A"}`,
        `Locale: ${locale}`,
        "",
        message
      ].join("\n")
    });

    await resend.emails.send({
      from: "Infinity Cloud Solutions <noreply@infinitycloudsolutions.com>",
      to: email,
      subject: locale === "es" ? "Recibimos tu mensaje" : "We received your message",
      text:
        locale === "es"
          ? "Gracias por escribirnos. Nuestro equipo te contactará pronto."
          : "Thanks for reaching out. Our team will contact you shortly."
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact route error", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unexpected server error"
      },
      { status: 500 }
    );
  }
}
