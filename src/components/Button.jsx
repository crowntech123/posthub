import React from "react";

function Button({
  children,
  className = "",
  type = "button",
  bgColor = "bg-slate-900",
  textColor = "text-white",
  ...props
}) {
  return (
    <button
      className={`py-2 px-4 rounded-lg border   ${textColor} ${className} ${bgColor}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
