import React from "react";

function Container({ children }) {
  return (
    <div className="w-full max-w-6xl mx-auto md:px-4 px-3 min-h-[70vh]">
      {children}
    </div>
  );
}

export default Container;
