import style from "./conversations.module.css";
import React, { useState, useEffect, SetStateAction, useContext } from "react";
import NewConversation from "@/components/newConversation/NewConversation";
import { Input, Button, List, Skeleton, Divider, Avatar, Popover, Typography, Modal, message, Form } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
// icons
import Icon, { ExclamationCircleOutlined } from "@ant-design/icons";
import { SearchIcon, AddGroupIcon } from "@/icons/index";
// Types
import { ConversationsType, MessengerContextType, PromiseReturn } from "@/types/types";
import moment from "moment";
import { MessengerContext } from "context/massengerContext";

const { Paragraph } = Typography;
const HistroyMessenger: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { intra_id } = useAppSelector(selectAuth);
  const [form] = Form.useForm();
  const { conversations, hasMoreConversations, loadConversations, changeCurrentConversation } = useContext(
    MessengerContext
  ) as MessengerContextType;

  const loadMoreData = async () => {
    try {
      setLoading(true);
      await loadConversations();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // const modalConversation = (id: number) => {
  //   {
  //     return Modal.info({
  //       title: "This is a notification message",
  //       content: (
  //         <div>
  //           <p>some messages...some messages...</p>
  //           <p>some messages...some messages...</p>
  //         </div>
  //       ),
  //       onOk() {},
  //     });
  //   }
  // };

  const changeConversation = async (conversation: ConversationsType) => {
    if (conversation.protected) {
      Modal.info({
        title: "Do you want to delete these items?",
        closable: true,
        content: (
          <Form form={form}>
            <Form.Item name="password" rules={[{ required: true, min: 6, max: 20 }]}>
              <Input />
            </Form.Item>
          </Form>
        ),
        async onOk() {
          try {
            // return await new Promise((resolve, reject) => {
            //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);

            // });
            // console.log(form.getFieldValue('password'));

            const res = await changeCurrentConversation(conversation.id, form.getFieldValue("password"));
            console.log(res, "error");
          } catch (error: any) {
            message.error(error instanceof Error ? error.message : error);
          }
        },
        onCancel() {},
      });
    } else {
      try {
        const res = await changeCurrentConversation(conversation.id);
        console.log("done");
      } catch (error: any) {
        message.error(error instanceof Error ? error.message : error);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Input
          style={{
            borderRadius: "5px",
          }}
          suffix={<Icon component={SearchIcon} style={{ fontSize: "120%", color: "var(--primary-color)" }} />}
          placeholder="find friends"
        />
        <Popover className={style.popover} trigger="click" content={<NewConversation />} placement="bottomRight">
          <Button type="primary" size="large" icon={<Icon component={AddGroupIcon} style={{ fontSize: "120%" }} />} />
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
                    item.members.length == 2 ? (
                      <Avatar src={item.members[item.members[0].userid === intra_id ? 1 : 0].users.img_url} size="large" />
                    ) : (
                      <Avatar.Group maxCount={2} maxPopoverTrigger="click">
                        {item.members.map((m, key) => m.userid !== intra_id && <Avatar src={m.users.img_url} key={key} />)}
                      </Avatar.Group>
                    )
                  }
                  title={
                    item.type === "GROUP" ? item.title : item.members[item.members[0].userid === intra_id ? 1 : 0].users.username
                  }
                  // description={
                  //   <Paragraph ellipsis type="secondary" style={{ width: "90%" }}>
                  //     {item.message[0]?.message}
                  //   </Paragraph>
                  // }
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
