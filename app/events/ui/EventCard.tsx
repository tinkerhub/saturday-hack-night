/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CopyLink from "./CopyLink";
import { Button } from "@/app/components/Button";

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
	event: {
		id: string;
		title: string;
		description: string;
		image: string;
		details: string;
		date: Date;
		status: string | null;
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
						<Link
							className="w-full rounded-md"
							href={`?eventID=${id}&results=true`}
						>
							<Button
								type="button"
								className="w-full bg-white rounded-md text-black hover:shadow-none active:bg-primary active:ring-2 active:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={status !== "RESULTS"}
							>
								View Projects
							</Button>
						</Link>
						<Link className="w-full rounded-md" href={details} target="_blank">
							<Button
								type="button"
								className="text-white w-full rounded-md hover:text-black hover:shadow-none"
							>
								More Info
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
