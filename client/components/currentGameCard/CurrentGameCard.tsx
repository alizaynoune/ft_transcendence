import { Avatar, Space, Typography, Divider } from "antd";
import style from "./currentGameCard.module.css";
import { GameType } from "@/types/types";
import Link from "next/link";

const { Text, Title } = Typography;
const CurrentGameCard: React.FC<GameType> = (props) => {
  const { id, players } = props;
  return (
    <Link href={`/game/${id}`}>
      <a>
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
      </a>
    </Link>
  );
};

export default CurrentGameCard;
