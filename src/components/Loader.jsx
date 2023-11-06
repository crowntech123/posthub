import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Loader() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader
          color={"#900C3F "}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}

export default Loader;
