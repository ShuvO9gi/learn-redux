import { useSelector } from "react-redux";
import PostEcerpt from "./PostEcerpt";
import { getAllError, getAllStatus, selectAllPost } from "./postsSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPost);
  const postStatus = useSelector(getAllStatus);
  const error = useSelector(getAllError);

  //since fetch post is used in index.js file that makes the posts visible for all the pages when page loads
  /* useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPost());
    }
  }, [postStatus, dispatch]); */

  let content;
  if (postStatus === "loading") {
    content = <p>Loading....</p>;
  } else if (postStatus === "succeeded") {
    const orderedPost = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPost.map((post) => (
      <PostEcerpt key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
