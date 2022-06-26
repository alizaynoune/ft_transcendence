import style from "./statistics.module.css";
import { NextComponentType } from "next";
import Image from "next/image";
import { Progress, Avatar } from "antd";
import { useSession } from "next-auth/react";

const Statistics: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className={style.container}>
      <div className={style.progressContainer}>
        <Image
          className={style.progressImage}
          src="/images/defaultProfileAvatar.jpg"
          objectFit="cover"
          layout="fill"
        //   width={200}
        //   height={200}
        />
        <Progress className={style.progress} type="circle" percent={75} width={200} />
      </div>
    </div>
  );
};

export default Statistics;
