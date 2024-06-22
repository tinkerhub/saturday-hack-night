"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";
import type { User } from "lucia";
import { startTransition, useEffect, useState } from "react";
import { Input } from "@/app/components/Input";
import { X } from "lucide-react";
import { Button } from "@/app/components/Button";
import type { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createTeam from "./actions";
import { updateTeamSchema } from "@/utils/validateRequest";
import { Member } from "../Member";

type FormData = z.infer<typeof updateTeamSchema>;

export const UpdateTeamModal = ({
	user,
	team,
	isEditable,
}: {
	user: User;
	team: {
		id: string;
		name: string;
		repo: string;
		eventId: string;
		members: {
			role: string | null;
			userId: string;
			user: {
				githubId: string;
			};
		}[];
	};
	isEditable: boolean;
}) => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const [eventID, setEventID] = useState<string | null>(null);

	const searchParams = useSearchParams();
	const eventId = searchParams.get("eventId");

	const methods = useForm<FormData>({
		resolver: zodResolver(updateTeamSchema),
	});

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = methods;

	useEffect(() => {
		setEventID(searchParams.get("eventId"));

		const isOpen = !!searchParams.get("update") && !!team && !!eventID;
		setIsOpen(isOpen);

		if (isOpen) {
			setValue("name", team.name);
			setValue("repo", team.repo);
			setValue(
				"members",
				team.members.map((member) => member.user.githubId),
			);
		}
	}, [searchParams, eventID, team, setValue]);

	const pathName = usePathname();
	const onOpenChange = () => {
		router.push(pathName);
	};

	const createTeamWithBindings = createTeam.bind(null, user.id, eventID);

	const onSubmit = async (data: FormData) => {
		const isTeamLeadIncluded = data.members.findIndex(
			(member) => member.toLowerCase() === user.githubId.toLowerCase(),
		);

		if (isTeamLeadIncluded !== -1) {
			data.members.splice(isTeamLeadIncluded, 1);
		}
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed transition-all animate-overlayShow ease-in-out inset-0 z-40 bg-black/70" />
				<Dialog.Content
					className="fixed max-w-[1000px] md:h-auto w-full h-full md:w-5/6 top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white animate-contentShow rounded-lg p-8 min-w-container"
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<div className="flex justify-end ">
						<span className="border-2 rounded-full  border-red">
							<X
								aria-label="Close Modal"
								className="cursor-pointer text-red"
								onClick={onOpenChange}
							/>
						</span>
					</div>

					<Dialog.Title className="text-4xl font-bold">
						<div className="flex justify-between"> Team Details</div>
					</Dialog.Title>
					<Dialog.Description className="text-white/40 mb-6 text-xs">
						<div className="bg-green/15 rounded-md text-green p-1">
							Your Team Members will appear here once they accept your team
							invitation
						</div>

						<div className="bg-red/15 mt-1 rounded-md text-red p-1">
							Teams should have a leader and atleast 1 member
						</div>
						{errors.members && (
							<div className="bg-red/15 mt-1 rounded-md text-red p-1">
								{errors.members.message}
							</div>
						)}
					</Dialog.Description>
					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="flex flex-col items-center md:flex-row gap-4 md:gap-8">
								<div className="flex flex-col w-full gap-4">
									<div>
										<label htmlFor="name" className="pb-2">
											Team Name
										</label>
										<Input
											type="text"
											required
											disabled
											spellCheck="false"
											placeholder="Team name"
											{...register("name")}
										/>
									</div>
									<div>
										<label htmlFor="repo" className="mb-2">
											Github Repository
										</label>
										<Input
											type="text"
											id="repo"
											placeholder="www.github.com/example/exampleRepo"
											disabled
											{...register("repo")}
										/>
									</div>
								</div>
								<div className="w-full">
									<Member isEditable={isEditable} loading={isSubmitting} />
									{errors.members && (
										<div className="bg-red/15 mt-2 text-red p-1 rounded-md w-full">
											User not found or team should have at least 1 member
										</div>
									)}
								</div>
							</div>

							<div className="mt-6 flex justify-end">
								<Button
									onClick={() => {
										handleSubmit(onSubmit);
									}}
									loading={isSubmitting}
									type="submit"
									className="w-64 text-secondary bg-white font-semibold py-2 px-4 rounded"
								>
									{isEditable ? "Update Team" : "Close"}
								</Button>
							</div>
						</form>
					</FormProvider>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
