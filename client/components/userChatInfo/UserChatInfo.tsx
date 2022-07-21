import style from "./userChatInfo.module.css";
import { Card, Avatar, List } from "antd";
import React from "react";


const data = [
  {
    title: 'View profile',
  },
  {
    title: 'Invite to play ',
  },
  {
    title: 'level 42',
  },
  {
    title: 'Delete conversation',
  },
  {
    title: 'Block',
  },
  {
    title: 'Mute',
  },
];

const UserChatInfo: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.userAvatar}>
        <Avatar
          size={90}
          src="/images/defaultProfileAvatar.jpg"
        />
      </div>
      <div className={style.box}>

        <div className={style.boxUserInfo}>
          username email
        </div>
        <div className={style.boxUserOptions}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item style={{'padding' : '2px 0'}}>
                <List.Item.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default UserChatInfo;
