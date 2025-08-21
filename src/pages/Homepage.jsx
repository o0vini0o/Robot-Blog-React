import useRobots from "../hooks/useRobots";

const Homepage = () => {
  const { robots } = useRobots();
  console.log(robots);

  return <div>Homepage</div>;
};
export default Homepage;
