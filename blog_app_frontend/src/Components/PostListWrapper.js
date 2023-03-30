import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import SimplePostsList from './SimplePostList';
import { selectPosts } from "../store/slices/postsSlice";
import {usePosts} from "../Api/postsApi"

function PostListWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchedPosts = useSelector((state) => state.search);
  const postsFromSlice = useSelector(selectPosts);
  const { isFetching, refetch } = usePosts();

  const postsToShow = useMemo(() => {
    if (searchedPosts.length > 0) {
      return searchedPosts;
    } else {
      return postsFromSlice;
    }
  }, [searchedPosts, postsFromSlice]);

  useEffect(() => {
    if (searchedPosts.length > 0) {
      navigate(location.pathname, { replace: true });
    }
  }, [searchedPosts, navigate, location.pathname]);

  return (
    <SimplePostsList
      posts={postsToShow} isFetching={isFetching} refetch={refetch}
      
    />
  );
}

export default PostListWrapper;