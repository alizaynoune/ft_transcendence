import style from "./achievements.module.css";
import AchievementsCard from "@/components/achievementCard/AchievementCard";
import { Space } from "antd";

import { AchievementType } from "@/types/types";

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
        wind: false,
      },
    ],
  },
  {
    name: "Photogenic",
    types: [
      {
        name: "platinum",
        xp: 200,
        description: "change your avatar",
        wind: true,
      },
    ],
  },
];

const AchievMap = (achiv: AchievementType) => {
  return achiv.types.map((t, key) => {
    return (
      <div className={style.card} key={key}>
        <AchievementsCard name={achiv.name} type={{ ...t }} />
      </div>
    );
  });
};

const Achievements: React.FC<AchievementType> = (props) => {
  return <div className={style.container}>{AchievMap(props)}</div>;
};

export default Achievements;
