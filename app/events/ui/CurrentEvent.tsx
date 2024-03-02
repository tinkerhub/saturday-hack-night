/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { User } from "lucia";
import { isProfileComplete as isProfileCompleteFn } from "@/utils/user";
import {
	CurrentEvent as CurrentEventType,
	RegisteredTeam,
} from "@/utils/types";
import dayjs from "dayjs";

export const CurrentEvent = ({
	user,
	data,
}: {
	user: User | null;
	data: {
		event: CurrentEventType;
		registeredTeam: RegisteredTeam | null;
	};
}) => {
	const isProfileComplete = isProfileCompleteFn(user);

	const { event, registeredTeam } = data;

	const isEditable = registeredTeam
		? registeredTeam.members.some((member) => member.userId === user?.id)
		: !!user;

	const {
		date,
		imageWhite,
		location,
		description,
		status,
		title,
		details,
		_count: { teams },
	} = event;

	return (
		<div className="flex flex-col lg:flex-row w-full items-start gap-4">
			{/* Modals (you'll likely need to keep these as React components due to state management) */}
			{/* {registeredTeam && isOpenUpdateModal && (
				<UpdateTeamModal
					teamId={registeredTeam.teamID}
					isOpen={isOpenUpdateModal}
					onClose={onCloseUpdateModal}
					image={imageWhite}
					eventId={id}
					isEditable={isEditable}
				/>
			)}
			{user && isOpenCreateModal && (
				<CreateTeamModal
					isOpen={isOpenCreateModal}
					onClose={onCloseCreateModal}
					eventId={id}
				/>
			)} */}

			{/* Left Card */}
			<div className="min-w-full lg:min-w-[50%] max-w-[50%] rounded-md bg-white/15 backdrop-blur-md flex flex-col">
				<div className="flex justify-between items-center p-4">
					<div className="flex items-center text-white text-sm">
						<Calendar height="15px" width="15px" />
						<span className="ml-2">
							{dayjs(date).format("ddd MMM DD, YYYY")}
						</span>
					</div>
					<div className="flex items-center bg-white/15 rounded-md px-2 py-2">
						<Image
							width="20"
							height="20"
							src="images/circle.svg"
							alt="Circle"
						/>
						<span className="ml-2 text-xs text-primary">
							{teams} Teams Registered
						</span>
					</div>
				</div>

				<img
					alt="Event"
					src={imageWhite}
					className="mt-4 max-h-72 aspect-video object-contain"
				/>

				<div
					className={`flex items-center justify-center py-2 rounded-b-md ${
						registeredTeam ? "bg-primary" : "bg-red-500"
					}`}
				>
					<span className="font-medium text-black text-base">
						{registeredTeam
							? "Registered 🎉"
							: status === "REGISTRATION"
							  ? "Register Now"
							  : "Registration Closed"}
					</span>
				</div>
			</div>

			{/* Right Content Column */}
			<div className="w-full flex flex-col h-full items-start pl-0 md:pl-4">
				<h1 className="text-4xl font-bold text-white">{title}</h1>
				<p className="text-lg flex-grow-1 text-white mt-0">{description}</p>

				<div className="mt-4 flex gap-3">
					<button
						type="button"
						className={`bg-white hover:bg-primary active:bg-primary active:ring-2 active:ring-primary transition-all font-medium text-sm px-6 py-3 rounded-md ${
							user && registeredTeam && isEditable && status === "REGISTRATION"
								? ""
								: "bg-gray-400 cursor-not-allowed"
						}`}
					>
						{user
							? registeredTeam
								? isEditable
									? status === "REGISTRATION"
										? "Update Team"
										: "View Team"
									: "View Team"
								: isProfileComplete
								  ? status === "REGISTRATION"
										? "Register Team"
										: "Closed"
								  : "Register Team"
							: "Register Team"}
					</button>

					<Link href={details} target="_blank">
						<button
							type="button"
							className="bg-white/15 text-white hover:bg-primary hover:text-secondary active:bg-primary active:ring-2 active:ring-primary transition-all font-medium text-sm px-6 py-3 rounded-md"
						>
							More Info
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
