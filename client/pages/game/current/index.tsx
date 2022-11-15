import CurrentGame from "@/containers/currentGame/CurrentGame";
import authRoute from "@/tools/protectedRoutes";

const Games: React.FC = () => {
  return <CurrentGame />;
};

export default authRoute(Games);
