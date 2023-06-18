import { useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";
import { selectAllPost } from "./postsSlice";

const PostsList = () => {
  const posts = useSelector(selectAllPost); //const posts = useSelector((state) => state.posts);

  const orderedPost = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  //referenceStr.localeCompare(compareString) returns sort order -1, 1, or 0 (for before, after, or equal) negative number if referenceStr
  //occurs before compareString; positive if the referenceStr occurs after compareString; 0 if they are equivalent.
  //slice() method returns selected elements in an array, as a new array(without changing original array)

  const renderedPosts = orderedPost.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ));

  return (
    <section>
      <h2>PostsList</h2>
      {renderedPosts}
    </section>
  );
};

export default PostsList;
