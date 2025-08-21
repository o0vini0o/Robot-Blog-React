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
    return <div>Error: {err.message || "Something went wrong"}</div>;
  }

  if (!robots || robots.length === 0) {
    return <div>No robots found.</div>;
  }

  return (
    <div>
      {robots.map((r) => {
        return <div key={r.id}>{r.title}</div>;
      })}
    </div>
  );
};
export default Homepage;
