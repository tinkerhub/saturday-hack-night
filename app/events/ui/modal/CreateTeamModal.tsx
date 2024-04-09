"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";
import { User } from "lucia";
import { useEffect, useState } from "react";

export const CreateTeamModal = ({
	user,
}: {
	user?: User | null;
}) => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const [eventID, setEventID] = useState<string | null>(null);

	const searchParams = useSearchParams();
	const eventId = searchParams.get("eventId");

	useEffect(() => {
		console.log(searchParams);
		setEventID(searchParams.get("eventId"));
		setIsOpen(!!searchParams.get("register"));
	}, [searchParams]);

	const pathName = usePathname();
	const onOpenChange = () => {
		router.push(pathName);
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed transition-all animate-overlayShow ease-in-out inset-0 bg-secondary/50" />
				<Dialog.Content
					className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white animate-contentShow rounded-lg p-8 min-w-container"
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<Dialog.Title className="text-3xl font-bold mb-4">
						Register Your Team
					</Dialog.Title>
					<Dialog.Description className="text-gray-400 mb-6">
						you&apos;r are currently logged in as{" "}
						<span className="text-white">{user?.email}</span>
					</Dialog.Description>
					<form>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="name" className="block font-bold mb-2">
									Team Name
								</label>
								<input
									type="text"
									id="name"
									className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
									placeholder="Team Name"
								/>
								{
									<p className="text-red-500 mt-2">
										Team Name should be Alpha Numeric & should not contain any
										special characters
									</p>
								}
							</div>
							<div>
								<label htmlFor="repo" className="block font-bold mb-2">
									Github Repository
								</label>
								<input
									type="text"
									id="repo"
									className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
									placeholder="www.github.com/example/exampleRepo"
								/>
								{<p className="text-red-500 mt-2">Enter a valid repo Url</p>}
							</div>
						</div>
						<div className="mt-4">
							{/* <Member isEditable loading={loading} /> */}
						</div>
						{
							<p className="text-red-500 mt-2">
								User not found or team should have at least 1 member
							</p>
						}
						<div className="mt-4 text-sm text-gray-400">
							<p>Make sure all the members are registered on the platform</p>
							<p>Project repo can&apos;t be changed once submitted</p>
							<p>You can team up with up to 3 people</p>
							<p>Team should have at least 1 member</p>
						</div>
						<div className="mt-6 flex justify-end">
							<Dialog.Close asChild>
								<button
									type="button"
									className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
								>
									Cancel
								</button>
							</Dialog.Close>
							<button
								type="submit"
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
							>
								{true ? "Registering..." : "Register Your Team"}
							</button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
