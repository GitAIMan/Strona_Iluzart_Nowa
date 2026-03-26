import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@backend/lib/prisma";
import { contactFormSchema } from "@shared/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactFormSchema.parse(body);

    const submission = await prisma.contactSubmission.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        message: validated.message,
        eventType: validated.eventType || null,
        eventDate: validated.eventDate
          ? new Date(validated.eventDate)
          : null,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
