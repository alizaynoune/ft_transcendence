import style from "./boxMessengerCardReceiver.module.css";
import { Card, Avatar, Image } from "antd";

const { Meta } = Card;

interface Props {}

const CardReceiver: React.FC<Props> = (props) => {

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

  return (
    <div className={style.container}>
      <div className={style.box}>
        <Card size="small" className={style.box_message} >
         
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum vel
            eu sed eget aliquam tellus. Egestas adipiscing duis donec amet lorem
            viverra. Aliquam nunc felis ultricies mauris. Quis vitae ac faucibus
            pretium vitae.
      
        </Card>
        <div className={style.box_message_avatar}>
          <Avatar
            src="/images/defaultProfileAvatar.jpg"
          />
        </div>
        <div className={style.box_message_time}>
          <p>3 min ago</p>
        </div>
      </div>
    </div>
  );
};

export default CardReceiver;