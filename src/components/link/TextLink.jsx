import React from "react";

export const TextLink = React.forwardRef(
  ({ className, children, onClick, styles }, ref) => {
    return (
      <div
        className={styles[className]}
        ref={ref}
        onClick={onClick}
        style={{
          height: "20px",

          fontFamily: "Inter",
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "15px",
          lineHeight: "20px",

          textAlign: "center",

          color: "#000000",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          cursor: "pointer",
        }}
      >
        {children}
      </div>
    );
  }
);
