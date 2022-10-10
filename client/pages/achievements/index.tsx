import style from "./achievements.module.css";
import AchievementsContainer from "@/containers/achievements/Achievements";
import { AchievementListType } from "@/types/types";
import authRoute from "@/tools/protectedRoutes";
const Achiev: AchievementListType[] = [
  {
    name: "legendary",
    types: [
      {
        level: "SILVER",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        level: "BRONZE",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: false,
      },
      {
        level: "GOLD",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: false,
      },
      {
        level: "PLATINUM",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: false,
      },
    ],
  },
  {
    name: "wildfire",
    types: [
      {
        level: "SILVER",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        level: "BRONZE",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: true,
      },
      {
        level: "GOLD",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: false,
      },
      {
        level: "PLATINUM",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: false,
      },
    ],
  },
  {
    name: "friendly",
    types: [
      {
        level: "SILVER",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        level: "BRONZE",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: true,
      },
      {
        level: "GOLD",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: false,
      },
      {
        level: "PLATINUM",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: false,
      },
    ],
  },
  {
    name: "winner",
    types: [
      {
        level: "SILVER",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        level: "BRONZE",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: true,
      },
      {
        level: "GOLD",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: true,
      },
      {
        level: "PLATINUM",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: false,
      },
    ],
  },
  {
    name: "sharpshooter",
    types: [
      {
        level: "SILVER",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        level: "BRONZE",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: true,
      },
      {
        level: "GOLD",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: true,
      },
      {
        level: "PLATINUM",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: true,
      },
    ],
  },
  {
    name: "photogenic",
    types: [
      {
        level: "GOLD",
        xp: 200,
        description: "change your avatar",
        wind: true,
      },
      {
        level: "PLATINUM",
        xp: 300,
        description: "change your cover",
        wind: true,
      },
    ],
  },
];

const AchievMap = () => {
  return Achiev.map((achi, key) => {
    return <AchievementsContainer {...achi} key={key}/>;
  });
};

const Achievements: React.FC = () => {
  return (
    <div className={style.container}>
      {AchievMap()}
    </div>
  );
};

// export default Achievements;
export default authRoute(Achievements)
