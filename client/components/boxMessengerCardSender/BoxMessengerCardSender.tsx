import style from "./boxMessengerCardSender.module.css";
import { Card, Avatar, Image } from "antd";

const { Meta } = Card;

interface Props {}

const CardSender: React.FC<Props> = (props) => {
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
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{ width: 32 }}
              />
            }
          />
        </div>
        <div className={style.box_message_time}>
          <p>3 min ago</p>
        </div>
      </div>
    </div>
  );
};

export default CardSender;
