"use server";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/emails";
import {
	validateRequestSchema,
	updateProfileSchema,
} from "@/utils/validateRequest";
import { ZodFormattedError } from "zod";

export default async function updateProfile(
	userId: string,
	formData: FormData,
) {
	const validation = validateRequestSchema(
		updateProfileSchema,
		{
			name: formData.get("name"),
			mobile: formData.get("mobile"),
			college: formData.get("college"),
		},
		false,
	);

	if (validation instanceof Response || validation.success === false) {
		return validation;
	}

	const data = validation.data;

	await db.user.update({
		where: {
			id: userId,
		},
		data: {
			name: data.name,
			mobile: data.mobile,
			college: {
				connect: {
					id: data.college,
				},
			},
		},
	});

	revalidatePath("/");
	return "Profile updated successfully";
}
