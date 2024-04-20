import { type ZodFormattedError, z } from "zod";

const validateRequestSchema = <Input>(
	schema: z.ZodType<Input>,
	data: unknown,
	inResponseFormat = true,
):
	| {
			success: false;
			errors: ZodFormattedError<Input>;
	  }
	| {
			success: true;
			data: Input;
	  }
	| Response => {
	const response = schema.safeParse(data);

	if (!response.success) {
		const errors = response.error.format();

		if (inResponseFormat) {
			return new Response(JSON.stringify(errors), {
				status: 400,
			});
		}
		return {
			success: false,
			errors,
		};
	}
	return {
		success: true,
		data: response.data,
	};
};

const getResultsParamsSchema = z.object({
	eventID: z.string().uuid(),
});

const updateProfileSchema = z.object({
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

const createTeamSchema = z.object({
	name: z
		.string({
			invalid_type_error: "Enter valid Team Name",
		})
		.regex(/^[a-z|0-9]+$/gi),
	repo: z
		.string({
			invalid_type_error: "Enter valid Github repo URL",
		})
		.regex(/^https:\/\/github.com\/[^/]+\/[^/]+$/g),
	members: z.array(
		z.string({
			invalid_type_error: "Enter valid Github ID",
		}),
	),
});

export {
	getResultsParamsSchema,
	updateProfileSchema,
	createTeamSchema,
	validateRequestSchema,
};
