import { actionTypes } from "../../utils/constant";

const {
  GET_ALL_POST,
  LIKE_POST,
  DISLIKE_POST,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  EDIT_POST,
} = actionTypes;
export const initialPostData = {
  content: "",
};

export const initialPostState = {
  allPosts: [],
  post: initialPostData,
};

export function postReducer(state, { type, payload }) {
  switch (type) {
    case GET_ALL_POST: {
      return { ...state, allPosts: payload };
    }
    case LIKE_POST: {
      return { ...state, allPosts: payload };
    }
    case DISLIKE_POST: {
      return { ...state, allPosts: payload };
    }
    case CREATE_POST: {
      return { ...state, allPosts: payload };
    }
    case DELETE_POST: {
      return { ...state, allPosts: payload };
    }
    case UPDATE_POST: {
      return { ...state, post: { ...state?.post, content: payload?.content } };
    }
    case EDIT_POST: {
      return { ...state, allPosts: payload };
    }

    default:
      return state;
  }
}
