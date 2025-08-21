import { useNavigate } from "react-router";

const RobotCard = ({ robot }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card bg-secondary rounded-3xl"
      onClick={() => navigate(`/robots/${robot.id}`)}
    >
      <figure className="w-full h-56 overflow-hidden">
        <img
          src={robot.cover}
          alt={robot.title}
          className="object-cover w-full h-full"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-orbitron">{robot.title}</h2>
        <p className="text-white font-momo line-clamp-2">{robot.content}</p>
      </div>
    </div>
  );
};

export default RobotCard;
