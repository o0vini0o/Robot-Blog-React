import { Link } from "react-router";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar container flex justify-between items-center mx-auto p-4">
        <Link
          to="/"
          className="btn btn-soft btn-secondary text-3xl font-orbitron font-extrabold"
        >
          HOT BOTS HUB
        </Link>
        <div className="flex-none hidden md:block">
          <p className="text-lg font-mono text-secondary animate-pulse">
            ጿ ኈ ቼ ዽ ጿ ጿ ኈ ቼ ዽ ጿ ጿ ኈ ቼ ዽ ጿ
          </p>
        </div>
        <div className="flex-none">
          <Link to="/create" className="btn btn-soft btn-secondary text-3xl font-orbitron font-extrabold">
            ADD ROBOT
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
