import style from "./boxMessenger.module.css";
import CardSender from "@/components/boxMessengerCardSender/BoxMessengerCardSender";
import CardReceiver from "@/components/boxMessengerCardReceiver/BoxMessengerCardReceiver";
import { Input, Button, List } from "antd";
import Icon from "@ant-design/icons";


// To Add functionnality to scroll to the end of the list of messages

//Icons
import EmojiSmile from "@/icons/EmojiSmile.svg";
import Send from "@/icons/Send.svg";

const BoxMessenger: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <CardSender
          data={{
            message: {
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum vel eu sed eget aliquam tellus. Egestas adipiscing duis donec amet lorem viverra. Aliquam nunc felis ultricies mauris. Quis vitae ac faucibus pretium vitae.",
              time: "3 min ago",
              status: "read",
            },
            user: {
              username: "artam",
              avatar: "hrth",
            },
          }}
        />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardReceiver />
        <CardSender
          data={{
            message: {
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum vel eu sed eget aliquam tellus. Egestas adipiscing duis donec amet lorem viverra. Aliquam nunc felis ultricies mauris. Quis vitae ac faucibus pretium vitae.",
              time: "3 min ago",
              status: "send",
            },
            user: {
              username: "artam",
              avatar: "hrth",
            },
          }}
        />

      </div>        
      <Input
          className={style.Input}
          prefix={
            <Icon
              component={EmojiSmile}
              style={{ fontSize: "120%", color: "var(--primary-color)" }}
            />
          }
          suffix={
            <Icon
              component={Send}
              style={{ fontSize: "120%", color: "var(--primary-color)" }}
            />
          }
          placeholder="Message"
        />
    </div>
  );
};

export default BoxMessenger;
