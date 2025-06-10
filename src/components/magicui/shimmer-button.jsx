import React, { ComponentPropsWithoutRef } from "react";
import "./shimmer-button.css";
import classNames from "classnames";

const ShimmerButton = React.forwardRef((props, ref) => {
  const {
    borderRadius = "100px",
    background = "rgba(0, 0, 0, 0.8)",
    className = "",
    children,
    ...restProps
  } = props;

  return (
    <button
      ref={ref}
      className={classNames(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 shimmer-button",
        className
      )}
      style={{
        background: background,
        borderRadius: borderRadius,
      }}
      {...restProps}
    >
      {children}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </button>
  );
});

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
