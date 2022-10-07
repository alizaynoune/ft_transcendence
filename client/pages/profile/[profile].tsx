import style from "./profile.module.css";
import Image from "next/image";
import Statistics from "@/components/userStatistics/Statistics";
import UserData from "@/containers/userData/UserData";
import axios from "@/config/axios";
import { Badge, Button, Spin, Upload } from "antd";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { changeLoading } from "@/reducers/globalLoading";
import { selectAuth } from "@/store/reducers/auth";
// types
import { ProfileType, UserType, RelationshipType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import authRoute from "@/tools/protectedRoutes";
import { useRouter } from "next/router";
import ProfileProvider from "context/profileContext";

//
const Profile: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const lazyRoot = useRef(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query, isReady } = router;
  const [data, setData] = useState<ProfileType & UserType & RelationshipType>();
  const { intra_id } = useAppSelector(selectAuth);

  const loadProfile = async (profile: string | string[]) => {
    setLoading(true);
    dispatch(changeLoading(true));
    try {
      const res = await axios.get(`profile/${profile}`);
      console.log(res);
      setData(res.data);
      const test = (({ id, username }) => ({ user: id, name: username }))(res.data);
      console.log(test, "<<<<<done");

      setLoading(false);
      dispatch(changeLoading(false));
    } catch (error) {
      dispatch(changeLoading(false));
      setLoading(false);
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      console.log(message, "<<<<<<error");
    }
  };

  useEffect(() => {
    if (isReady && query.profile) {
      if (query.profile !== "me") loadProfile(query.profile);
      else loadProfile("");
    }
  }, [isReady, query.profile]);

  return (
    <section className={style.container}>
      {loading || !data ? (
        <Spin indicator={<LoadingOutlined />} />
      ) : (
        <>
          <Badge.Ribbon text="Your Rank is 10" placement="start">
            <div className={style.cover} ref={lazyRoot}>
              <Image
                lazyRoot={lazyRoot}
                loader={() => data.cover || "/images/defaultProfileCover.png"} // ! change it
                src="/images/defaultProfileCover.png"
                layout="fill"
                objectFit="cover"
                priority
              />
              {intra_id === data.intra_id && (
                <Upload>
                  <Button
                    icon={<EditOutlined size={1} />}
                    shape="circle"
                    size="large"
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      color: "var(--light-color)",
                    }}
                  />
                </Upload>
              )}
            </div>
          </Badge.Ribbon>
          <div className={style.statisticsData}>
            <div className={style.statistics}>
              <Statistics data={data} />
            </div>
            <div className={style.data}>
              <ProfileProvider>
                <UserData profileId={data.intra_id} />
              </ProfileProvider>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default authRoute(Profile);
