import { actionTypes } from "../../utils/constant";

const {
  GET_ALL_USER,
  GET_USER_SEARCH,
  GET_BOOKMARK,
  FOLLOW_USER,
  UPDATE_USER,
  UPDATE_USER_PROFILE,
} = actionTypes;

export const currentUser = {
  username: "",
  firstName: "",
  lastName: "",
  bio: "",
  website: "",
  avatarUrl: "",
};

export const initialState = {
  allUsers: [],
  bookmarkedPosts: [],
  user: {},
  currentUser: currentUser,
};

export function userReducerFunction(state, { type, payload }) {
  switch (type) {
    case GET_ALL_USER: {
      return { ...state, allUsers: payload };
    }
    case GET_USER_SEARCH: {
      return { ...state, user: payload };
    }
    case GET_BOOKMARK: {
      return { ...state, bookmarkedPosts: payload };
    }
    case FOLLOW_USER: {
      const updatedUserList = state.allUsers.map((user) => {
        const updatedUser = payload.find(({ _id }) => _id === user?._id);
        return updatedUser ? updatedUser : user;
      });
      return { ...state, allUsers: updatedUserList };
      // console.log(updatedUserList)
    }
    case UPDATE_USER: {
      // console.log(payload);
      return { ...state, currentUser: { ...state.currentUser, ...payload } };
    }
    case UPDATE_USER_PROFILE: {
      const updatedUserId = payload?._id;
      const newUserList = state?.allUsers.map((user) =>
        updatedUserId === user?._id ? { ...payload } : user
      );
      return { ...state, allUsers: newUserList };
    }
    default:
      return state;
  }
}
