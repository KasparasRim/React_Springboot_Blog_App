import { configureStore } from '@reduxjs/toolkit';
import search from "./slices/searchSlice";
import posts from "./slices/postsSlice";
import user from "./slices/userSlice";

const store = configureStore({
  reducer: {
    posts,
    search,
    user
  }
});

export default store;

