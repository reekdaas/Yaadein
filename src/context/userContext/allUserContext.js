import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialState, userReducerFunction } from "./userContextReducer";
import {
  addToBookmarkService,
  editUserService,
  followUserService,
  getAllUsersServices,
  getBookmarkService,
  getUserByIdService,
  removePostFromBookmarkService,
  unfollowUserService,
} from "../../services/userServices";
import { actionTypes } from "../../utils/constant";
import { useAuthContext } from "../AuthContext";
import { toast } from "react-hot-toast";
const {
  GET_ALL_USER,
  GET_USER_SEARCH,
  GET_BOOKMARK,
  FOLLOW_USER,
  UPDATE_USER_PROFILE,
} = actionTypes;

export const UserContext = createContext(null);
export function UserContextProvider({ children }) {
  const { token } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const [allUserData, userDispatch] = useReducer(
    userReducerFunction,
    initialState
  );
  const getAllUsersData = async () => {
    try {
      const response = await getAllUsersServices();
      const {
        data: { users },
        status,
      } = response;
      // console.log(response);
      if (status === 200) {
        userDispatch({ type: GET_ALL_USER, payload: users });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getUserById = async (userId) => {
    try {
      setIsLoading(true);
      const response = await getUserByIdService(userId);
      // console.log(response);
      const {
        data: { user },
        status,
      } = response;

      if (status === 200) {
        userDispatch({ type: GET_USER_SEARCH, payload: user });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const addPostsToBookmark = async (postId) => {
    try {
      setIsLoading(true);
      const response = await addToBookmarkService(postId, token);

      const {
        data: { bookmarks },
        status,
      } = response;
      if (status === 200) {
        userDispatch({ type: GET_BOOKMARK, payload: bookmarks });
      }
      toast.success("Added To Bookmarks");
      // console.log(bookmarks, status);
    } catch (err) {
      // console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const removePostFromBookmark = async (postId) => {
    try {
      setIsLoading(true);
      const response = await removePostFromBookmarkService(postId, token);
      // console.log(response);
      const {
        data: { bookmarks },
        status,
      } = response;
      if (status === 200) {
        userDispatch({ type: GET_BOOKMARK, payload: bookmarks });
      }
      toast.success("Remove From Bookmarks");
      // console.log(response);
    } catch (err) {
      // console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const getBookmarkPost = async (token) => {
    try {
      const response = await getBookmarkService(token);
      const {
        data: { bookmarks },
        status,
      } = response;
      if (status === 200) {
        // console.log(bookmarks);
        userDispatch({ type: GET_BOOKMARK, payload: bookmarks });
      }
      // console.log(response?.data?.bookmarks);
    } catch (err) {
      // console.log(err);
    }
  };

  const followUserMethod = async (followUserId) => {
    try {
      setIsBtnDisabled(true);
      const response = await followUserService(followUserId, token);
      const {
        data: { user, followUser },
        status,
      } = response;

      if (status === 200) {
        userDispatch({ type: FOLLOW_USER, payload: [user, followUser] });
        toast.success("Followed User");
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
      // console.log(err);
    } finally {
      setIsBtnDisabled(false);
    }
  };

  const unfollowUserMethod = async (userId) => {
    try {
      setIsBtnDisabled(true);
      const response = await unfollowUserService(userId, token);
      const {
        data: { followUser, user },
        status,
      } = response;
      if (status === 200) {
        userDispatch({ type: FOLLOW_USER, payload: [followUser, user] });
        toast.success("Unfollowed User");
      }

      // console.log(response);
    } catch (err) {
      toast.error("Something Went Wrong!");
      // console.log(err);
    } finally {
      setIsBtnDisabled(false);
    }
  };
  const editUserProfile = async (userData) => {
    try {
      setIsLoading(true);
      // console.log(userData);
      const response = await editUserService(userData, token);
      const {
        data: { user },
        status,
      } = response;

      if (status === 201) {
        userDispatch({ type: UPDATE_USER_PROFILE, payload: user });
        // console.log(user);
        toast.success("Update Profile Successfully");
      }
    } catch (err) {
      // console.log(err);
      toast.error("Something Went Wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsersData();
    if (token) getBookmarkPost(token);
  }, [token]);

  // console.log(allUserData);
  const value = {
    allUserData,
    userDispatch,
    getAllUsersData,
    getUserById,
    isLoading,
    addPostsToBookmark,
    removePostFromBookmark,
    followUserMethod,
    unfollowUserMethod,
    isBtnDisabled,
    editUserProfile,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useAllUserContext() {
  const context = useContext(UserContext);
  return context;
}
