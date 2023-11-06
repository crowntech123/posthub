import React from "react";
import dbService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, image, title }) {
  return (
    <>
      <Link to={`/post/${$id}`}>
        <div className="max-w-lg bg-slate-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-52 h-72">
          <a href="#">
            <img
              className="rounded-t-lg h-3/4"
              src={dbService.getFilePreview(image)}
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 flex items-center justify-center text-xl font-bold tracking-tight text-gray-200 dark:text-white ">
                {title}
              </h5>
            </a>
          </div>
        </div>
      </Link>
    </>
  );
}

export default PostCard;
