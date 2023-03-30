import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return action.payload;
    },
  },
});

export default postsSlice.reducer;

export const { setPosts } = postsSlice.actions;

export const selectPosts = (state) => state.posts;