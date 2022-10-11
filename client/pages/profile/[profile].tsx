import style from "./profile.module.css";
import Image from "next/image";
import Statistics from "@/components/userStatistics/Statistics";
import UserData from "@/containers/userData/UserData";
import PageError from "../_error";
import { Badge, Button, message, Upload } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { ProfileContextType } from "@/types/types";
import React, { useContext, useEffect, useRef, useState } from "react";
import authRoute from "@/tools/protectedRoutes";
import { useRouter } from "next/router";
import ProfileProvider, { ProfileContext } from "context/profileContext";

const MProfile: React.FC = () => {
  const lazyRoot = useRef(null);
  const router = useRouter();
  const { query, isReady } = router;
  const [error, setError] = useState<number>(200);
  const [loading, setLoading] = useState<boolean>(false);

  const { profile, loadProfile, isMyProfile } = useContext(ProfileContext) as ProfileContextType;

  const loadingProfile = async () => {
    setLoading(true);
    setError(200);
    if (isReady && query.profile) {
      try {
        if (query.profile !== "me") await loadProfile(query.profile);
        else await loadProfile("");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          message.error(error.message);
          setError(error.status);
        }
      }
    }
  };

  useEffect(() => {
    console.log('url changed');
    loadingProfile();
  }, [isReady, query.profile]);

  return (
    <section className={style.container}>
      {error !== 200 ? (
        <PageError statusCode={error} />
      ) : (
        !loading &&
        profile && (
          <>
            <Badge.Ribbon text="Ranked 10" placement="start">
              <div className={style.cover} ref={lazyRoot}>
                <Image
                  lazyRoot={lazyRoot}
                  loader={() => profile.cover || "/images/defaultProfileCover.png"} // ! change it
                  src="/images/defaultProfileCover.png"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
                {isMyProfile && (
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
                <Statistics data={profile} refresh={loadingProfile} />
              </div>
              <div className={style.data}>
                <UserData />
              </div>
            </div>
          </>
        )
      )}
    </section>
  );
};

const PageProfile: React.FC = () => {
  return (
    <ProfileProvider>
      <MProfile />
    </ProfileProvider>
  );
};

export default authRoute(PageProfile);
