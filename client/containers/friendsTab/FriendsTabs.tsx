import style from "./friendsTabs.module.css";
import { Tabs, List, Avatar, Typography } from "antd";
import Icon, { EditFilled } from "@ant-design/icons";
import FriendsList from "@/components/friendsList/FriendsList";
import Request from "@/components/RequestList/RequestList";
import { FriendsIcon, AddFriendIcon } from "@/icons/index";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";

const { TabPane } = Tabs;
interface PropsType {
    profileId: number;
}
const FriendsTabs: React.FC<PropsType> = ({ profileId }) => {
    const { intra_id } = useAppSelector(selectAuth);
    return (
        <div className={style.container}>
            <Tabs
                size="large"
                tabBarStyle={{
                    backgroundColor: "#464E5F",
                    width: "100%",
                    margin: "auto",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    boxShadow: "0px 0px 8px rgba(154, 154, 154, 0.5)",
                    padding: "0 40px",
                    color: "var(--light-color)",
                }}
            >
                <TabPane
                    tab={
                        <>
                            <Typography className={style.tabText}>
                                {"Friends"}
                            </Typography>
                            <Icon
                                component={FriendsIcon}
                                className={style.tabIcon}
                            />
                        </>
                    }
                    key="1"
                >
                    <FriendsList profileId={profileId} />
                </TabPane>
                {intra_id === profileId && (
                    <TabPane
                        tab={
                            <>
                                <Typography className={style.tabText}>
                                    {"Friend requests"}
                                </Typography>
                                <Icon
                                    component={AddFriendIcon}
                                    className={style.tabIcon}
                                />
                            </>
                        }
                        key="2"
                    >
                        <Request />
                    </TabPane>
                )}
            </Tabs>
        </div>
    );
};

export default FriendsTabs;
