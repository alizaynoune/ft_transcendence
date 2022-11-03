import style from "./achievementCard.module.css";
import { Card, Space, Typography } from "antd";
import Icon, { LockOutlined } from "@ant-design/icons";
import { FriendlyIcon, PhotogenicIcon, WildfireIcon, LegendaryIcon, SharpshooterIcon } from "@/icons/index";
import { ComponentType, SVGProps } from "react";
import { AchievementType } from "@/types/types";

interface PropsType {
  achiv: AchievementType
}

const AchievementsIcon: { [key: string]: ComponentType<SVGProps<SVGSVGElement>> } = {
  friendly: FriendlyIcon,
  photogenic: PhotogenicIcon,
  wildfire: WildfireIcon,
  legendary: LegendaryIcon,
  sharpshooter: SharpshooterIcon,
};

const AchievementsCard: React.FC<PropsType> = ({achiv}) => {
  const {name, level, xp, description, wind} = achiv
  return (
    <div className={style.container}>
      {!wind && <LockOutlined className={style.locked} />}
      <Space className={`${style.iconContainer} ${style[level.toLocaleLowerCase()]}`}>
        <Icon component={AchievementsIcon[name]} className={`${style.icon} ${style[level.toLocaleLowerCase()]}`} />
      </Space>
      <Space className={style.body} direction="vertical">
        <Space className={style.header}>
          <Typography.Text strong>{name.charAt(0).toUpperCase() + name.slice(1)}</Typography.Text>
          <Typography.Text strong type="secondary">
            {`${xp}XP`}
          </Typography.Text>
          <Typography.Text strong type="secondary">
            {level}
          </Typography.Text>
        </Space>
        <Typography.Paragraph>{description}</Typography.Paragraph>
      </Space>
    </div>
  );
};

export default AchievementsCard;
