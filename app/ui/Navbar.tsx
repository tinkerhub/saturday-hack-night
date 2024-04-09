"use client";
import { User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { MobileBar } from "./MobileBar";
import { ProfileModal } from "./modal/ProfileModal";
export const Navbar = ({
	user,
}: {
	user: User | null;
}) => {
	const imageRef = useRef<HTMLImageElement>(null);
	const [showMenu, setShowMenu] = useState(false);

	const closeModal = () => {
		setShowMenu(false);
	};
	const handleWindowResize = useCallback(() => {
		if (window.innerWidth > 991) {
			setShowMenu(false);
		}
	}, []);

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [handleWindowResize]);

	return (
		<div className="fixed w-full h-20 flex items-stretch px-4 md:px-8 z-50 bg-secondary/75 backdrop-blur-md">
			<ProfileModal user={user} />
			<div className="flex container w-full mx-auto items-center justify-between">
				<Link href="/" className="flex items-center">
					<Image
						alt="Saturday HackNight"
						src="/images/logo.svg"
						ref={imageRef}
						width={125}
						height={125}
						onMouseOver={() => {
							if (imageRef.current)
								imageRef.current.src = "images/logo_hover.svg";
						}}
						onMouseOut={() => {
							if (imageRef.current) imageRef.current.src = "images/logo.svg";
						}}
					/>
				</Link>

				<div className="flex items-center gap-4 lg:flex">
					<nav className="hidden md:flex pr-4 gap-6">
						<Link
							className="text-md text-white hover:text-primary transition-colors"
							href="/"
						>
							HOME
						</Link>
						<Link
							href="/events"
							className="text-md text-white hover:text-primary transition-colors"
						>
							EVENT
						</Link>
					</nav>

					{user ? (
						<div className="flex gap-2 items-center">
							<Image
								src={user.avatar || "/images/userFallback.png"}
								alt="User Avatar"
								width={43}
								height={43}
								className="rounded-full hidden md:block border-2 border-primary"
							/>
							<div className="flex flex-col items-end">
								<p className="text-sm font-bold text-white">
									{user.name || user.githubId}
								</p>
								<Link href="?profile=true">
									<p className="text-xs text-primary font-medium hover:cursor-pointer hover:underline">
										view profile
									</p>
								</Link>
							</div>
						</div>
					) : (
						<Link href="/auth/github">
							<button
								type="button"
								className="bg-white hover:bg-primary active:bg-primary active:ring-2 active:ring-white font-medium text-sm px-4 py-2 rounded-md transition-colors"
							>
								LOGIN
							</button>
						</Link>
					)}

					<div className="flex items-center gap-4 lg:hidden">
						{showMenu ? (
							<button type="button" onClick={() => setShowMenu(false)}>
								<X className="h-8 w-8 text-white" />
							</button>
						) : (
							<button type="button" onClick={() => setShowMenu(true)}>
								<Menu className="h-8 w-8 text-white" />
							</button>
						)}
					</div>
				</div>

				{showMenu && <MobileBar closeModal={closeModal} />}
			</div>
		</div>
	);
};
