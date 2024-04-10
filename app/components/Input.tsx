import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Input = ({
	className,
	...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			className={twMerge(
				"w-full h-11 px-4 placeholder-text-black/25 bg-white/15 focus-within:ring-0 focus:border-primary/15 focus:shadow-primary/15 hover:bg-white/25 focus:bg-white/25 focus:border-1 text-white ring-0 outline-transparent rounded-[10px] border-gray-300",
				className,
			)}
			{...rest}
		/>
	);
};
