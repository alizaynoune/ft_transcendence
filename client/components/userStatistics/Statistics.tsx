import style from "./statistics.module.css";
import Image from "next/image";
import { Progress, Avatar, Badge, Typography, Upload, Button, Space } from "antd";
import Icon, { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { useEffect, useRef } from "react";
import { ProfileType, RelationshipType, UserType } from "@/types/types";
// Achievements Icons
import {
  FriendlyIcon as friendly,
  LegendaryIcon as legendary,
  PhotogenicIcon as photogenic,
  SharpshooterIcon as sharpshooter,
  WildfireIcon as wildfire,
  WinnerIcon as winner,
  MessageIcon,
  PlayGameIcon,
  DeleteUserIcon,
  BlockUserIcon,
  UserIcon,
  EmailIcon,
} from "@/icons/index";

const achievementsIcons: { [key: string]: any } = {
  friendly,
  legendary,
  photogenic,
  sharpshooter,
  wildfire,
  winner,
};
interface Props {
  data: ProfileType & UserType & RelationshipType;
}
const { Text, Title } = Typography;

const Statistics: React.FC<Props> = ({ data }) => {
  const level = 12.25;
  const matches = { total: 10, winne: 9 };
  const { img_url, users_achievements } = data;
  const { intra_id } = useAppSelector(selectAuth);
  const progress = ((level - Math.floor(level)) / 1) * 100;
  const WinRatio = parseInt(((matches.winne / matches.total) * 100).toFixed(2));
  const lazyRoot = useRef(null);

  const mapAchievements = () => {
    return users_achievements.map((a, index) => {
      console.log(a);

      return (
        <Avatar
          key={index}
          icon={<Icon component={achievementsIcons[a.achievements.name]} />}
          size={80}
          className={`${style[a.achievements.level.toLowerCase()]} ${style.avatar}`}
        />
      );
    });
  };

  return (
    <div className={style.container}>
      <div className={style.progressContainer} ref={lazyRoot}>
        <Image
          className={style.progressImage}
          lazyRoot={lazyRoot}
          loader={() => img_url || "/images/defaultProfileAvatar.jpg"}
          src="/images/defaultProfileAvatar.jpg"
          objectFit="cover"
          layout="fill"
          priority
        />
        <Progress
          className={style.progress}
          type="dashboard"
          gapDegree={1}
          percent={progress}
          status="normal"
          width={200}
          format={() => level.toFixed(2)}
          trailColor="rgba(0, 0, 0, 0.2)"
        />
        {intra_id === data.intra_id && (
          <Upload>
            <Button
              icon={<EditOutlined size={1} />}
              shape="circle"
              size="large"
              style={{
                position: "absolute",
                bottom: "20%",
                right: "20%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                color: "var(--light-color)",
              }}
            />
          </Upload>
        )}
      </div>
      {users_achievements.length > 0 && (
        <div className={style.achievements}>
          <Avatar.Group
            className={style.avatarGroup}
            maxCount={4}
            size={80}
            maxPopoverTrigger="click"
            maxPopoverPlacement="bottom"
            maxStyle={{
              color: "#FFFFFF",
              border: "2px solid #FFFFFF",
              backgroundColor: "#3699FF",
              cursor: "pointer",
              marginLeft: "-40px",
            }}
          >
            {mapAchievements()}
          </Avatar.Group>
        </div>
      )}
      <div className={style.gameRatioContainer}>
        {intra_id === data.intra_id ? (
          <>
            <Progress
              success={{
                percent: WinRatio,
                strokeColor: "var(--success-color)",
              }}
              type="dashboard"
              gapDegree={180}
              status="normal"
              width={200}
              trailColor="var(--error-color)"
              format={() => <Title level={4} type="secondary" italic>{`Win Ratio ${WinRatio}%`}</Title>}
              style={{
                height: "120px",
              }}
            />
            <Badge
              className={style.badge}
              status="default"
              color={"var(--success-color)"}
              text={<Text type="success" italic>{`Wins ${matches.winne}`}</Text>}
            />
            <Badge
              className={style.badge}
              status="error"
              text={
                <Text type="danger" italic>
                  {`Loses ${matches.total - matches.winne}`}
                </Text>
              }
              size="default"
            />
          </>
        ) : (
          <Space direction="vertical">
            <Space>
              {data.isFriend && <Button type="primary" size="large" icon={<Icon component={MessageIcon} />} />}
              <Button type="primary" size="large" icon={<Icon component={PlayGameIcon} />} />
              {data.isFriend && <Button type="primary" size="large" icon={<Icon component={DeleteUserIcon} />} />}
              <Button type="primary" size="large" icon={<Icon component={BlockUserIcon} />} />
            </Space>
            <Text strong italic>
              <Icon component={UserIcon} style={{ fontSize: 17 }} /> {` ${data.username}`}
            </Text>
            <Text strong italic>
              <Icon component={EmailIcon} style={{ fontSize: 17 }} />
              {` ${data.email}`}
            </Text>
          </Space>
        )}
      </div>
    </div>
  );
};

export default Statistics;
