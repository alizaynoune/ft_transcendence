import style from "./profile.module.css";
import Image from "next/image";
import Statistics from "@/components/userStatistics/Statistics";
import UserData from "@/containers/userData/UserData";
import axios from "@/config/axios";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
// types
import { ProfileType } from "@/types/types";
import { useEffect, useState } from "react";

interface Props {
  data: ProfileType;
}

const Profile: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
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
      console.log(error.message, "<<<<<<error");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    console.log(data, "<<<<<<<<<<");
  }, [data]);

  return (
    <section className={style.container}>
      {loading ? (
        <Spin indicator={<LoadingOutlined />} />
      ) : (
        <>
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
