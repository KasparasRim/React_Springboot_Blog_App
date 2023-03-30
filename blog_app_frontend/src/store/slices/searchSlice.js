import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: 'search',
  initialState: [],
  reducers: {
    setSearchedPosts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSearchedPosts } = searchSlice.actions;
export default searchSlice.reducer;
