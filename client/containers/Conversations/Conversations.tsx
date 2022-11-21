import style from "./conversations.module.css";
import React, { useState, useContext, useEffect } from "react";
import NewConversation from "@/components/newConversation/NewConversation";
import { Input, Button, List, Skeleton, Divider, Avatar, Popover, Typography, Modal, message, Form, Select, Space } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import Icon from "@ant-design/icons";
import { SearchIcon, AddGroupIcon } from "@/icons/index";
import { ConversationMemberType, ConversationsType, MessengerContextType } from "@/types/types";
import moment from "moment";
import { MessengerContext } from "context/massengerContext";
import axios from "@/config/axios";
import type { SelectProps } from "antd";
import { useRouter } from "next/router";
import Socket from "@/config/socket";

const labelConversations = (members: ConversationMemberType[]) => {
    return members.map((m, key) => {
        return <Avatar key={key} src={m.users.img_url} />;
    });
};
const { Text } = Typography;
const { Paragraph } = Typography;
const HistroyMessenger: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { intra_id } = useAppSelector(selectAuth);
    const [form] = Form.useForm();
    const [search, setSearch] = useState<SelectProps["options"]>([]);
    const [openPopover, setOpenPopover] = useState<boolean>(false);
    const router = useRouter();
    const {
        conversations,
        hasMoreConversations,
        currentConversation,
        loadConversations,
        joinConversation,
        setConversations,
        setCurrentConversation,
    } = useContext(MessengerContext) as MessengerContextType;

    const loadMoreData = async () => {
        try {
            setLoading(true);
            await loadConversations();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleJoinConversation = (conv: ConversationsType) => {
        Modal.confirm({
            title: `Are you sure to join this conversation ${conv.title}`,
            content: conv.protected ? (
                <Form form={form}>
                    <Form.Item name={"password"}>
                        <Input.Password placeholder="entre password" size="large" />
                    </Form.Item>
                </Form>
            ) : null,
            async onOk() {
                try {
                    const res = (await joinConversation(
                        conv.id,
                        conv.protected ? form.getFieldValue("password") : undefined
                    )) as string;
                    message.success(res);
                } catch (error) {
                    error instanceof Error && message.error(error.message);
                }
            },
            onCancel() {},
        });
    };

    const searchConversations = async (value: string) => {
        try {
            const url = `conversation/search?title=${value}&pageSize=${40}&cursor=${search?.at(-1)?.value || 1}`;
            const res = (await axios.get(url)) as { data: ConversationsType[] };

            const data = res.data.map((item: ConversationsType) => ({
                value: item.id,
                label: (
                    <Space style={{ justifyContent: "space-between", width: "100%" }}>
                        <Avatar.Group maxCount={2} maxPopoverTrigger="click">
                            {labelConversations(item.members)}
                        </Avatar.Group>
                        <Text>{item.title}</Text>
                        <Button type="primary" onClick={() => handleJoinConversation(item)}>
                            {"Join"}
                        </Button>
                    </Space>
                ),
            })) as SelectProps["options"];
            setSearch(data);
        } catch (error) {
            error instanceof Error && message.error(error.message);
        }
    };

    useEffect(() => {
        Socket.on("updateConversation", (update: ConversationsType) => {
            const user = update.members.find((m) => m.userid === intra_id);
            if (!user || user.ban || new Date(user.endban).getTime() > new Date().getTime()) {
                setCurrentConversation(null);
                router.push("/messenger");
                setConversations((prev) => prev.filter((c) => c.id !== update.id));
            } else {
                setConversations((prev) => {
                    const find = prev.find((c) => c.id === update.id);
                    if (!find) return [update, ...prev];
                    else {
                        return prev.map((c) => {
                            if (c.id === update.id) return update;
                            return c;
                        });
                    }
                });
                if (currentConversation && currentConversation.id === update.id) {
                    changeConversation(update);
                }
            }
        });

        Socket.on("passwordChanged", (id) => {
            setCurrentConversation(null);
            router.push("/messenger");
        });

        return () => {
            Socket.off("updateConversation");
            Socket.off("passwordChanged");
        };
    }, []);

    const changeConversation = async (conversation: ConversationsType) => {
        if (conversation.type === "GROUP") router.push(`/messenger/group/${conversation.id}`);
        else {
            const id = conversation.members[0].userid === intra_id ? 1 : 0;
            const url = `/messenger/direct/${conversation.members[id].users.username}`;
            router.push(url);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <Select
                    showSearch
                    size="large"
                    style={{ width: "100%", borderRadius: "5px" }}
                    placeholder="find public conversations"
                    defaultActiveFirstOption={false}
                    value={null}
                    filterOption={false}
                    onSearch={searchConversations}
                    suffixIcon={<Icon component={SearchIcon} style={{ fontSize: 18, color: "var(--primary-color)" }} />}
                    notFoundContent={null}
                    options={search}
                    onFocus={() => searchConversations("")}
                />
                <Popover
                    className={style.popover}
                    open={openPopover}
                    content={
                        <NewConversation
                            setOpenPopover={(value: React.SetStateAction<boolean>) => {
                                setOpenPopover(value);
                            }}
                        />
                    }
                    placement="bottomRight"
                >
                    <Button
                        type="primary"
                        size="large"
                        icon={<Icon component={AddGroupIcon} style={{ fontSize: "120%" }} />}
                        onClick={() => setOpenPopover(!openPopover)}
                    />
                </Popover>
            </div>
            <div id="scrollableDiv" className={style.scrollableDiv}>
                <InfiniteScroll
                    dataLength={conversations.length}
                    next={loadMoreData}
                    hasMore={hasMoreConversations}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        className={style.conversationList}
                        loading={loading}
                        itemLayout="horizontal"
                        dataSource={conversations}
                        renderItem={(item) => (
                            <List.Item style={{ cursor: "pointer" }} onClick={() => changeConversation(item)}>
                                <List.Item.Meta
                                    avatar={
                                        item.type === "DIRECT" || item.members.length === 1 ? (
                                            <Avatar
                                                src={
                                                    item.members[
                                                        item.type === "DIRECT" && item.members[0].userid === intra_id ? 1 : 0
                                                    ].users.img_url
                                                }
                                                size="large"
                                            />
                                        ) : (
                                            <Avatar.Group maxCount={2} maxPopoverTrigger="focus">
                                                {item.members.map(
                                                    (m, key) =>
                                                        m.userid !== intra_id && <Avatar src={m.users.img_url} key={key} />
                                                )}
                                            </Avatar.Group>
                                        )
                                    }
                                    title={
                                        item.type === "GROUP"
                                            ? item.title
                                            : item.members[item.members[0].userid === intra_id ? 1 : 0].users.username
                                    }
                                />
                                <Paragraph type="secondary">{moment(item.updated_at).fromNow()}</Paragraph>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>
    );
};
export default HistroyMessenger;
