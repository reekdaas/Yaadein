import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { initialPostState, postReducer } from "./postReducer";
import {
  createPostService,
  deletePostService,
  dislikePostService,
  editPostService,
  getAllPostsServices,
  likePostService,
} from "../../services/postService";
import { actionTypes } from "../../utils/constant";
import { useAuthContext } from "../AuthContext";
import { toast } from "react-hot-toast";

const {
  GET_ALL_POST,
  LIKE_POST,
  DISLIKE_POST,
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
} = actionTypes;

export const AllPostContext = createContext(null);
export function PostContextProvider({ children }) {
  const { token } = useAuthContext();

  const [btnDisabled, setBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState("Trending");

  const [postState, postDispatch] = useReducer(postReducer, initialPostState);

  const getAllPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPostsServices();
      const {
        data: { posts },
        status,
      } = response;

      if (status === 200) {
        postDispatch({ type: GET_ALL_POST, payload: posts });
      }
      // console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const likedPostByUser = async (postId) => {
    try {
      const response = await likePostService(postId, token);
      const {
        data: { posts },
        status,
      } = response;
      if (status === 201) {
        postDispatch({ type: LIKE_POST, payload: posts });
        toast.success("Liked Posts");
      }
      // console.log(posts);
    } catch (err) {
      // console.log(err);
      toast.error("Something Went Wrong!");
    }
  };
  const disLikedByUser = async (postId) => {
    try {
      const response = await dislikePostService(postId, token);
      const {
        data: { posts },
        status,
      } = response;
      if (status === 201) {
        postDispatch({ type: DISLIKE_POST, payload: posts });
        toast.success("Disliked Posts");
      }
      // console.log(posts);
    } catch (err) {
      // console.log(err);
      toast.error("Something Went Wrong!");
    }
  };

  const createPostByUser = async (postContent) => {
    try {
      setIsLoading(true);
      setBtnDisabled(true);
      const response = await createPostService(postContent, token);
      const {
        data: { posts },
        status,
      } = response;
      // console.log(response);
      if (status === 201) {
        postDispatch({ type: CREATE_POST, payload: posts });
        toast.success("Created Post Successfully");
      }
    } catch (err) {
      toast.error("Something Went Wrong!");
      // console.log(err);
    } finally {
      setIsLoading(false);
      setBtnDisabled(false);
    }
  };

  const deletePost = async (postId) => {
    console.log(postId);
    try {
      setIsLoading(true);

      const response = await deletePostService(postId, token);

      const {
        data: { posts },
        status,
      } = response;
      if (status === 201) {
        console.log(posts);
        postDispatch({ type: DELETE_POST, payload: posts });
        toast.success("Post Deleted Successfully");
      }

      // console.log(response);
    } catch (err) {
      toast.error("Something Went Wrong!");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const editPostByUser = async (postId, content) => {
    try {
      setIsLoading(true);
      const response = await editPostService(postId, content, token);
      const {
        data: { posts },
        status,
      } = response;
      if (status === 201) {
        postDispatch({ type: EDIT_POST, payload: posts });
        toast.success("Post Edited Successfully");
      }
      // console.log(response);
    } catch (err) {
      toast.error("Something Went Wrong!");
      // console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // console.log(postState);

  const value = {
    postState,
    postDispatch,
    getAllPosts,
    isLoading,
    likedPostByUser,
    disLikedByUser,
    filterType,
    setFilterType,
    createPostByUser,
    btnDisabled,
    deletePost,
    editPostByUser,
  };
  return (
    <AllPostContext.Provider value={value}>{children}</AllPostContext.Provider>
  );
}

export function usePostContext() {
  const context = useContext(AllPostContext);
  return context;
}
