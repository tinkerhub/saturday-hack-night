import { CSSProperties, ReactElement, RefAttributes } from "react";
import { GroupBase } from "react-select";
import AsyncSelect, { AsyncProps } from "react-select/async";

const selectStyle = {
	control: (styles: CSSProperties, state: { isFocused: boolean }) => ({
		...styles,
		":hover": {
			borderColor: "rgba(255, 255, 255, 0.15)",
		},
		color: "white",
		paddingInline: "10px",
		fontFamily: "Clash Display",
		fontSize: "16px",
		height: "45px",
		fontWeight: "regular",
		background: "rgba(255,255,255,0.15)",
		boxShadow: "none",
		outline: "none",
		borderRadius: "10px",
		border: "none",
	}),
	menu: (styles: CSSProperties) => ({
		...styles,
		color: "white",
		borderRadius: "10px",
		fontFamily: "Clash Display",
		fontSize: "16px",
	}),
	menuList: (styles: CSSProperties) => ({
		...styles,
		borderRadius: "10px",
		padding: "10px",
		backgroundColor: "rgba(0,0,0, 0.75)",
	}),
	singleValue: (styles: CSSProperties) => ({
		...styles,
		color: "white",
	}),
	option: (styles: CSSProperties) => ({
		...styles,
		color: "white",
		border: "1px solid rgba(255, 255, 255, 0.15)",
		backgroundColor: "rgba(255,255,255,0.15)",
	}),
	input: (styles: CSSProperties) => ({
		...styles,
		width: "100%",
		color: "white",
	}),
};

export const AsyncSelectComponent = ({ ...rest }) => {
	return (
		<AsyncSelect
			className="w-full"
			styles={selectStyle as unknown as any}
			{...rest}
		/>
	);
};
