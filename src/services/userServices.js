import axios from "axios";

export const getAllUsersServices = async () => await axios.get("/api/users");

export const getUserByIdService = async (userId) =>
  await axios.get(`/api/users/${userId}`);

export const addToBookmarkService = async (postId, encodedToken) =>
  await axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: { authorization: encodedToken },
    }
  );

export const removePostFromBookmarkService = async (postId, encodedToken) =>
  await axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    { headers: { authorization: encodedToken } }
  );

export const getBookmarkService = async (encodedToken) =>
  await axios.get("/api/users/bookmark", {
    headers: { authorization: encodedToken },
  });

export const followUserService = async (followUserId, encodedToken) =>
  await axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    {
      headers: { authorization: encodedToken },
    }
  );

export const unfollowUserService = async (unfollowUserId, encodedToken) =>
  await axios.post(
    `/api/users/unfollow/${unfollowUserId}`,
    {},
    { headers: { authorization: encodedToken } }
  );

export const editUserService = async (dataInput, encodedToken) =>
  await axios.post(
    "/api/users/edit",
    { userData: dataInput },
    { headers: { authorization: encodedToken } }
  );
