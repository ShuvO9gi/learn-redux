import { useSelector } from "react-redux";
import { selectAllUsers } from "../user/userSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  //console.log(userId);
  const author = users.find((user) => user.id === userId);
  //console.log(author);
  return <span>by {author ? author.name : "Unknown Author"}</span>;
};

export default PostAuthor;
