import style from "./settingMessenger.module.css";
import { Card } from "antd";

import { ConversationsType } from "@/types/types";

type PropsType = {
  conversation: ConversationsType;
};

const SettingMessenger: React.FC<PropsType> = ({conversation}) => {
//   console.log(props.conversation);

  return (
    <div className={style.container}>
      <Card
        title={conversation.type === 'group' ? conversation.name : conversation.members[1].name.username}
        extra={<a href="#">More</a>}
        className={style.card}
        // style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default SettingMessenger;
