import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { registrationSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const validatedData = registrationSchema.parse(body);

		const supabase = await createClient()
		const { data, error } = await supabase.from("registrations").insert([
			{
				parent_name: validatedData.parentName,
				email: validatedData.email,
				phone: validatedData.phone,
				student_name: validatedData.childName,
				grade: validatedData.childClass,
				course_id: validatedData.course,
				branch_id: validatedData.branch,
				status: "pending",
			},
		]);

		if (error) {
			console.error("Supabase error:", error);
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({ message: "Registration successful", data }, { status: 201 });
	} catch (error: any) {
		console.error("Registration error:", error);
		if (error.name === "ZodError") {
			return NextResponse.json({ error: error.errors }, { status: 400 });
		}
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
