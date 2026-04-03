import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { registrationSchema } from "@/lib/validations/admin";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const validatedData = registrationSchema.parse(body);
		const supabase = await createClient();

		const { data, error } = await supabase.from("registrations").insert([
			{
				parent_name: validatedData.parentName,
				email: validatedData.email || null,
				phone: validatedData.phone,
				student_name: validatedData.childName || validatedData.parentName, // Use parentName if childName is missing
				grade: validatedData.childClass || null,
				course_id: validatedData.course && validatedData.course.length > 0 ? validatedData.course : null,
				branch_id: validatedData.branch && validatedData.branch.length > 0 ? validatedData.branch : null,
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

