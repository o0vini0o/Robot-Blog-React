import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import { Homepage } from "./pages";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Details from "./pages/Details";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="create" element={<CreateBlog />} />
        <Route path="robots/:id" element={<Details />} />
        <Route path="robots/:id/edit" element={<EditBlog />} />
      </Route>
    </Routes>
  );
}

export default App;
