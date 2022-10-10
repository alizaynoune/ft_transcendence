import style from "./achievements.module.css";
import AchievementsContainer from "@/containers/achievements/Achievements";
import { AchievementType } from "@/types/types";
import authRoute from "@/tools/protectedRoutes";
import axios from "@/config/axios";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { changeLoading, selectLoading } from "@/store/reducers/globalLoading";
import _ from "lodash";

const Achievements: React.FC = () => {
  const [achiveList, setAchiveList] = useState<AchievementType[][]>();
  const dispatch = useAppDispatch();
  const fetchAchievements = async () => {
    dispatch(changeLoading(true));
    try {
      const res = await axios.get("achievements");
      res.data.map((i: { users_achievements: any }) => {
        i.users_achievements = i.users_achievements.length > 0;
        delete Object.assign(i, { wind: i.users_achievements })["users_achievements"];
      });

      const grouped: AchievementType[][] = Object.values(_.groupBy(res.data, "name"));
      setAchiveList(grouped);

      dispatch(changeLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(changeLoading(false));
    }
  };

  const mapAchievement = () => {
    return achiveList?.map((a, key) => {
      return <AchievementsContainer achiv={a} key={key} />;
    });
  };

  useEffect(() => {
    fetchAchievements();
  }, []);
  return <div className={style.container}>{mapAchievement()}</div>;
};

export default authRoute(Achievements);
