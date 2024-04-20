"use server";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/emails";
import { validateRequest, updateProfileSchema } from "@/utils/validateRequest";

export default async function updateProfile(
	userId: string,
	formData: FormData,
) {
	const data = validateRequest(updateProfileSchema, {
		name: formData.get("namee"),
		mobile: formData.get("mobile"),
		college: formData.get("college"),
	});

	if (data instanceof Response) {
		return data;
	}

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
