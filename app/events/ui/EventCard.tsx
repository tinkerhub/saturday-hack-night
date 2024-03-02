/* eslint-disable @next/next/no-img-element */
import { Link } from "lucide-react";
import { Event } from "@prisma/client";
import Image from "next/image";

export const EventCard = ({
	event: {
		title,
		description,
		image,
		details,
		status,
		_count: { teams: projectCount },
	},
}: {
	event: Exclude<
		Event,
		{
			createdAt: Date;
			updatedAt: Date;
			status: string;
		}
	> & {
		_count: {
			teams: number;
		};
	};
}) => {
	return (
		<>
			<div className="cardBox max-w-sm bg-white/15 rounded-md relative overflow-hidden">
				<div className="bg-white p-7 rounded-t-md relative">
					<span
						className="absolute top-3 right-3 bg-black/50 px-2 py-1 rounded-md text-white text-xs font-['Clash Display'] cursor-pointer hidden hover:text-black hover:bg-primary hover:shadow-md hover:shadow-primary/30
              transition-colors duration-300"
						style={{ display: status === "RESULT" ? "block" : "none" }}
					>
						Copy Link
					</span>
					<img alt={title} className="object-cover" src={image} />
				</div>

				<div className="p-4 flex flex-col items-start gap-2 grow">
					<span className="bg-primary/15 rounded-full text-primary font-['Clash Display'] font-medium text-xs px-3 py-1">
						✅ {projectCount || 0} Projects
					</span>
					<p className="text-sm text-white font-['Clash Display'] font-medium line-clamp-3">
						{description}
					</p>
					<div className="w-full flex justify-between rounded-b-md">
						<button
							type="button"
							className="w-full py-2 text-sm bg-primary hover:bg-primary active:bg-primary active:ring-2 active:ring-primary transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={status !== "RESULT"}
						>
							View Projects
						</button>
						<Link href={details} target="_blank">
							<button
								type="button"
								className="w-full py-2 text-sm bg-white/15 text-white hover:bg-primary hover:text-black active:bg-primary active:ring-2 active:ring-primary transition-colors duration-300"
							>
								More Info
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
