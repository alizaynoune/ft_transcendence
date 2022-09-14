import style from "./profile.module.css";
import Image from "next/image";
import Statistics from "@/components/userStatistics/Statistics";
import UserData from "@/containers/userData/UserData";
import axios from "@/config/axios";

// types
import {ProfileType} from '@/types/types'

interface Props {
  data : ProfileType
}

const Profile: React.FC<Props> = (props) => {
  const {achievements, avatar, matches, level} = props.data
  console.log(props);
  
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
          <Statistics 
          achievements={achievements}
          avatar={avatar}
          matches={matches}
          level={level}
          />
        </div>
        <div className={style.data}>
          <UserData />
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await axios.get(`api/fake/user`)
  const {data} = res;
  // console.log(res);
  
  return { props: { data } }
  } catch (error) {
    console.log(error);
    return error
  }
}

// export default AuthRoute(Profile);
export default Profile
