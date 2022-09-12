import style from "./achievements.module.css";
import AchievementsContainer from "@/containers/achievements/Achievements";
import { AchievementType } from "@/types/types";
import { Space } from "antd";

const Achiev: AchievementType[] = [
  {
    name: "Legendary",
    types: [
      {
        name: "silver",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        name: "bronze",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: false,
      },
      {
        name: "gold",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: false,
      },
      {
        name: "platinum",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: false,
      },
    ],
  },
  {
    name: "Wildfire",
    types: [
      {
        name: "silver",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        name: "bronze",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: true,
      },
      {
        name: "gold",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: false,
      },
      {
        name: "platinum",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: false,
      },
    ],
  },
  {
    name: "Friendly",
    types: [
      {
        name: "silver",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        name: "bronze",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: true,
      },
      {
        name: "gold",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: false,
      },
      {
        name: "platinum",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: false,
      },
    ],
  },
  {
    name: "Winner",
    types: [
      {
        name: "silver",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        name: "bronze",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: true,
      },
      {
        name: "gold",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: true,
      },
      {
        name: "platinum",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: false,
      },
    ],
  },
  {
    name: "Sharpshooter",
    types: [
      {
        name: "silver",
        xp: 100,
        description: "win 1 matche with a max score",
        wind: true,
      },
      {
        name: "bronze",
        xp: 250,
        description: "win 2 matche with a max score",
        wind: true,
      },
      {
        name: "gold",
        xp: 350,
        description: "win 3 matche with a max score",
        wind: true,
      },
      {
        name: "platinum",
        xp: 500,
        description: "win 4 matche with a max score",
        wind: true,
      },
    ],
  },
  {
    name: "Photogenic",
    types: [
      {
        name: "gold",
        xp: 200,
        description: "change your avatar",
        wind: true,
      },
      {
        name: "platinum",
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

export default Achievements;
