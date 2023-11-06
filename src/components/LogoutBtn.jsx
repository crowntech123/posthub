import React from "react";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import toast from "react-hot-toast";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      toast.success("You are logout", {
        style: {
          borderRadius: "10px",
          background: "#262626",
          color: "#fff",
        },
      });
    });
  };
  return (
    <>
      <button
        className="inline-bock px-6 py-2 duration-200 bg-pink-800 hover:bg-pink-100 hover:text-pink-950 rounded-full text-white font-medium text-sm md:mr-4 mr-3 md:w-30 w-40"
        onClick={handleLogout}
      >
        logout
      </button>
    </>
  );
};

export default LogoutBtn;
