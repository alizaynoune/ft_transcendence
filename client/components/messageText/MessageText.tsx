import React from "react";
import style from "./messageText.module.css";
import { Avatar, Typography } from "antd";
import moment from "moment";
import { MessageTextType } from "@/types/types";
import { CheckOutlined } from "@ant-design/icons";

type PropsType = {
  message: MessageTextType;
  number: number; // ! for test change it to if(sender.id === auth.id)
};

const MessageText: React.FC<PropsType> = ({ message, number }) => {
  // console.log(message, number);

  return (
    <div className={style.container}>
      <div className={number === 1 ? style.right : style.left}>
        <div className={style.messageContainer}>
          <Avatar src={message.sender.avatar} />
          <div className={style.messageText}>
            <Typography.Text >{message.content}</Typography.Text>
            <Typography.Paragraph style={{margin: 0}} type="secondary">
              {moment(message.date).fromNow()}
            </Typography.Paragraph>
            {number ? <CheckOutlined /> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageText;
