import style from "./settingMessenger.module.css";
import { Avatar, Button, Card, Space, Typography } from "antd";

import { ConversationsType } from "@/types/types";
import { useEffect } from "react";
import Icon from "@ant-design/icons";

import SettingIcon from "@/icons/Settings2.svg";

type PropsType = {
  conversation: ConversationsType;
};

const CardGridStyle = {
  width: "100%",
};

const SettingMessenger: React.FC<PropsType> = ({ conversation }) => {
  //   console.log(props.conversation);
  // const []

  useEffect(() => {
    console.log(conversation.id);
  }, [conversation]);

  return (
    <div className={style.container}>
      {conversation.type !== "group" && (
        <Avatar
          style={{
            marginBottom: "-35px",
            zIndex: 10,
          }}
          src={
            conversation.members[1].avatar
          }
          size={70}
        />
      )}
      <Card
        className={style.card}
        title={
          <Space direction="vertical" align="center">
            <Typography.Text strong>
              {conversation.type === "group"
                ? conversation.name
                : conversation.members[1].name.username}
            </Typography.Text>
            <Typography.Text type="secondary">
              {conversation.members[1].email}
            </Typography.Text>
          </Space>
        }
        // cover={<Avatar src={conversation.members[0].avatar} size='large' />}
        extra={
          conversation.type === "group" ? (
            <Button
              type="link"
              ghost
              icon={
                <Icon
                  component={SettingIcon}
                  // style={{ color: "var(--primary-color)", fontSize: "120%" }}
                />
              }
            />
          ) : null
        }
      >
        {/* <p>Card content</p> */}
        <Card.Grid style={CardGridStyle}>
          <span className="test">test</span>
        </Card.Grid>
        <Card.Grid style={CardGridStyle}>grid Card</Card.Grid>
        <Card.Grid style={CardGridStyle}>grid Card</Card.Grid>
      </Card>
    </div>
  );
};

export default SettingMessenger;
