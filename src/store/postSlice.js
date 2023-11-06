import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import dbService from "../appwrite/config";

export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async () => {
    try {
      const response = await dbService.getAllPost();
      console.log(response);
      return response;
    } catch (error) {
      throw new Error("error while getting all post data ", error);
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (slug) => {
    try {
      const response = await dbService.getSinglePost(slug);
      return response;
    } catch (error) {
      throw new Error("error while getting all post data ", error);
    }
  }
);
export const deletePost = createAsyncThunk("post/deletePost", async (slug) => {
  try {
    const response = await dbService.deletePost(slug);
    return response;
  } catch (error) {
    throw new Error("error while getting all post data ", error);
  }
});

const initialState = {
  postData: [],
  loading: "idle",
  error: null,
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.postData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.postData = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })
      .addCase(getSinglePost.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.postData = action.payload;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = "fulfilled";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;
