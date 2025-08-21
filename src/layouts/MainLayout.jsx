import { Outlet } from "react-router";
import { Footer, Navbar } from "../components";
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
