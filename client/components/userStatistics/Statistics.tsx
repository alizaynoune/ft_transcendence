import style from "./statistics.module.css";
import Image from "next/image";
import axios from "@/config/axios";
import { Progress, Avatar, Badge, Typography, Upload, Button, Space, Tooltip, message } from "antd";
import Icon, { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { ComponentType, SVGProps, useCallback, useEffect, useRef, useState } from "react";
import { ProfileType, RelationshipType, UserType, FriendActions } from "@/types/types";
import { useRouter } from "next/router";
// Achievements Icons
import {
  MessageIcon,
  PlayGameIcon,
  DeleteUserIcon,
  BlockUserIcon,
  UserIcon,
  EmailIcon,
  AddFriendIcon,
  FriendlyIcon,
  LegendaryIcon,
  PhotogenicIcon,
  SharpshooterIcon,
  WildfireIcon,
  WinnerIcon,
} from "@/icons/index";

const achievementsIcons: {
  [key: string]: ComponentType<SVGProps<SVGSVGElement>>;
} = {
  friendly: FriendlyIcon,
  legendary: LegendaryIcon,
  photogenic: PhotogenicIcon,
  sharpshooter: SharpshooterIcon,
  wildfire: WildfireIcon,
  winner: WinnerIcon,
};
interface Props {
  data: ProfileType & UserType & RelationshipType;
  refresh: (profile: string) => Promise<void>;
}
const { Text, Title } = Typography;

const actionsList: { [key: string]: { icon: JSX.Element; tooltip: string; action: string }[] } = {
  friend: [
    { icon: <Icon component={MessageIcon} />, tooltip: "Send message", action: "message" },
    { icon: <Icon component={PlayGameIcon} />, tooltip: "Invite to play game", action: "playGame" },
    { icon: <Icon component={DeleteUserIcon} />, tooltip: "unfriend", action: "unfriend" },
    { icon: <Icon component={BlockUserIcon} />, tooltip: "Block", action: "blockfriend" },
  ],
  inviteSender: [
    { icon: <Icon component={PlayGameIcon} />, tooltip: "Invite to play game", action: "playGame" },
    { icon: <CloseOutlined />, tooltip: "Reject friend request", action: "rejectrequest" },
    { icon: <CheckOutlined />, tooltip: "Accept friend request", action: "acceptrequest" },
    { icon: <Icon component={BlockUserIcon} />, tooltip: "Block", action: "blockfriend" },
  ],
  inviteReceiver: [
    { icon: <Icon component={PlayGameIcon} />, tooltip: "Invite to play game", action: "playGame" },
    { icon: <Icon component={BlockUserIcon} />, tooltip: "Block", action: "blockfriend" },
  ],
  other: [
    { icon: <Icon component={PlayGameIcon} />, tooltip: "Invite to play game", action: "playGame" },
    { icon: <Icon component={AddFriendIcon} />, tooltip: "Send friend request", action: "sendrequest" },
    { icon: <Icon component={BlockUserIcon} />, tooltip: "Block", action: "blockfriend" },
  ],
};

const Statistics: React.FC<Props> = ({ data, refresh }) => {
  const level = 12.25;
  const matches = { total: 10, winne: 9 };
  const { intra_id } = useAppSelector(selectAuth);
  const progress = ((level - Math.floor(level)) / 1) * 100;
  const WinRatio = Number(((matches.winne / matches.total) * 100).toFixed(2));
  const lazyRoot = useRef(null);
  const router = useRouter();
  const actionIndex = data.relationship
    ? data.relationship.isFriend
      ? "friend"
      : data.relationship.senderid === intra_id
      ? "inviteReceiver"
      : "inviteSender"
    : "other";

  const actions: FriendActions = (user, action) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`friends/${action}`, { id: user.intra_id.toString() });
        return resolve(res.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  return (
    <div className={style.container}>
      <div className={style.progressContainer} ref={lazyRoot}>
        <Image
          className={style.progressImage}
          lazyRoot={lazyRoot}
          loader={() => data.img_url || "/images/defaultProfileAvatar.jpg"}
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
      {data.users_achievements.length > 0 && (
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
            {data.users_achievements.map((a, key) => {
              return (
                <Avatar
                  key={key}
                  icon={<Icon component={achievementsIcons[a.achievements.name]} />}
                  className={`${style[a.achievements.level.toLowerCase()]} ${style.avatar}`}
                />
              );
            })}
          </Avatar.Group>
        </div>
      )}
      <div className={style.gameRatioContainer}>
        {intra_id === data.intra_id ? (
          <>
            <Progress
              success={{ percent: WinRatio, strokeColor: "var(--success-color)" }}
              type="dashboard"
              gapDegree={180}
              status="normal"
              width={200}
              trailColor="var(--error-color)"
              format={() => <Title level={4} type="secondary" italic>{`Win Ratio ${WinRatio}%`}</Title>}
              style={{ height: "120px" }}
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
              {actionsList[actionIndex].map((i, key) => (
                <Tooltip key={key} title={i.tooltip}>
                  <Button
                    type="primary"
                    size="large"
                    icon={i.icon}
                    onClick={async () => {
                      try {
                        message.success((await actions(data, i.action)).message);
                        refresh(data.username);
                      } catch (error) {
                        error instanceof Error && message.error(error.message);
                      }
                    }}
                  />
                </Tooltip>
              ))}
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
function updateState(arg0: {}): any {
  throw new Error("Function not implemented.");
}
