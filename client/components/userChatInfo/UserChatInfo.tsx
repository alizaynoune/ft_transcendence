import style from "./UserChatInfo.module.css";
import { Card, Avatar } from "antd";
import React from "react";

const UserChatInfo: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.userAvatar}>
        {/* <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          src="/images/defaultProfileAvatar.jpg"
        /> */}
      </div>
      <div className={style.box}>
        <div className={style.boxUserInfo}>username email</div>
        <div className={style.boxUserOptions}>List Of Options</div>
      </div>
    </div>
  );
};

export default UserChatInfo;
