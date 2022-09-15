import React from "react";
import style from "./messageText.module.css";
import { Avatar, Typography } from "antd";
import moment from "moment";
import { MessageTextType } from "@/types/types";
import {
  CheckOutlined,
  ExclamationOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

type PropsType = {
  message: MessageTextType;
  number: number; // ! for test change it to if(sender.id === auth.id)
};

const messageStatus = (status: string) => {
  switch (status) {
    case "send":
      return (
        <CheckOutlined className={`${style.status} ${style.statusSend}`} />
      );
    case "read":
      return (
        <span className={`${style.status} ${style.statusRead}`}>
          <CheckOutlined />
          <CheckOutlined />
        </span>
      );
    case "delivered":
      return (
        <span className={`${style.status} ${style.statusDelivered}`}>
        <CheckOutlined />
        <CheckOutlined />
      </span>
      );
    case "failer":
      return <ExclamationOutlined className={`${style.status} ${style.statusFailer}`} />;
    default:
      return (
        <ClockCircleOutlined
          className={`${style.status} ${style.statusWaiting}`}
        />
      );
  }
};

const MessageText: React.FC<PropsType> = ({ message, number }) => {
  // console.log(message, number);

  return (
    <div className={style.container}>
      <div className={number === 1 ? style.right : style.left}>
        <div className={style.messageContainer}>
          <Avatar src={message.sender.avatar} />
          <div className={style.messageText}>
            <Typography.Text style={{ fontSize: 16 }}>
              {message.content}
            </Typography.Text>
            <Typography.Paragraph style={{ margin: 0 }} type="secondary">
              {moment(message.date).fromNow()}
            </Typography.Paragraph>
            {number ? messageStatus(message.status) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageText;
