import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && authStatus != authentication) {
      navigate("/login");
    } else if (!authentication && authStatus != authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authentication, authStatus, navigate]);
  if (authentication && authStatus != authentication) {
  }
  return loader ? <div>loading..</div> : <>{children}</>;
}

export default AuthLayout;
