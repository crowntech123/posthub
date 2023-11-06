import React, { useEffect, useState } from "react";
import dbService from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import { Loader } from "../components/index";
import { fetchAllPosts } from "../store/postSlice";
import { useDispatch } from "react-redux";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchAllPosts()).then((action) => {
  //     if (fetchAllPosts.fulfilled.match(action)) {
  //       setPosts(action.payload.documents);
  //       console.log(action.payload);
  //     }
  //     setLoading(false);
  //   });
  // }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAllPosts())
      .then((action) => {
        if (fetchAllPosts.fulfilled.match(action)) {
          // Check if the action was fulfilled successfully
          setPosts(action.payload.documents);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [dispatch]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const action = await dispatch(fetchAllPosts());
  //       if (fetchAllPosts.fulfilled.match(action)) {
  //         setPosts(action.payload);
  //         console.log(action.payload);
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       // Handle errors here
  //       console.error(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {console.log(posts)}
          {posts?.map((post) => (
            <div key={post.$id} className="p-2 w-3/4 md:w-1/4 ">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
