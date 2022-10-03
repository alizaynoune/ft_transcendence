import style from "./profile.module.css";
import Image from "next/image";
import Statistics from "@/components/userStatistics/Statistics";
import UserData from "@/containers/userData/UserData";
import axios from "@/config/axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {selectLoading, changeLoading} from '@/reducers/globalLoading'
// types
import { ProfileType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import authRoute from "@/tools/protectedRoutes";

const Profile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const lazyRoot = useRef(null);
  const dispatch = useAppDispatch()
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
    img_url: '',
    level: 0,
    achivements: [{ name: "", types: [] }],
    matches: { total: 0, winne: 0 },
  });

  const loadProfile = async () => {
    setLoading(true);
    dispatch(changeLoading(true))
    try {
      const res = await axios.get(`profile`);
      console.log(res);
      setData(res.data);
      setLoading(false);
      dispatch(changeLoading(false))
      // console.log(data);
    } catch (error) {
      dispatch(changeLoading(false))
      setLoading(false);
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.log(message, "<<<<<<error");
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
              loader={() => "https://random.imagecdn.app/1800/800"} // ! change it
              src="/images/defaultProfileCover.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={style.statisticsData}>
            <div className={style.statistics}>
              <Statistics
                achievements={data.achivements}
                avatar={data.img_url}
                matches={{total: 10, winne: 2}}
                level={20.22}
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

export default authRoute(Profile);
