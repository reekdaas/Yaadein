export const getAuthorOfPosts = (allUsers, post) =>
  allUsers.find(({ username }) => username === post?.username);

export const postOfCurrentUser = (allPosts, currentUser) =>
  allPosts.filter(({ username }) => username === currentUser);

export const isPostAlreadyInBookmark = (bookmarkList, post) =>
  bookmarkList.find(({ _id }) => _id === post?._id);
