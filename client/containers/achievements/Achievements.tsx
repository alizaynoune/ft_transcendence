import style from "./achievements.module.css";
import AchievementsCard from "@/components/achievementCard/AchievementCard";
import { Space } from "antd";

import { AchievementListType } from "@/types/types";

const AchievMap = (achiv: AchievementListType) => {
  return achiv.types.map((t, key) => {
    return (
      <div className={style.card} key={key}>
        <AchievementsCard name={achiv.name} type={{ ...t }} />
      </div>
    );
  });
};

const Achievements: React.FC<AchievementListType> = (props) => {
  return <div className={style.container}>{AchievMap(props)}</div>;
};

export default Achievements;
