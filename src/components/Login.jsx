import React, { useState } from "react";
import { Input, Button, Container } from "../components";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.loginAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          toast.success("You are successfully Logged In ", {
            style: {
              borderRadius: "10px",
              background: "#262626",
              color: "#fff",
            },
          });
        }

        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <Container>
        <div className="flex  justify-center items-center w-full">
          <div
            className={`mx-auto w-full max-w-lg bg-slate-700 rounded-xl md:p-10 p-4 border border-black/50`}
          >
            <div className="mb-2 flex justify-center">
              <span className="inline-block w-full max-w-[100px]">
                <img src={logo} alt="logoImage" />
              </span>
            </div>
            <h2 className="text-center md:text-2xl font-bold leading-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className="mt-8">
              <div className="space-y-5">
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
                <Button
                  type="submit"
                  className="w-full text-pink-900 font-serif"
                >
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Login;
