import { NextComponentType } from "next";
import { Typography } from "antd";
import Image from "next/image";
import React from "react";
import heroStyle from "./heroSection.module.css";

const { Text, Paragraph, Title } = Typography;

const HeroSection: React.FC = () => {
  return (
    <div className={heroStyle.container}>
      <div className={heroStyle.heroSection}>
        <Image  src="/images/hero.png" layout="fill" priority objectFit="fill" />
      </div>
      <div className={heroStyle.heroTextContainer}>
        <div className={heroStyle.heroText}>
          <Text >
            {"this web is an project in 1337 named `ft_transcendence` is a onepage\
            fullstack website where you can play pong with players among other\
            things such a group chat, private messages, friends list, profiles,\
            a match-making system, achievements."}
          </Text>
          <Paragraph>
            <ul>
              <li>{"the technologies used in this app"}</li>
              <li>{"-NestJS `TypeScript`"}</li>
              <li>{"-NextJS `TypeScript`"}</li>
              <li>{"-PostgreSQL"}</li>
              <li>{"-Docker"}</li>
            </ul>
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
