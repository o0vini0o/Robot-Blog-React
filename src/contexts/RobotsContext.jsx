import { createContext, useEffect, useState } from "react";

const RobotsContext = createContext();

export const RobotsContextProvider = ({ children }) => {
  const [robots, setRobots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:3000/robots");
        if (!res.ok) {
          setErr("Error fetching data");
          return;
        }
        const data = await res.json();
        setRobots(data.results);
      } catch (error) {
        setErr(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <RobotsContext value={{ robots, setRobots, isLoading, err }}>
      {children}
    </RobotsContext>
  );
};
export default RobotsContext;
