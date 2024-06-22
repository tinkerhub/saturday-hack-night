import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
	return (
		<div className="w-full bg-secondary">
			<div className="container mx-auto w-full px-4 lg:px-0 py-4 flex items-center justify-between">
				<Image
					src="images/TH.svg"
					alt="TinkerHub Logo"
					width={100}
					height={100}
				/>
				<Link
					href="https://tinkerhub.org"
					className="text-base md:text-2xl font-bold text-white"
				>
					tinkerhub.org
				</Link>
			</div>
		</div>
	);
};
