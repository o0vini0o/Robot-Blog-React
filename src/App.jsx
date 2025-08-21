import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import { Homepage } from "./pages";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="create" element={<CreateBlog />} />
        </Route>
      </Routes>
  );
}

export default App;
