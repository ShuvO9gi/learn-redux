import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postsSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

export default store;
