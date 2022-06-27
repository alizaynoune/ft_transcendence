import style from "styles/profile.module.css";
import type { NextPage } from "next";
import Image from "next/image";
// import { Image } from "antd";
import Statistics from "components/userStatistics/Statistics";
import UserData from "containers/userData/UserData";

const Profile: NextPage = () => {
  return (
    <section className={style.container}>
      <div className={style.cover}>
        <Image
          src="/images/defaultProfileCover.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={style.statisticsData}>
        <div className={style.statistics}>
          <Statistics />
        </div>
        <div className={style.data}>
          <UserData />
        </div>
      </div>
    </section>
  );
};

export default Profile;
