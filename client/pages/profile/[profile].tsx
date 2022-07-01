import style from "styles/profile.module.css";
import type {  GetStaticProps, GetStaticPaths, GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
// import { Image } from "antd";
import Statistics from "@/components/userStatistics/Statistics";
import UserData from "@/containers/userData/UserData";
import { useEffect, useState } from "react";
import axios from "axios";
// types
import {ProfileType} from '@/types/types'

interface Props {
  data : ProfileType
}

const Profile: React.FC<Props> = (props) => {
  // const [data, setData] = useState<ProfileType | null>(null)
  const [loading, setLoading] = useState(false)
  const {achievements, avatar, matches, level} = props.data

  const loadProfile = () => {
    if (loading) {
      return;
    }
    setLoading(true)
    // axios.get('http://localhost:3000/profile/me').then(res => {
    //   console.log(re)
    // })
    console.log(props.data);
    
  }

  useEffect(() => {
    loadProfile()
  }, [])
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
  // try {
    // const res = await axios.get('http://localhost:3000/profile/me');
    const res = await fetch(`http://localhost:3000/api/fake/user`)
  const data = await res.json()
  return { props: { data } }
  // } catch (error) {
  //   console.log(error);
    
  // }
}

export default Profile;
