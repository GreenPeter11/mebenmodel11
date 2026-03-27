import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registrationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid registration data", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, phone, courseId } = result.data;

    const registration = await prisma.registration.create({
      data: {
        fullName,
        email,
        phone,
        courseId,
      },
    });

    // Send confirmation email after registration (simulated placeholder)
    console.log(`Sending confirmation email to ${email} for registration ${registration.id}`);

    return NextResponse.json({
      message: "Registration successful. A confirmation email has been sent.",
      registration,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed due to server error" }, { status: 500 });
  }
}
