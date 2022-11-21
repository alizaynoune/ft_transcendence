import style from "./ourTeamCard.module.css";
import Image from "next/image";
import { Card, Button, Typography } from "antd";
import Icon, { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { EmailIcon } from "@/icons/index";

const { Text } = Typography;

interface Props {
  name: string;
  job: string;
  linkedin: string;
  email: string;
  github: string;
  image: string;
}

const OurTeamCard: React.FC<Props> = (props) => {
  const { name, job, linkedin, email, github, image } = props;
  return (
    <div className={style.container}>
      <Card
        className={style.cardInfo}
        title={
          <Text italic strong>
            {name}
          </Text>
        }
        extra={
          <Text type="secondary" italic strong>
            {job}
          </Text>
        }
        bodyStyle={{
          display: "none",
        }}
        headStyle={{
          padding: "150px 10px 0 10px",
        }}
        actions={[
          <Button type="primary" shape="circle" icon={<LinkedinOutlined />} size="large" href={linkedin} target="_blank" />,
          <Button type="primary" shape="circle" icon={<Icon component={EmailIcon} />} size="large" href={`mailto: ${email}`} />,
          <Button type="primary" shape="circle" icon={<GithubOutlined />} size="large" href={github} target="_blank" />,
        ]}
      />
      <div className={style.cardImage}>
        <Image src={image} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default OurTeamCard;
