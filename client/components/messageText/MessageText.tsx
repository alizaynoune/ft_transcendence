import React, { useEffect } from "react";
import style from "./messageText.module.css";
import { Avatar, Typography } from "antd";
import moment from "moment";
import { MessageTextType, UserType } from "@/types/types";

type PropsType = {
  message: MessageTextType;
  IamSender: boolean;
};

const MessageText: React.FC<PropsType> = ({ message, IamSender }) => {
  return (
    <div className={style.container}>
      <div className={IamSender ? style.right : style.left}>
        <div className={style.messageContainer}>
          {!IamSender && <Avatar src={message.users.img_url} />}
          <div className={style.messageText}>
            <Typography.Text style={{ fontSize: 16 }}>{message.message}</Typography.Text>
            <Typography.Paragraph style={{ margin: 0 }} type="secondary">
              {moment(message.created_at).fromNow()}
            </Typography.Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageText;
