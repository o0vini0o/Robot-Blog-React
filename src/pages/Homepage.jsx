import { Link } from "react-router-dom";
import useRobots from "../hooks/useRobots";

const Homepage = () => {
  const { robots, isLoading, err } = useRobots();
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  if (err) {
    return (
      <div className="alert alert-error shadow-lg w-full max-w-md mx-auto mt-10">
        <span>Fehler: {err.message || "Etwas ist schiefgelaufen"}</span>
      </div>
    );
  }

  if (!robots || robots.length === 0) {
    return (
      <div className="alert alert-info shadow-lg w-full max-w-md mx-auto mt-10">
        <span>Keine Roboter-Beiträge gefunden.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-8 text-center font-bold">Roboter-Blog</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {robots.map((post) => (
          <div
            key={post.id}
            className="card bg-base-200 shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
          >
            {post.cover && (
              <figure>
                <img
                  src={post.cover}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title justify-center">{post.title}</h2>
              <p className="text-center">
                {post.content.length > 80
                  ? post.content.slice(0, 80) + "..."
                  : post.content}
              </p>
              <div className="card-actions justify-center mt-4">
                <Link to={`/post/${post.id}`} className="btn btn-secondary">
                  Beschreibung
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
