"use client";

import { useEffect } from "react";

const GlobalError = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	useEffect(() => {
		// TODO: Log error to the server
		console.error(error);
	}, [error]);

	return (
		<div
			className="h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%), 
                                 linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                                 url('/images/codeBg.png')`,
			}}
		>
			<div className="text-center">
				<h1 className="text-4xl font-medium  text-white">
					Something Went Wrong
				</h1>
				<h1 className="text-5xl sm:text-8xl font-bold  text-primary">Error</h1>
				<button
					type="button"
					className="w-64 h-14 bg-white text-lg font-medium text-black transition-all duration-500 hover:bg-primaru hover:shadow-md hover:shadow-primary/30 active:bg-primary active:ring-2 active:ring-primary"
					onClick={() => reset()}
				>
					Try Again
				</button>
			</div>
		</div>
	);
};

export default GlobalError;
