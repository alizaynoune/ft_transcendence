import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import Image from "next/image";
import heroStyle from './heroSection.module.css'
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const HeroSection = () => {
  return (
    <div className={heroStyle.container}>
      <div className={heroStyle.heroSection}>
        <Image src="/images/hero.png" layout="fill"   />
      </div>
    </div>
  );
};

export default HeroSection;
