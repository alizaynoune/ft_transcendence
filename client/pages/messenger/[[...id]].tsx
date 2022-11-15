import style from "./messenger.module.css";
import { useRouter } from "next/router";
import Conversations from "@/containers/Conversations/Conversations";
import BoxMessenger from "@/containers/boxMessenger/BoxMessenger";
import SettingMessenger from "@/containers/settingMessenger/SettingMessenger";
import { useContext, useEffect, useState } from "react";
import { Tabs, Typography, Modal, Form, Input, message, Button } from "antd";
import { SettingIcon, MessageIcon, Messager1Icon } from "@/icons/index";
import { ConversationsType, MessengerContextType, UserType } from "types/types";
import Icon from "@ant-design/icons";
import authRoute from "@/tools/protectedRoutes";
import { useWindowSize } from "@/hooks/useWindowSize";
import MessengerProvider, { MessengerContext } from "context/massengerContext";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import axios from "@/config/axios";

const Messenger: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>("Conversations");
  const width = useWindowSize();
  const { conversations, currentConversation, loading, changeCurrentConversation, setCurrentConversation } = useContext(
    MessengerContext
  ) as MessengerContextType;
  const router = useRouter();
  const { query, isReady } = router;
  const [form] = Form.useForm();
  const user = useAppSelector(selectAuth);

  const onFinish = async (values: any, conversation: ConversationsType) => {
    console.log(values);
    try {
      await changeCurrentConversation(conversation.id, values.password);
      Modal.destroyAll();
    } catch (error: any) {
      message.error(error instanceof Error ? error.message : error);
    }
  };

  const changeConversation = async (conversation: ConversationsType) => {
    if (conversation.protected) {
      Modal.info({
        title: "Do you want to delete these items?",
        closable: true,
        content: (
          <Form form={form} onFinish={(v) => onFinish(v, conversation)}>
            <Form.Item name="password" rules={[{ required: true, min: 6, max: 20 }]}>
              <Input.Password placeholder="Entre Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">{"OK"}</Button>
            </Form.Item>
          </Form>
        ),
        okButtonProps: { hidden: true },
        onCancel() {},
      });
    } else {
      try {
        await changeCurrentConversation(conversation.id);
      } catch (error: any) {
        message.error(error instanceof Error ? error.message : error);
      }
    }
  };

  const newDirectConversation = async (username: string) => {
    try {
      const res = (await axios.get(`/users/${username}`)) as { data: UserType };
      if (!res.data) return;

      const fackMember = {
        id: 0,
        conversationid: 0,
        mute: false,
        active: true,
        ban: false,
        endban: new Date(),
        endmute: new Date(),
        isadmin: true,
        created_at: new Date(),
        updated_at: new Date(),
      };
      const fackConversation: ConversationsType = {
        id: 0,
        title: res.data.username,
        type: "DIRECT",
        active: true,
        created_at: new Date(),
        updated_at: new Date(),
        public: false,
        protected: false,
        members: [
          { ...fackMember, userid: res.data.intra_id, users: res.data },
          // @ts-ignore
          { ...fackMember, userid: user.intra_id, users: user },
        ],
      };
      setCurrentConversation(fackConversation);
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  const parsQuery = async (query: string[] | string) => {
    try {
      if (query[0] === "group" && /^(\d)+$/.test(query[1])) {
        const id = Number(query[1]);
        const conv = conversations.find((c) => c.type === "GROUP" && c.id === id);
        if (!conv || conv.id === currentConversation?.id) return;
        await changeConversation(conv);
      } else {
        const username = query[1];
        if (username === user.username) return;
        const conv = conversations.find(
          (c) => c.type === "DIRECT" && (c.members[0].users.username === username || c.members[1].users.username === username)
        );
        if (conv && currentConversation && conv.id === currentConversation.id) return;
        if (conv) await changeConversation(conv);
        else await newDirectConversation(username);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!query.id || !query.id[0] || !query.id[1] || loading) return;
    if (query.id[0] !== "group" && query.id[0] !== "direct") return;
    parsQuery(query.id);
  }, [isReady, query.id, loading]);

  const items = [
    {
      key: "Conversations",
      className: style.historyMessenger,
      label: (
        <>
          <Typography.Text className={style.tabText}>{"Conversations"}</Typography.Text>
          <Icon className={style.tabIcon} component={MessageIcon} />
        </>
      ),
      children: <Conversations />,
    },
    {
      key: "Messages",
      className: style.boxMessenger,
      label: (
        <>
          <Typography.Text className={style.tabText}>{"Messages"}</Typography.Text>
          <Icon className={style.tabIcon} component={Messager1Icon} />
        </>
      ),
      children: <BoxMessenger />,
      disabled: !currentConversation,
    },
    {
      key: "Settings",
      className: style.settingMessenger,
      label: (
        <>
          <Typography.Text className={style.tabText}>{"Settings"}</Typography.Text>
          <Icon className={style.tabIcon} component={SettingIcon} />
        </>
      ),
      children: <SettingMessenger />,
      disabled: !currentConversation,
    },
  ];

  useEffect(() => {
    if (!currentConversation) return;
    setCurrentTab("Messages");
  }, [currentConversation]);

  return width < 1200 ? (
    <div className={`${style.md} ${style.container}`}>
      <Tabs
        items={items}
        centered
        size="large"
        className={style.tabsContainer}
        activeKey={currentTab}
        onChange={(key) => {
          setCurrentTab(key);
        }}
      />
    </div>
  ) : (
    <div className={`${style.xxl} ${style.container}`}>
      <div className={style.historyMessenger}>
        <Conversations />
      </div>
      <div className={style.boxMessenger}>
        <BoxMessenger />
      </div>
      <div className={style.settingMessenger}>
        <SettingMessenger />
      </div>
    </div>
  );
};

const PageMessanger: React.FC = () => {
  return (
    <MessengerProvider>
      <Messenger />
    </MessengerProvider>
  );
};

export default authRoute(PageMessanger);
