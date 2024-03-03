/* eslint-disable @next/next/no-img-element */
import { Event } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import CopyLink from "./CopyLink";

export const EventCard = ({
	event: {
		id,
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
		}
	> & {
		_count: {
			teams: number;
		};
	};
}) => {
	return (
		<>
			<div className="cardBox max-w-sm group bg-white/15 rounded-md relative overflow-hidden">
				<div className="bg-white relative p-7 rounded-t-md">
					<img alt={title} className="object-cover" src={image} />
					<CopyLink id={id} />
				</div>

				<div className="p-4 flex flex-col items-start gap-2 grow">
					<span className="bg-primary/15 rounded-full text-primary  font-medium text-xs px-3 py-1">
						✅ {projectCount || 0} Projects
					</span>
					<p className="text-sm text-white  font-medium line-clamp-3">
						{description}
					</p>
					<div className="w-full flex gap-2 justify-between rounded-b-md">
						<button
							type="button"
							className="w-full py-2 text-sm rounded-md bg-white hover:bg-primary active:bg-primary active:ring-2 active:ring-primary transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={status !== "RESULTS"}
						>
							View Projects
						</button>
						<Link className="w-full rounded-md" href={details} target="_blank">
							<button
								type="button"
								className="w-full py-2 rounded-md text-sm bg-white/15 text-white hover:bg-primary hover:text-black active:bg-primary active:ring-2 active:ring-primary transition-colors duration-300"
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
