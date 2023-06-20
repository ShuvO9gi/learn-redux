import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../user/userSlice";
import { addNewPost } from "./postsSlice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addNewRequest, setAddNewRequest] = useState("idle");
  const dispatch = useDispatch();
  const user = useSelector(selectAllUsers);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addNewRequest === "idle";

  const onSavePost = () => {
    if (canSave) {
      try {
        setAddNewRequest("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap(); //promise returned by the dispatched thunk has an unwrap
        // property which can be called to extract the payload of a fulfilled action or to throw either the error
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.log("Failed to save the post", err);
      } finally {
        setAddNewRequest("idle");
      }
    }
  };

  const userOptions = user.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
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
        <button type="text" onClick={onSavePost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
