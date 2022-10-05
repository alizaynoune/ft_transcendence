import style from "./profile.module.css";
import Image from "next/image";
import Statistics from "@/components/userStatistics/Statistics";
import UserData from "@/containers/userData/UserData";
import axios from "@/config/axios";
import { Badge, Button, Spin, Upload } from "antd";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectLoading, changeLoading } from "@/reducers/globalLoading";
// types
import { ProfileType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import authRoute from "@/tools/protectedRoutes";
import { useRouter } from "next/router";

const Profile: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const lazyRoot = useRef(null);
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [data, setData] = useState<ProfileType>({
        id: "",
        username: "",
        name: { first: "", last: "" },
        email: "",
        phone: "",
        gender: "",
        birthday: "",
        location: "",
        img_url: "",
        level: 0,
        users_achievements: [],
        matches: { total: 0, winne: 0 },
        cover: '',
    });

    const loadProfile = async () => {
        setLoading(true);
        dispatch(changeLoading(true));
        try {
            const { profile } = router.query
            console.log(router.query);
            
            const res = await axios.get(`profile`);
            console.log(res);
            setData(res.data);
            setLoading(false);
            dispatch(changeLoading(false));
            // console.log(data);
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
        loadProfile();
    }, []);

    return (
        <section className={style.container}>
            {loading ? (
                <Spin indicator={<LoadingOutlined />} />
            ) : (
                <>
                    <Badge.Ribbon text="Your Rank is 10" placement="start">
                        <div className={style.cover} ref={lazyRoot}>
                            <Image
                                lazyRoot={lazyRoot}
                                loader={() => data.cover} // ! change it
                                src="/images/defaultProfileCover.png"
                                layout="fill"
                                objectFit="cover"
                            />
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
                        </div>
                    </Badge.Ribbon>
                    <div className={style.statisticsData}>
                        <div className={style.statistics}>
                            <Statistics
                                achievements={data.users_achievements}
                                avatar={data.img_url}
                                matches={{ total: 10, winne: 2 }}
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
