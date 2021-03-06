import style from "./statistics.module.css";
import { NextComponentType } from "next";
import Image from "next/image";
import { Progress, Avatar, Badge, Typography } from "antd";
import { useSession } from "next-auth/react";
import Icon from "@ant-design/icons";

// Achivements Icons
import friendly from "@/icons/friendly.svg";
import legendary from "@/icons/legendary.svg";
import photogenic from "@/icons/photogenic.svg";
import sharpshooter from "@/icons/sharpshooter.svg";
import wildfire from "@/icons/wildfire.svg";
import winner from "@/icons/winner.svg";

const achivementsStyle: { [key: string]: object } = {
  silver: {
    color: "#C0C0C0",
    border: "2px solid #C0C0C0",
    backgroundColor: "#464E5E",
  },
  bronze: {
    color: "#CD7F32",
    border: "2px solid #CD7F32",
    backgroundColor: "#F3F6F9",
  },
  gold: {
    color: "#FFDF00",
    border: "2px solid #FFDF00",
    backgroundColor: "#F3F6F9",
  },
  platinum: {
    color: "#E5E4E2",
    border: "2px solid #E5E4E2",
    backgroundColor: "#000000",
  },
  maxStyle: {
    color: "#FFFFFF",
    border: "2px solid #FFFFFF",
    backgroundColor: "#3699FF",
    cursor: "pointer",
  },
};

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
  // const { data: session } = useSession();
  
  const { avatar, achievements, matches, level } = props;
  const progress = ((level - Math.floor(level)) / 1) * 100;
  const WinRatio = parseInt(((matches.winne / matches.total) * 100).toFixed(2));

  const mapAchivements = () => {
    return achievements.map((a, index) => {
      return (
        a.types.map(t => {
          return (
            <Avatar
              key={index}
              icon={
                <Icon
                  component={achievementsIcons[a.name]}
                  style={{
                    fontSize: "140%",
                  }}
                />
              }
              size={45}
              style={achivementsStyle[t]}
            />
          )
        })
      );
    });
  };

  return (
    <div className={style.container}>
      <div className={style.progressContainer}>
        <Image
          className={style.progressImage}
          loader={() => avatar}
          src="me.png"
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
      </div>
      <div className={style.achievements}>
        <Avatar.Group
          maxCount={4}
          size={45}
          maxPopoverTrigger="click"
          maxPopoverPlacement="bottom"
          maxStyle={achivementsStyle.maxStyle}
        >
          {mapAchivements()}
        </Avatar.Group>
      </div>
      <div className={style.gameRatioContainer}>
        <Progress
          type="dashboard"
          percent={WinRatio}
          gapDegree={180}
          status="normal"
          width={200}
          trailColor="var(--error-color)"
          format={() => <Text type="secondary">Win Ratio {WinRatio}%</Text>}
          style={{
            height: "120px",
          }}
        />
        <Badge
          className={style.badge}
          status="default"
          color={"var(--primary-color)"}
          text={<Text type="secondary">Wins {matches.winne}</Text>}
        />
        <Badge
          className={style.badge}
          status="error"
          text={<Text type="secondary">Loses {matches.total - matches.winne}</Text>}
          size="default"
        />
      </div>
    </div>
  );
};

export default Statistics;
