"use client";

import { toast } from "sonner";

const CopyLink = ({ id }: { id: string }) => {
	const copyLink = () => {
		navigator.clipboard.writeText(
			`${window.location.href}?eventID=${id}&results=true`,
		);
		toast.success("Copied to clipboard!");
	};

	return (
		<span
			onKeyDown={copyLink}
			onClick={copyLink}
			className="absolute top-3 right-3 bg-black/50 group-hover:block px-2 py-1 rounded-md text-white text-xs  cursor-pointer hidden hover:text-black hover:bg-primary hover:shadow-md hover:shadow-primary/30
              transition-colors duration-300"
		>
			Copy Link
		</span>
	);
};

export default CopyLink;
