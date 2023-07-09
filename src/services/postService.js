import axios from "axios";

export const getAllPostsServices = async () => await axios.get("/api/posts");

export const likePostService = async (postId, encodedToken) =>
  await axios.post(
    `/api/posts/like/${postId}`,
    {},
    { headers: { authorization: encodedToken } }
  );

export const dislikePostService = async (postId, encodedToken) =>
  await axios.post(
    ` /api/posts/dislike/${postId}`,
    {},
    { headers: { authorization: encodedToken } }
  );

export const createPostService = async (postContent, encodedToken) =>
  await axios.post(
    "/api/posts",
    {
      postData: {
        content: postContent,
      },
    },
    {
      headers: { authorization: encodedToken },
    }
  );

export const deletePostService = async (postId, encodedToken) =>
  await axios.delete(`/api/posts/${postId}`, {
    headers: { authorization: encodedToken },
  });

export const editPostService = async (postId, content, encodedToken) =>
  await axios.post(
    `/api/posts/edit/${postId}`,
    {
      postData: {
        content,
      },
    },
    { headers: { authorization: encodedToken } }
  );
