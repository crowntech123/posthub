import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import dbService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Button } from "../components";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      dbService.getSinglePost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    dbService.deletePost(post.$id).then((status) => {
      if (status) {
        dbService.deleteFile(post.image);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <div className="w-[60vw] mx-auto flex justify-center mb-4 relative border rouded-xl p-2">
        <img
          src={dbService.getFilePreview(post.image)}
          alt={post.title}
          className="rounded-xl"
        />
      </div>
      <div className="w-[70vw] mx-auto mb-6 flex items-center flex-col bg-slate-800 h-48 justify-center rounded-xl p-5 font-sans">
        <h1 className="text-2xl font-bold text-white">{post.title}</h1>

        <div className=" text-white ">{parse(post.content)}</div>
      </div>
      {isAuthor && (
        <div className="flex justify-center items-center right-1 top-6">
          <Link to={`/edit-post/${post.$id}`}>
            <Button bgColor="bg-green-900" className="mr-3">
              Edit
            </Button>
          </Link>
          <Button bgColor="bg-black" onClick={deletePost}>
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : null;
}

export default Post;
