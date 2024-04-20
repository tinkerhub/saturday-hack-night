"use client";
import type { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

export const Button = ({
	className,
	loading,
	type = "button" as const,
	children,
	wrapperClassName,
	...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	wrapperClassName?: string;
}) => {
	const { pending } = useFormStatus();

	return (
		<button
			type={type}
			disabled={pending || loading}
			className={twMerge(
				"w-full h-11 px-2 bg-white/15 focus:text-secondary focus-visible:text-white hover:bg-primary duration-500 transition-all hover:text-secondary text-white/50 rounded-[10px]",
				className,
			)}
			{...rest}
		>
			<span
				className={twMerge(
					"flex items-center justify-center gap-2",
					wrapperClassName,
				)}
			>
				{pending ||
					(loading && (
						// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
						<svg
							className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
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
					))}

				{children}
			</span>
		</button>
	);
};
