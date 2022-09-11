import { Avatar, Space, Typography, Divider } from "antd";
import style from "./currentGameCard.module.css";

interface UserType {
  id: string;
  username: string;
  score: number;
  avatar: string;
}
interface PropsType {
  id: string;
  users: UserType[];
}

const { Text, Title, Paragraph } = Typography;
const CurrentGameCard: React.FC<PropsType> = (props) => {
  console.log(props);
  const { users, id } = props;

  return (
    <Space
      className={style.card}
      size={"large"}
      split={
        <Space>
          <Title level={4}>{users[0].score}</Title>
          <Divider type="vertical" className={style.divider} />
          <Title level={4}>{users[1].score}</Title>
        </Space>
      }
    >
      <div className={`${style.player} ${style.left}`}>
        <Avatar src={users[0].avatar} size="large" />
        <Text strong type="secondary" ellipsis>
          {users[0].username}
        </Text>
      </div>
      {/* <Space className={style.user} align="end" direction="vertical"> */}
      <div className={`${style.player} ${style.right}`}>
        <Avatar src={users[1].avatar} size="large" />
        <Text strong type="secondary" ellipsis>
          {users[0].username}
        </Text>
      </div>
      {/* </Space> */}
    </Space>
  );
};

export default CurrentGameCard;
