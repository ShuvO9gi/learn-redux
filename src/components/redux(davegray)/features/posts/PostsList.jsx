import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostEcerpt from "./PostEcerpt";
import {
  fetchPost,
  getAllError,
  getAllStatus,
  selectAllPost,
} from "./postsSlice";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPost);
  const postStatus = useSelector(getAllStatus);
  const error = useSelector(getAllError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPost());
    }
  }, [postStatus, dispatch]);

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

  return (
    <section>
      <h2>PostsList</h2>
      {content}
    </section>
  );
};

export default PostsList;
