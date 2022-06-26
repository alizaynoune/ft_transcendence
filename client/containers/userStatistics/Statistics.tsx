import style from "./statistics.module.css";
import { NextComponentType } from "next";
import Image from "next/image";
import { Progress, Avatar, Tooltip } from "antd";
import { useSession } from "next-auth/react";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";

const level = 12.70;

const Statistics: React.FC = () => {
  const { data: session } = useSession();
  const progress = (((level - Math.floor(level))) / 1) * 100;
  // console.log(progress);

  return (
    <div className={style.container}>
      <div className={style.progressContainer}>
        <Image
          className={style.progressImage}
          src="/images/defaultProfileAvatar.jpg"
          objectFit="cover"
          layout="fill"
        />
        <Progress
          className={style.progress}
          type="dashboard"
          gapDegree={1}
          percent={progress}
          status='normal'
          width={200}
          format={() => level}
          trailColor='rgba(0, 0, 0, 0.2)'
        />
      </div>
      <div className={style.achievements}>
        <Avatar.Group
          maxCount={3}
          size={45}
          maxPopoverTrigger="click"
          maxPopoverPlacement="bottomRight"
          // size="large"
          maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
        >
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
        </Avatar.Group>
      </div>
    </div>
  );
};

export default Statistics;
