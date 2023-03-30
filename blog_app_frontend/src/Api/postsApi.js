import HTTP from "./";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setPosts } from "../store/slices/postsSlice";

const getPosts = () =>
  HTTP.get(`/posts/all`).then((response) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(response.data), 500);
    })
  );

const usePosts = () => {
  const dispatch = useDispatch();
  const context = useQuery("getPosts", getPosts, {
    onSuccess: (data) => {
      dispatch(setPosts(data));
    },
  });
  return { ...context, posts: context.data };
};

export { usePosts };

