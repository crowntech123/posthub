import React, { useEffect, useState } from "react";
import { Header, Footer } from "./components";
import ClipLoader from "react-spinners/ClipLoader";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className=" flex flex-wrap content-between ">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>

        <Footer />
        <Toaster position="top-center" />
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader
        color={"#900C3F "}
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;
