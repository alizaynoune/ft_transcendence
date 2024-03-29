import style from "./newGameInviteFriends.module.css";
import { Avatar, List, Skeleton, Input, Divider, Typography, Badge, message } from "antd";
import Icon from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "@/config/axios";
import { SearchIcon } from "@/icons/index";
import { UserType } from "@/types/types";
import Link from "next/link";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import ModalInviteGame from "../modalInviteGame/ModalInviteGame";

const { Title } = Typography;
const NGameInvitFriends: React.FC = () => {
    const { intra_id } = useAppSelector(selectAuth);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<UserType[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("");

    const loadMoreData = async () => {
        setLoading(true);
        try {
            const cursor = data.at(-1)?.id || 1;
            const res = await axios.get(`/users/all?findBy=${filter}&cursor=${cursor}`);
            setHasMore(res.data.length === 20);
            setData((prev) => [...prev, ...res.data.filter((d: UserType) => d.intra_id !== intra_id)]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            error instanceof Error && message.error(error.message);
        }
    };

    useEffect(() => {
        loadMoreData();
    }, [filter]);

    return (
        <div className={style.container}>
            <div className={style.searchContainer}>
                <Title
                    level={5}
                    italic
                    type="secondary"
                    style={{
                        textAlign: "center",
                        color: "var(--light-color)",
                    }}
                >
                    {"Invite Friend"}
                </Title>
                <Input
                    className={style.search}
                    size="large"
                    placeholder="Enter name or email"
                    onChange={(e) => {
                        setData([]);
                        setFilter(e.target.value);
                    }}
                    suffix={<Icon component={SearchIcon} style={{ fontSize: "135%", color: "var(--light-color)" }} />}
                />
            </div>
            <div id="scrollableDiv" className={style.scrollableDiv}>
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={hasMore}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>{"It is all, nothing more 🤐"}</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        className={style.FriendsList}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item extra={<ModalInviteGame user={item} buttonProps={{ type: "primary", ghost: true }} />}>
                                <List.Item.Meta
                                    avatar={
                                        <Link href={`/profile/${item.username}`}>
                                            <a>
                                                <Badge
                                                    dot
                                                    status={
                                                        item.status === "ONLINE"
                                                            ? "success"
                                                            : item.status === "PLAYING"
                                                            ? "warning"
                                                            : "error"
                                                    }
                                                >
                                                    <Avatar src={item.img_url} size="large" />
                                                </Badge>
                                            </a>
                                        </Link>
                                    }
                                    title={item.username}
                                    description={item.email}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default NGameInvitFriends;
