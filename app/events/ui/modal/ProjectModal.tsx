"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { ProjectStatus, type ProjectResults } from "@/utils/types";
import { twMerge } from "tailwind-merge";
import { groupBy } from "@/utils/groupBy";
import { ProjectCard } from "../ProjectCard";

export const ProjectModal = () => {
	const router = useRouter();

	const searchParams = useSearchParams();
	const eventId = searchParams.get("eventID");
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(!!searchParams.get("results") && !!searchParams.get("eventID"));
	}, [searchParams]);

	const { data, error, isLoading } = useSWR(
		eventId && isOpen ? `/events/results/${eventId}` : null,
		fetcher<ProjectResults>,
	);

	const pathName = usePathname();
	const onOpenChange = () => {
		router.push(pathName);
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed transition-all animate-overlayShow ease-in-out inset-0 bg-secondary/50" />
				<Dialog.Content
					className="fixed w-full h-full top-1/2 z-50 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white animate-contentShow rounded-lg min-w-container"
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<div className="flex absolute top-8 right-8 justify-end">
						<span className="border-2 rounded-full border-red-500">
							<X
								aria-label="Close Modal"
								className="cursor-pointer text-red-500"
								onClick={onOpenChange}
							/>
						</span>
					</div>
					<div
						className={twMerge(
							"text-white text-2xl flex flex-col h-full w-full",
							isLoading || error ? "items-center justify-center " : "",
						)}
					>
						{isLoading && (
							<svg
								className="animate-spin -ml-1 mr-3 h-16 w-16 text-primary"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<title>Spinning Loading Icon</title>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						)}
						{error && (
							<>
								<X className="text-red-500 h-16 w-16 text-5xl" />
								<div className="text-center">
									<h1 className="text-3xl font-bold">Error</h1>
									<p className="text-lg">{error.message}</p>
								</div>
							</>
						)}
						{data && (
							<>
								<div className="bg-white/15 flex items-center justify-center p-4">
									<img
										className="w-full sm:w-72"
										src={data.event.imageWhite}
										alt={data.event.title}
									/>
								</div>
								{groupBy(data.projects, "projectStatus")
									.sort()
									.map((group, _index) => {
										const statusText =
											group[0].projectStatus === ProjectStatus.BEST_PROJECT
												? "Best Projects ⭐"
												: "Completed Projects ⭐";
										console.log(group);
										return (
											<div key={group[0].id}>
												<h1 className="font-semibold text-2xl md:text-4xl p-4">
													{statusText}
												</h1>
												<div className="flex items-center justify-center md:justify-start flex-wrap p-4">
													{group.map((project) => (
														<ProjectCard key={project.id} team={project} />
													))}
												</div>
											</div>
										);
									})}
							</>
						)}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
