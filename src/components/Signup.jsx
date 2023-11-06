import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input, Button } from "./index.js";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Signup() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const create = async (data) => {
    setError("");
    try {
      const account = await authService.createAccount(data);
      if (account) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          toast.success("Your account is created", {
            style: {
              borderRadius: "10px",
              background: "#262626",
              color: "#fff",
            },
          });
          dispatch(login(userData));

          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-full ">
        <div
          className={`mx-auto w-full max-w-lg bg-slate-700 rounded-xl md:p-10 p-4 border border-black/50`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <img src={logo} alt="logoImage" />
            </span>
          </div>
          <h2 className="text-center md:text-2xl font-bold leading-tight">
            SignUp to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                placeholder="Enter Your Name :"
                label="Full Name: "
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                label="Email :"
                type="email"
                placeholder="Enter Your Email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full text-pink-900 font-serif">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
