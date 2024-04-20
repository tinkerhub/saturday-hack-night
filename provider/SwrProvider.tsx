"use client";
import { SWRConfig } from "swr";
export const SWRProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return (
		<SWRConfig
			value={{
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
				refreshWhenOffline: false,
				refreshWhenHidden: false,
				refreshInterval: 0,
			}}
		>
			{children}
		</SWRConfig>
	);
};
