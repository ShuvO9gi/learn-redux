import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectAllPost } from "../posts/postsSlice";
import { selectUserById } from "./userSlice";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const postByUser = useSelector((state) => {
    const allPost = selectAllPost(state);
    return allPost.filter((post) => post.userId === Number(userId));
  });

  const postTitles = postByUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
