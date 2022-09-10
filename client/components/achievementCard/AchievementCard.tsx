import style from "./achievementCard.module.css";
import { Card, Space, Typography } from "antd";
import Icon from "@ant-design/icons";
import {
  WinnerIcon,
  FriendlyIcon,
  PhotogenicIcon,
  WildfireIcon,
  LegendaryIcon,
  SharpshooterIcon,
} from "@/icons/index";

interface PropsType {
  icon: 0 | 1 | 2 | 3 | 4 | 5;
  type: "platinum" | "gold" | "bronze" | "silver";
  haveIt: boolean;
}

const AchievementsIcon = [
  WinnerIcon,
  FriendlyIcon,
  PhotogenicIcon,
  WildfireIcon,
  LegendaryIcon,
  SharpshooterIcon,
];

const Name = [
  "Winner",
  "Friendly",
  "Photogenic",
  "Wildfire",
  "Legendary",
  "Sharpshooter",
];

const AchievementsCard: React.FC<PropsType> = ({ type, icon, haveIt }) => {
  return (
    <Space className={style.container}>
      <Space className={`${style.iconContainer} ${style[type]}`}>
        <Icon
          component={AchievementsIcon[icon]}
          className={`${style.icon} ${style[type]}`}
        />
      </Space>
      <Space className={style.body} direction="vertical">
        <Space className={style.header}>
          <Typography.Text strong>{Name[icon]}</Typography.Text>
          <Typography.Text strong type="secondary">
            {"1500xp"}
          </Typography.Text>
          <Typography.Text strong type="secondary">
            {type}
          </Typography.Text>
        </Space>
        <Typography.Paragraph>
          {"win 3 matches with max a score more text"}
        </Typography.Paragraph>
      </Space>
    </Space>
  );
};

export default AchievementsCard;
