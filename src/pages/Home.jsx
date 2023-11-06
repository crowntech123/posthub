import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import dbService from "../appwrite/config";
import post from "../assets/post.jpg";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
  const authenticated = useSelector((state) => state.auth.status);

  useEffect(() => {
    dbService.getAllPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
    setLoader(false);
  }, []);

  if (loader) {
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader
        color={"#900C3F"}
        loading={loader}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>;
  } else {
    if (!authenticated) {
      return (
        <div className="w-full py-8 mt-4 text-center ">
          <Container>
            <div className="flex flex-wrap ">
              <div className="p-2 w-full h-128 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold hover:text-gray-500 text-white mb-10 font-serif">
                  Please Login to read posts
                </h1>

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img className="rounded-t-lg" src={post} alt="" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Dummy Post
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      );
    }
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap justify-center">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full md:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
