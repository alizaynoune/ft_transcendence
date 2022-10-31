import style from "./statistics.module.css";
import Image from "next/image";
import axios from "@/config/axios";
import {
  Progress,
  Avatar,
  Badge,
  Typography,
  Upload,
  Button,
  Space,
  Tooltip,
  message,
  UploadProps,
  UploadFile,
} from "antd";
import Icon, { EditOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth, updateInfo } from "@/store/reducers/auth";
import { ComponentType, SVGProps, useRef, useContext, useState, useEffect } from "react";
import { ProfileType, RelationshipType, UserType, FriendActions, ProfileContextType } from "@/types/types";
import { ProfileContext } from "context/profileContext";
import ModalInviteGame from "@/components/modalInviteGame/ModalInviteGame";
// Achievements Icons
import {
  MessageIcon,
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
import { UploadChangeParam, RcFile } from "antd/lib/upload";

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
  refresh: () => Promise<unknown>;
}
const { Text, Title } = Typography;

const actionsList: { [key: string]: { icon: JSX.Element; tooltip: string; action: string }[] } = {
  friend: [
    { icon: <Icon component={MessageIcon} />, tooltip: "Send message", action: "message" },
    { icon: <Icon component={DeleteUserIcon} />, tooltip: "unfriend", action: "friends/unfriend" },
    { icon: <Icon component={BlockUserIcon} />, tooltip: "Block", action: "friends/blockfriend" },
  ],
  inviteSender: [
    { icon: <CloseOutlined />, tooltip: "Reject friend request", action: "friends/rejectrequest" },
    { icon: <CheckOutlined />, tooltip: "Accept friend request", action: "friends/acceptrequest" },
    { icon: <Icon component={BlockUserIcon} />, tooltip: "Block", action: "friends/blockfriend" },
  ],
  inviteReceiver: [{ icon: <Icon component={BlockUserIcon} />, tooltip: "Block", action: "friends/blockfriend" }],
  other: [
    { icon: <Icon component={AddFriendIcon} />, tooltip: "Send friend request", action: "friends/sendrequest" },
    { icon: <Icon component={BlockUserIcon} />, tooltip: "Block", action: "friends/blockfriend" },
  ],
};

const Statistics: React.FC<Props> = ({ data, refresh }) => {
  const { lastMatches, isMyProfile, loadProfile } = useContext(ProfileContext) as ProfileContextType;
  const [matches, setMatches] = useState({ total: 0, winner: 0 });
  const level = 0.3 * Math.sqrt(data.xp) || 0;
  const { intra_id } = useAppSelector(selectAuth);
  const progress = ((level - Math.floor(level)) / 1) * 100;
  const WinRatio = Number(((matches.winner / matches.total) * 100).toFixed(2)) || 0;
  const lazyRoot = useRef(null);
  const [avatar, setAvatar] = useState<string>(data.img_url);
  const dispatch = useAppDispatch();

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
        const res = await axios.post(action, { id: user.intra_id.toString() });
        return resolve(res.data);
      } catch (error) {
        return reject(error);
      }
    });
  };

  const handleChange: UploadProps["onChange"] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") return;
    try {
      const res = (await axios.put("/users/update", { avatar: info.file.originFileObj })) as { data: UserType };
      dispatch(updateInfo(res.data));
      setAvatar(res.data.img_url);
      message.success("success update");
      loadProfile("")
      // refresh()
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  useEffect(() => {
    setMatches({
      total: lastMatches.length,
      winner: lastMatches.filter((m) => m.players[0].score > m.players[1].score).length,
    });
  }, [lastMatches]);

  return (
    <div className={style.container}>
      <div className={style.progressContainer} ref={lazyRoot}>
        <Image
          className={style.progressImage}
          lazyRoot={lazyRoot}
          src={avatar || "/images/defaultProfileAvatar.jpg"}
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
        {isMyProfile && (
          <Upload accept="image/*" showUploadList={false} onChange={handleChange}>
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
        {isMyProfile ? (
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
              text={<Text type="success" italic>{`Wins ${matches.winner}`}</Text>}
            />
            <Badge
              className={style.badge}
              status="error"
              text={
                <Text type="danger" italic>
                  {`Loses ${matches.total - matches.winner}`}
                </Text>
              }
              size="default"
            />
          </>
        ) : (
          <Space direction="vertical">
            <Space>
              <ModalInviteGame user={data} />
              {actionsList[actionIndex].map((i, key) => (
                <Tooltip key={key} title={i.tooltip}>
                  <Button
                    type="primary"
                    size="large"
                    icon={i.icon}
                    onClick={async () => {
                      try {
                        const res = await actions(data, i.action);
                        message.success(res.message);
                        refresh();
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
