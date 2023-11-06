import React, { useState } from "react";
import logo from "../assets/logo.png";
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineAlignRight, AiOutlineClose } from "react-icons/ai";
function Header() {
  const [open, setOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  const navigateAndCloseMenu = (slug) => {
    // Navigate to the specified path
    navigate(slug);
    console.log("btn clicked");

    // Close the navigation menu
    setOpen(false);
  };
  return (
    <>
      <header>
        <nav className="bg-gray-900 border-gray-700 lg:px-6 py-4 border-b-[0.5px] dark:bg-gray-800 w-full px-2">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="mr-4">
              <a href="" className="flex items-center">
                <img
                  src={logo}
                  className="mr-3 h-6 sm:h-9"
                  alt="Flowbite Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-white dark:text-white">
                  PostHub
                </span>
              </a>
            </div>
            {/*JSX Return Value: In a React component, the return statement should return a single JSX element or value. When you use curly braces directly without parentheses, you are creating a block of statements rather than a single value.*/}
            <ul className="hidden md:flex items-center ">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className="inline-bock px-6 py-2 duration-200 bg-pink-800 hover:bg-pink-100 hover:text-pink-950 rounded-full text-white font-medium text-sm mr-4 w-30"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>

            <div className="md:hidden">
              <button onClick={() => setOpen(!open)}>
                {open ? (
                  <AiOutlineClose color="white" size="25px" />
                ) : (
                  <AiOutlineAlignRight color="#FFF" size="25px" />
                )}
              </button>
            </div>
          </div>
          <ul
            className={
              open
                ? "flex flex-col items-end absolute top-0 gap-4 right-0   z-10 mt-20 w-full h-full bg-slate-900 "
                : "hidden"
            }
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className={
                      open
                        ? "inline-bock px-6 py-2 duration-200 bg-pink-800 hover:bg-pink-100 hover:text-pink-950 rounded-full text-white font-medium text-sm md:mr-4 mr-3 w-40"
                        : "hidden"
                    }
                    onClick={() => navigateAndCloseMenu(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
