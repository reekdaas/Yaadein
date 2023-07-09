export const sortByLatest = (allPosts) =>
  [...allPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

export const getSortedPosts = (allPosts, filteType) => {
  if (filteType === "Trending") {
    return [...allPosts].sort(
      (a, b) => b?.likes?.likeCount - a?.likes?.likeCount
    );
  }
  if (filteType === "Latest") {
    return [...allPosts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  if (filteType === "Oldest") {
    return [...allPosts].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }
  return allPosts;
};
