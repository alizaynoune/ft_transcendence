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

import { AchievementType } from "@/types/types";

interface PropsType {
  name:
    | "Winner"
    | "Friendly"
    | "Photogenic"
    | "Wildfire"
    | "Legendary"
    | "Sharpshooter";
  type: {
    name: string;
    xp: number;
    description: string;
    wind: boolean;
  };
}

const AchievementsIcon = {
  Winner: WinnerIcon,
  Friendly: FriendlyIcon,
  Photogenic: PhotogenicIcon,
  Wildfire: WildfireIcon,
  Legendary: LegendaryIcon,
  Sharpshooter: SharpshooterIcon,
};

const Name = [
  "Winner",
  "Friendly",
  "Photogenic",
  "Wildfire",
  "Legendary",
  "Sharpshooter",
];

const AchievementsCard: React.FC<PropsType> = ({ name, type }) => {
  return (
    <div className={style.container}>
        <Space className={`${style.iconContainer} ${style[type.name]}`}>
          <Icon
            component={AchievementsIcon[name]}
            className={`${style.icon} ${style[type.name]}`}
          />
        </Space>
        <Space className={style.body} direction="vertical">
          <Space className={style.header}>
            <Typography.Text strong>{name}</Typography.Text>
            <Typography.Text strong type="secondary">
              {`${type.xp}XP`}
            </Typography.Text>
            <Typography.Text strong type="secondary">
              {type.name}
            </Typography.Text>
          </Space>
          <Typography.Paragraph>
            {type.description}
          </Typography.Paragraph>
        </Space>
    </div>
  );
};

export default AchievementsCard;
