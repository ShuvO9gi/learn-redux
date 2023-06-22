import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../user/userSlice";
import { deletePost, selectPostById, updatePost } from "./postsSlice";

const EditPostForm = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const user = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post Not Found!</h2>
      </section>
    );
  }

  const onTitleChange = (e) => setTitle(e.target.value);
  const onAuthorChange = (e) => setUserId(Number(e.target.value));
  const onContentChange = (e) => setContent(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSave = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.log("Failed to Update the Post!", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDelete = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: post.id })).unwrap();
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.log("Failed to Update the Post!", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  const userOptions = user.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="button" onClick={onSave} disabled={!canSave}>
          Save Post
        </button>
        <button className="deleteButton" type="button" onClick={onDelete}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
