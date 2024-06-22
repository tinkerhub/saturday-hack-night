import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import * as Dialog from "@radix-ui/react-dialog";
import type { User } from "lucia";
import { X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AsyncSelectComponent } from "@/app/components/AsyncSelect";
import { debounce } from "@/utils/debounce";
import updateProfile from "./actions";

export const ProfileModal = ({
	user,
}: {
	user: User;
}) => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const updateProfileWithID = updateProfile.bind(null, user.id);

	const searchParams = useSearchParams();

	useEffect(() => {
		setIsOpen(!!searchParams.get("profile"));
	}, [searchParams]);

	const pathName = usePathname();
	const onOpenChange = () => {
		router.push(pathName);
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const loadCollegeDebounced = useCallback(
		debounce(
			(
				inputValue: string,
				callback: (data: Array<{ value: string; label: string }>) => void,
			) => {
				fetch(`/api/colleges?search=${inputValue}`)
					.then((res) => res.json())
					.then((data: Array<{ id: string; name: string }>) =>
						data.map((college) => ({
							value: college.id,
							label: college.name,
						})),
					)
					.then((data) => callback(data));
			},
			500,
		),
		[],
	);

	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed transition-all animate-overlayShow ease-in-out inset-0 z-40 bg-black/70" />
				<Dialog.Content
					className="fixed z-50 max-w-[1000px] md:w-2/3 md:h-auto w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0C0F17] text-white animate-contentShow rounded-lg p-8 min-w-container"
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<Dialog.Title className="text-3xl font-bold mb-4">
						<div className="flex justify-end ">
							<span className="border-2 rounded-full  border-red">
								<X
									aria-label="Close Modal"
									className="cursor-pointer text-red"
									onClick={onOpenChange}
								/>
							</span>
						</div>
					</Dialog.Title>
					<div className="flex flex-col items-center justify-center">
						<div className="flex flex-col gap-4 items-center justify-center">
							<Image
								width={150}
								className="rounded-full border-2 border-primary"
								height={150}
								src={user?.avatar}
								alt={`Photo of ${user.name}`}
							/>
							<div className="flex justify-center items-center flex-col">
								<h1 className="text-4xl font-bold">{user.name}</h1>
								<h1 className="text-lg text-white/40">{user.email}</h1>
							</div>
						</div>
						<form
							action={updateProfileWithID}
							className="flex flex-col w-full gap-4 items-center justify-center"
						>
							<Input
								defaultValue={user.name || ""}
								name="name"
								placeholder="Full Name"
								required
								className="w-full mt-4"
							/>
							<div className="md:flex-row w-full flex mt-4 flex-col gap-4">
								<Input
									defaultValue={user.mobile || ""}
									name="mobile"
									placeholder="Mobile Number"
									required
									type="tel"
									className="w-full"
								/>
								<AsyncSelectComponent
									isClearable
									defaultValue={{
										value: user.collegeId,
									}}
									name="college"
									loadOptions={loadCollegeDebounced}
									defaultOptions
									placeholder="College Name"
								/>
							</div>

							<Button type="submit" className="w-64 mt-4">
								Update Profile
							</Button>
						</form>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
