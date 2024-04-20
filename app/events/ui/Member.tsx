"use client";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/app/components/Input";
import { twMerge } from "tailwind-merge";

interface MemberProps {
	loading: boolean;
	isEditable: boolean;
}

const Member = ({ loading, isEditable }: MemberProps) => {
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "members",
	});

	return (
		<div className="flex flex-col">
			<div>
				<label htmlFor="name" className="pb-2">
					Team Members
				</label>
				{fields.map((member: Record<"id", string>, index: number) => (
					<Controller
						name={`members[${index}]`}
						key={member.id}
						control={control}
						render={({ field }) => (
							<div className="w-full flex mt-2">
								<Input
									ref={field.ref}
									className="rounded-r-none"
									disabled={loading || !isEditable}
									placeholder="Github Username"
									onChange={field.onChange}
									onBlur={field.onBlur}
									name={`members.${index}.value`}
									value={field.value}
								/>
								<span
									className={twMerge(
										loading || !isEditable
											? "cursor-not-allowed"
											: "cursor-pointer bg-white/25",
										"text-red font-semibold bg-white/15 flex items-center px-2 border-l border-l-white/15 rounded-r-md",
									)}
									onKeyDown={() => !loading && isEditable && remove(index)}
									onClick={() => !loading && isEditable && remove(index)}
								>
									Remove
								</span>
							</div>
						)}
					/>
				))}
			</div>

			{fields.length < 3 && (
				<div
					className="flex items-center mt-4 text-primary gap-2 py-1 justify-center border-1 pb-1 transition-all duration-200 ease-in-out border-primary rounded-md bg-primary/15 hover:bg-primary/15 cursor-pointer hover:border-dashed"
					onClick={() => (loading || !isEditable ? null : append(""))}
					onKeyDown={() => (loading || !isEditable ? null : append(""))}
				>
					<img className="h-10 w-10" src="/images/add-square.svg" alt="add" />
					<span>ADD TEAM MEMBER</span>
				</div>
			)}
		</div>
	);
};

export { Member };
