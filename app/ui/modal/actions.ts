"use server";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendEmail } from "@/emails";

const schema = z.object({
	name: z.string({
		invalid_type_error: "Enter name",
	}),
	mobile: z.string({
		invalid_type_error: "Enter phone number",
	}),
	college: z.string({
		invalid_type_error: "Enter college name",
	}),
});

export default async function updateProfile(
	userId: string,
	formData: FormData,
) {
	const validatedFields = schema.safeParse({
		name: formData.get("namee"),
		mobile: formData.get("mobile"),
		college: formData.get("college"),
	});

	if (!validatedFields.success) {
		return Object.values(validatedFields.error.errors)
			.map((error) => error.message)
			.join(", \n");
	}

	await db.user.update({
		where: {
			id: userId,
		},
		data: {
			name: validatedFields.data.name,
			mobile: validatedFields.data.mobile,
			college: {
				connect: {
					id: validatedFields.data.college,
				},
			},
		},
	});

	revalidatePath("/");
	return "Profile updated successfully";
}
