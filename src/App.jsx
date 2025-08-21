import { Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import { Homepage } from "./pages";
import Details from "./pages/Details";
import { RobotsContextProvider } from "./contexts/robotsContext";
function App() {
  return (
    <RobotsContextProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="robot/:id" element={<Details />} />
        </Route>
      </Routes>
    </RobotsContextProvider>
  );
}

export default App;
