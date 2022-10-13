import { Avatar, Space, Typography, Divider, Badge } from "antd";
import style from "./currentGameCard.module.css";
import { GameType } from "@/types/types";

interface UserType {
  id: string;
  username: string;
  score: number;
  avatar: string;
}
interface PropsType {
  id: string;
  players: UserType[];
}

const { Text, Title, Paragraph } = Typography;
const CurrentGameCard: React.FC<GameType> = (props) => {
  //console.log(props);
  const { id, players } = props;

  return (
    <Space
      className={style.card}
      size={"large"}
      split={
        <Space>
          <Title level={4}>{players[0].score}</Title>
          <Divider type="vertical" className={style.divider} />
          <Title level={4}>{players[1].score}</Title>
        </Space>
      }
    >
      <div className={`${style.player} ${style.left}`}>
        <Avatar src={players[0].users.img_url} size="large" />
        <Text strong type="secondary" ellipsis>
          {players[0].users.username}
        </Text>
      </div>
      <div className={`${style.player} ${style.right}`}>
        <Avatar src={players[1].users.img_url} size="large" />
        <Text strong type="secondary" ellipsis>
          {players[1].users.username}
        </Text>
      </div>
    </Space>
  );
};

export default CurrentGameCard;
