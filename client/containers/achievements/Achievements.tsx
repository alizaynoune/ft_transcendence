import style from "./achievements.module.css";
import AchievementsCard from "@/components/achievementCard/AchievementCard";
import { Space } from "antd";

import { AchievementType } from "@/types/types";

const AchievMap = (achiv: AchievementType[]) => {
  return achiv.map((a, key) => {
    return (
      <div className={style.card} key={key}>
        <AchievementsCard achiv={a} />
      </div>
    );
  });
};

interface PropsType {
  achiv: AchievementType[];
}

const Achievements: React.FC<PropsType> = ({ achiv }) => {
  return <div className={style.container}>{AchievMap(achiv)}</div>;
};

export default Achievements;
