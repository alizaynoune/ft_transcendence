import style from "./profile.module.css";
import Image from "next/image";
import Statistics from "@/components/userStatistics/Statistics";
import UserData from "@/containers/userData/UserData";
import axios from "@/config/axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// types
import { ProfileType } from "@/types/types";
import { useEffect, useRef, useState } from "react";


const Profile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const lazyRoot = useRef(null)
  const [data, setData] = useState<ProfileType>({
    id: "",
    username: "",
    name: { first: "", last: "" },
    email: "",
    phone: "",
    gender: "",
    birthday: "",
    location: "",
    avatar: "",
    level: 0,
    achievements: [{ name: "", types: [] }],
    matches: { total: 0, winne: 0 },
  });

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`api/fake/user`);
      // const data = await res.data.json();
      setData(res.data);
      setLoading(false);
      // console.log(data);
    } catch (error) {
      setLoading(false);
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
//console.log(message, "<<<<<<error");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <section className={style.container}>
      {loading ? (
        <Spin indicator={<LoadingOutlined />} />
      ) : (
        <>
          <div className={style.cover} ref={lazyRoot}>
            <Image
              lazyRoot={lazyRoot}
              loader={() => 'https://random.imagecdn.app/1800/800'}
              src="/images/defaultProfileCover.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={style.statisticsData}>
            <div className={style.statistics}>
              <Statistics
                achievements={data.achievements}
                avatar={data.avatar}
                matches={data.matches}
                level={data.level}
              />
            </div>
            <div className={style.data}>
              <UserData />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
