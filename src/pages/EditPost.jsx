import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/config";
import { PostForm, Container } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      dbService.getSinglePost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [navigate, slug]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
