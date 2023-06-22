import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/redux(davegray)/components/Layout";
import AddPostForm from "./components/redux(davegray)/features/posts/AddPostForm";
import EditPostForm from "./components/redux(davegray)/features/posts/EditPostForm";
import PostsList from "./components/redux(davegray)/features/posts/PostsList";
import SinglePagePost from "./components/redux(davegray)/features/posts/SinglePagePost";
import UserPage from "./components/redux(davegray)/features/user/UserPage";
import UsersList from "./components/redux(davegray)/features/user/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePagePost />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
