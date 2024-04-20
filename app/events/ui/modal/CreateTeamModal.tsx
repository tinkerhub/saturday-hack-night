"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";
import type { User } from "lucia";
import { startTransition, useEffect, useState } from "react";
import { Input } from "@/app/components/Input";
import { X } from "lucide-react";
import { Button } from "@/app/components/Button";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createTeam from "./actions";
import { createTeamSchema } from "@/utils/validateRequest";

type FormData = z.infer<typeof createTeamSchema>;

export const CreateTeamModal = ({
	user,
}: {
	user: User;
}) => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const [eventID, setEventID] = useState<string | null>(null);

	const searchParams = useSearchParams();
	const eventId = searchParams.get("eventId");

	useEffect(() => {
		setEventID(searchParams.get("eventId"));
		setIsOpen(!!searchParams.get("register"));
	}, [searchParams]);

	const pathName = usePathname();
	const onOpenChange = () => {
		router.push(pathName);
	};

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<FormData>({
		resolver: zodResolver(createTeamSchema),
	});

	const createTeamWithBindings = createTeam.bind(null, user.id, eventID);

	const onSubmit = handleSubmit((data) => {
		startTransition(() => {
			createTeamWithBindings(data);
		});
	});

	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed transition-all animate-overlayShow ease-in-out inset-0 bg-secondary/50" />
				<Dialog.Content
					className="fixed max-w-[1000px] md:h-auto w-full h-full md:w-5/6 top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white animate-contentShow rounded-lg p-8 min-w-container"
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<div className="flex justify-end ">
						<span className="border-2 rounded-full  border-red-500">
							<X
								aria-label="Close Modal"
								className="cursor-pointer text-red-500"
								onClick={onOpenChange}
							/>
						</span>
					</div>

					<Dialog.Title className="text-3xl font-bold">
						<div className="flex justify-between">Register Your Team</div>
					</Dialog.Title>
					<Dialog.Description className="text-white/40 mb-6">
						you&apos;r are currently logged in as{" "}
						<span className="text-white">{user?.email}</span>
					</Dialog.Description>
					<form onSubmit={onSubmit}>
						<div className="flex flex-col md:flex gap-4">
							<div className="mt-2 block md:hidden w-full text-xs bg-green/15 text-green p-1 rounded-md">
								<p>Make sure all the members are registered on the platform</p>
								<p>Project repo can&apos;t be changed once submitted</p>
								<p>You can team up with up to 3 people</p>
								<p>Team should have at least 1 member</p>
							</div>
							<div className="flex flex-col w-full gap-4">
								<div>
									<label htmlFor="name" className="pb-2">
										Team Name
									</label>
									<Input
										aria-errormessage="Team Name should be Alpha Numeric & should not contain any
										special characters"
										type="text"
										pattern="[a-z|0-9]"
										required
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
										{...register("repo")}
									/>

									{<p className="text-red-500 mt-2">Enter a valid repo Url</p>}
								</div>
								<div className="mt-4">
									{/* <Member isEditable loading={loading} /> */}
									{
										<p className="text-red-500 mt-2">
											User not found or team should have at least 1 member
										</p>
									}
								</div>
							</div>
						</div>

						<div className="mt-6 flex justify-end">
							<Button
								disabled={!isDirty || !isValid}
								loading={isSubmitting}
								type="submit"
								className="w-64 text-secondary bg-white font-semibold py-2 px-4 rounded"
							>
								{/* biome-ignore lint/correctness/noConstantCondition: <explanation> */}
								{true ? "Registering..." : "Register Your Team"}
							</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
