import style from "./achievementCard.module.css";
import { Card, Space, Typography } from "antd";
import Icon, { LockOutlined } from "@ant-design/icons";
import { WinnerIcon, FriendlyIcon, PhotogenicIcon, WildfireIcon, LegendaryIcon, SharpshooterIcon } from "@/icons/index";
import { ComponentType, SVGProps } from "react";

interface PropsType {
  name: "winner" | "friendly" | "photogenic" | "wildfire" | "legendary" | "sharpshooter";
  type: {
    level: string;
    xp: number;
    description: string;
    wind: boolean;
  };
}

const AchievementsIcon: { [key: string]: ComponentType<SVGProps<SVGSVGElement>> } = {
  winner: WinnerIcon,
  friendly: FriendlyIcon,
  photogenic: PhotogenicIcon,
  wildfire: WildfireIcon,
  legendary: LegendaryIcon,
  sharpshooter: SharpshooterIcon,
};

const AchievementsCard: React.FC<PropsType> = ({ name, type }) => {
  return (
    <div className={style.container}>
      {!type.wind && <LockOutlined className={style.locked} />}
      <Space className={`${style.iconContainer} ${style[type.level.toLocaleLowerCase()]}`}>
        <Icon component={AchievementsIcon[name]} className={`${style.icon} ${style[type.level.toLocaleLowerCase()]}`} />
      </Space>
      <Space className={style.body} direction="vertical">
        <Space className={style.header}>
          <Typography.Text strong>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography.Text>
          <Typography.Text strong type="secondary">
            {`${type.xp}XP`}
          </Typography.Text>
          <Typography.Text strong type="secondary">
            {type.level}
          </Typography.Text>
        </Space>
        <Typography.Paragraph>{type.description}</Typography.Paragraph>
      </Space>
    </div>
  );
};

export default AchievementsCard;
