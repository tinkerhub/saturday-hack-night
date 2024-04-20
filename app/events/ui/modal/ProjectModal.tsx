"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const ProjectModal = () => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const [eventID, setEventID] = useState<string | null>(null);

	const searchParams = useSearchParams();
	const eventId = searchParams.get("eventId");

	useEffect(() => {
		setEventID(searchParams.get("eventId"));
		setIsOpen(!!searchParams.get("results"));
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
					className="fixed w-full h-full top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white animate-contentShow rounded-lg p-8 min-w-container"
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<div className="flex justify-end">
						<span className="border-2 rounded-full border-red-500">
							<X
								aria-label="Close Modal"
								className="cursor-pointer text-red-500"
								onClick={onOpenChange}
							/>
						</span>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
