import style from "./boxMessengerCardSender.module.css";
import { Card, Avatar, Image } from "antd";
import Icon from "@ant-design/icons";

// Icons
import send from "@/icons/sendMessengerIcon.svg";
import read from  "@/icons/readMessengerIcon.svg"

const { Meta } = Card;

interface Props {
  data:{
    message:{
      content : string
      time : string
      status : "pending" | "send" | "receive" | "read" 
    },
    user:{
      username : string
      avatar : string
    }
  }
}

const CardSender: React.FC<Props> = (props) => {
  const {message,user} = props.data
  console.log(message.status)
  

  return (
    <div className={style.container}>
      <div className={style.box}>
        <Card size="small" className={style.box_message}>
         {message.content}
        </Card>
        <div className={style.box_message_avatar}>
          <Avatar
            src="/images/defaultProfileAvatar.jpg"
          />
        </div>
        <div className={style.box_message_time}>
         {message.time} 
          <Icon
          style={(message.status != "read")? {'fontSize' : '140%'} : {'fontSize' : '190%'} }
            className={style.icon}
            component={(message.status != "read")? send : read }
          />
        </div>
      </div>
    </div>
  );
};

export default CardSender;
