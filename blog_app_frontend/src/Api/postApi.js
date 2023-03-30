import HTTP from "./"
import { useMutation, useQuery } from "react-query";

const getPost = (postUrl) => HTTP.get(`/posts/${postUrl}`)
  .then(response =>
    new Promise((resolve) => {
      resolve(response.data)
    }))

const usePost = (postUrl) => {
  const context = useQuery(['getPost', postUrl], () => getPost(postUrl))
  return { ...context, post: context.data }
}
const createPost = (post) => HTTP.post(`/posts/newpost`, post)

const useCreatePost = (config) => {
  const mutation = useMutation(createPost, config)
  return mutation.mutateAsync
}

export { usePost, useCreatePost }
