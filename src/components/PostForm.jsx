import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "./index";
import dbService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import ClipLoader from "react-spinners/ClipLoader";
//export default hai to u  can change the name while importing its up to u
function PostForm({ post }) {
  //setValue is used as value in react hook form
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);

  const authData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await dbService.uploadFile(data.image[0])
        : null;
      if (file) {
        dbService.deleteFile(post.image);
      }
      const dbPost = await dbService.updatePost(post.$id, {
        ...data,
        image: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await dbService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.image = fileId;
        const dbPost = await dbService.createPost({
          ...data,
          userId: authData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  //passing the value of title into slug transform
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      //here value is an object all values are coming from  form but i only need the value inside title that's why value.title
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="md:w-2/3 px-3 text-white">
          <Input
            placeholder="Title :"
            label="Title :"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            placeholder="Slug :"
            label="Slug :"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            name="content"
            label="Content :"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="md:w-1/3 px-3 text-white">
          <Input
            label="Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={dbService.getFilePreview(post.image)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
  // ) : (
  //   <div className="flex justify-center items-center min-h-screen">
  //     <ClipLoader
  //       color={"#900C3F "}
  //       loading={loading}
  //       size={100}
  //       aria-label="Loading Spinner"
  //       data-testid="loader"
  //     />
  //   </div>
  // );
}

export default PostForm;
