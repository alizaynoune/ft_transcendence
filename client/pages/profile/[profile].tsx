import style from "./profile.module.css";
import Image from "next/image";
import Statistics from "@/components/userStatistics/Statistics";
import UserData from "@/containers/userData/UserData";
import axios from "@/config/axios";
import PageError from "../_error";
import { Badge, Button, message, Upload } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { changeLoading, selectLoading } from "@/reducers/globalLoading";
import { selectAuth } from "@/store/reducers/auth";
import { ProfileType, UserType, RelationshipType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import authRoute from "@/tools/protectedRoutes";
import { useRouter } from "next/router";
import ProfileProvider from "context/profileContext";

const Profile: React.FC = () => {
  const loading = useAppSelector(selectLoading).Loading;
  const lazyRoot = useRef(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { query, isReady } = router;
  const [data, setData] = useState<(ProfileType & UserType & RelationshipType) | null>(null);
  const [error, setError] = useState<number>(200);
  const { intra_id } = useAppSelector(selectAuth);

  const loadProfile = async (profile: string | string[]) => {
    dispatch(changeLoading(true));
    try {
      setError(200);
      const res = await axios.get(`profile/${profile}`);
      setData(res.data);
      dispatch(changeLoading(false));
    } catch (error) {
      dispatch(changeLoading(false));
      if (error instanceof Error) {
        message.error(error.message);
        setError(error.status);
      }
    }
  };

  useEffect(() => {
    setData(null);
    if (isReady && query.profile) {
      if (query.profile !== "me") loadProfile(query.profile);
      else loadProfile("");
    }
  }, [isReady, query.profile]);

  useEffect(() => {
    console.log(data);
    
  }, [data])

  return (
    <section className={style.container}>
      {error !== 200 ? (
        <PageError statusCode={error} />
      ) : (
        !loading &&
        data && (
          <>
            <Badge.Ribbon text="Ranked 10" placement="start">
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
                <Statistics data={data} refresh={loadProfile} />
              </div>
              <div className={style.data}>
                <ProfileProvider>
                  <UserData profileId={data.intra_id} />
                </ProfileProvider>
              </div>
            </div>
          </>
        )
      )}
    </section>
  );
};
export default authRoute(Profile);
