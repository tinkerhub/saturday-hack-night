import { Input } from "@/app/components/Input";
import * as Dialog from "@radix-ui/react-dialog";
import { User } from "lucia";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ProfileModal = ({
	user,
}: {
	user?: User | null;
}) => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const searchParams = useSearchParams();

	useEffect(() => {
		console.log(searchParams);
		setIsOpen(!!searchParams.get("profile"));
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
						<div className="flex items-end">
							<X className="cursor-pointer" onClick={onOpenChange} />
						</div>
					</Dialog.Title>

					<Input />
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
