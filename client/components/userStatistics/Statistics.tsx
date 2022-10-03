import style from "./statistics.module.css";
import Image from "next/image";
import { Progress, Avatar, Badge, Typography, Upload, Button } from "antd";
import Icon, { EditOutlined } from "@ant-design/icons";

// Achievements Icons
import {
    FriendlyIcon as friendly,
    LegendaryIcon as legendary,
    PhotogenicIcon as photogenic,
    SharpshooterIcon as sharpshooter,
    WildfireIcon as wildfire,
    WinnerIcon as winner,
} from "@/icons/index";
import { useRef } from "react";

const achievementsIcons: { [key: string]: any } = {
    friendly,
    legendary,
    photogenic,
    sharpshooter,
    wildfire,
    winner,
};

interface Props {
    avatar: string;
    level: number;
    achievements: {
        name: string;
        types: string[];
    }[];
    matches: {
        total: number;
        winne: number;
    };
}

const { Text } = Typography;
const Statistics: React.FC<Props> = (props) => {
    const { avatar, achievements, matches, level } = props;
    const progress = ((level - Math.floor(level)) / 1) * 100;
    const WinRatio = parseInt(
        ((matches.winne / matches.total) * 100).toFixed(2)
    );
    const lazyRoot = useRef(null);

    const mapAchievements = () => {
        return achievements.map((a, index) => {
            return a.types.map((t) => {
                return (
                    <Avatar
                        key={index}
                        icon={<Icon component={achievementsIcons[a.name]} />}
                        size={80}
                        className={`${style[t]} ${style.avatar}`}
                    />
                );
            });
        });
    };

    return (
        <div className={style.container}>
            <div className={style.progressContainer} ref={lazyRoot}>
                <Image
                    className={style.progressImage}
                    lazyRoot={lazyRoot}
                    loader={() => avatar}
                    src="/images/ali.png"
                    objectFit="cover"
                    layout="fill"
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
                <Upload>
                    <Button
                        icon={<EditOutlined size={1} />}
                        shape="circle"
                        size="large"
                        style={{
                            position: "absolute",
                            bottom: '20%',
                            right: '20%',
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            color: 'var(--light-color)',
                        }}
                    />
                </Upload>
            </div>
            {achievements.length > 0 && (
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
                <Progress
                    type="dashboard"
                    percent={WinRatio}
                    gapDegree={180}
                    status="normal"
                    width={200}
                    trailColor="var(--error-color)"
                    format={() => (
                        <Text type="secondary">{`Win Ratio ${WinRatio}%`}</Text>
                    )}
                    style={{
                        height: "120px",
                    }}
                />
                <Badge
                    className={style.badge}
                    status="default"
                    color={"var(--primary-color)"}
                    text={
                        <Text type="secondary">{`Wins ${matches.winne}`}</Text>
                    }
                />
                <Badge
                    className={style.badge}
                    status="error"
                    text={
                        <Text type="secondary">
                            {`Loses ${matches.total - matches.winne}`}
                        </Text>
                    }
                    size="default"
                />
            </div>
        </div>
    );
};

export default Statistics;
