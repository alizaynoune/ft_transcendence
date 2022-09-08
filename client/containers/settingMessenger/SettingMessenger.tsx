import style from "./settingMessenger.module.css";
import { Card } from "antd";

import { ConversationsType } from "@/types/types";

type PropsType = {
  conversation: ConversationsType;
};

const SettingMessenger: React.FC<PropsType> = (props) => {
  console.log(props.conversation);

  return (
    <div className={style.container}>
      <Card
        title="Default size card"
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default SettingMessenger;
