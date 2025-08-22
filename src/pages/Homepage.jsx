import { RobotCard } from "../components";
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
    <div className="grid grid-cols-2  gap-8 p-4 md:grid-cols-3 lg:grid-cols-4">
      {[...robots].reverse().map((r) => {
        return <RobotCard key={r.id} robot={r} />;
      })}
    </div>
  );
};

export default Homepage;
