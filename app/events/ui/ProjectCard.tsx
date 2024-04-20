import { Button } from "@/app/components/Button";
import type { ExtractedTeamType } from "@/utils/types";
import Link from "next/link";
import { toast } from "sonner";
export const ProjectCard = ({ team }: { team: ExtractedTeamType }) => {
	return (
		<div
			key={team.repo}
			className="resultBox relative w-72 bg-white bg-opacity-15 rounded-lg overflow-hidden"
		>
			<div className="bg-white p-7 w-full text-secondary rounded-t-lg">
				<p className="text-center">{team.name}</p>
			</div>
			<div className="w-full p-2 flex flex-col items-start flex-grow gap-1">
				{team.members.map(({ user }) => (
					<Link
						key={user.githubId}
						href={`https://www.github.com/${user.githubId}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center hover:underline"
					>
						<img
							src={user.avatar}
							alt={user.name ?? user.githubId}
							className="h-7 w-7 rounded-full"
						/>
						<p className="text-sm text-white ml-2">
							{user.name ?? user.githubId}
						</p>
					</Link>
				))}
				<div className="w-full text-sm font-medium rounded-b-lg gap-2 flex justify-end pt-2">
					<Link className="w-full" href={team.repo} target="_blank">
						<Button className="rounded-md bg-white text-black">
							View Project
						</Button>
					</Link>

					<Button
						className="rounded-md text-white"
						onClick={() => {
							navigator.clipboard.writeText(team.repo).then(() => {
								toast.success("Copied to clipboard");
							});
						}}
					>
						Copy Link
					</Button>
				</div>
			</div>
		</div>
	);
};
