import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchPost = createAsyncThunk("posts/fetchPost", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    //console.log(initialPost); //initial post is the post which you added
    const response = await axios.post(POSTS_URL, initialPost);
    //console.log(response);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    //console.log(initialPost); //initial post is the post that you updated
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
      //return initialPost; //only for testing redux!
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}:${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";

        //add date & reaction parameters
        let min = 1;
        const loadedPost = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        //console.log(action.payload);
        //add any fetched posts to an array
        state.posts = state.posts.concat(loadedPost);
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        //Fix for API post IDs: would not be needed if fake API returned accurate new post ID
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        //end of creating fake API id

        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        //console.log(action.payload);
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could can not complete!");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        //console.log(action.payload);  //full updated post with date property
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id); //filtering all the post that are not equal to the updated id
        //console.log(posts); //displaying all the post only without updated post
        state.posts = [...posts, action.payload]; //spreading all the post & updated post
        //console.log(state.posts); //display all the post as an object with updated post
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Failed to delete the post!");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const post = state.posts.filter((post) => post.id !== id);
        state.posts = post;
      });
  },
});

export const selectAllPost = (state) => {
  //console.log(state); //outside of the creatSlice, it will show all the states(posts & users) as an object
  // but inside of createSlice it will show only the posts state
  //console.log(state.users); //here you can access the user state.
  //console.log(state.posts);// accessing the posts state & state.posts.posts will be used to access the posts property of the posts state
  return state.posts.posts;
};
export const getAllStatus = (state) => state.posts.status;
export const getAllError = (state) => state.posts.error;
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);

//createSelector memorize the object to prevent unnecessary re-rendering
//its takes one or more input functions here [are dependencies(values returned from this function)]
//if only input <posts or userId> changes then the function re-render otherwise not(i.e. memorized)
export const selectPostByUser = createSelector(
  [selectAllPost, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
