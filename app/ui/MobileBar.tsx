"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export const MobileBar = ({
	closeModal,
}: {
	closeModal: () => void;
}) => {
	const pathName = usePathname();

	const items = [
		{
			name: "HOME",
			path: "/",
		},
		/*         {
            name: 'LEADERBOARD',
            path: 'leaderboard',
        }, */
		{
			name: "EVENTS",
			path: "events",
		},
	];

	const navList = {
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.2,
				staggerChildren: 0.07,
			},
		},
		hidden: {
			opacity: 0,
			transition: {
				staggerChildren: 0.05,
				staggerDirection: -1,
			},
		},
	};

	const navItem = {
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				y: { stiffness: 1000, velocity: -100 },
			},
		},
		hidden: {
			y: 50,
			opacity: 0,
			transition: {
				y: { stiffness: 1000, velocity: -100 },
			},
		},
	};
	return (
		<div className="fixed top-0 left-0 w-full h-screen bg-secondary z-10 flex items-center justify-center">
			<button
				type="button"
				className="absolute top-4 right-4"
				onClick={closeModal}
			>
				<X className="h-8 w-8 text-white" />
			</button>

			<div className="mt-24 h-96 w-96 flex flex-col items-center justify-center text-center">
				<motion.ul
					className="navList"
					initial="hidden"
					animate="visible"
					exit="hidden"
					variants={navList}
				>
					{items.map(({ name, path }) => (
						<motion.li
							style={{ listStyle: "none" }}
							variants={navItem}
							key={name}
							className="list-none mb-2"
						>
							<Link href={path} onClick={closeModal}>
								<span
									className={`text-5xl font-base text-white hover:text-primary transition-colors ${
										pathName === path ? "text-primary" : ""
									}`}
								>
									{name}
								</span>
							</Link>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</div>
	);
};
