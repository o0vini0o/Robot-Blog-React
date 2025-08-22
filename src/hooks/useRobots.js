import { useContext } from "react";
import RobotsContext from "../contexts/RobotsContext";

const useRobots = () => {
  const context = useContext(RobotsContext);
  if (!context)
    throw new Error("useRobots must be used within a RobotContextProvider");
  return context;
};
export default useRobots;
