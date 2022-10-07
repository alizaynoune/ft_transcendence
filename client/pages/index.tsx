import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HeroSection from "@/components/heroSection/HeroSection";
import OurTeam from "@/containers/ourTeam/OurTeam";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { saveToken } from "@/store/reducers/auth";

const Home: React.FC = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { token} = route.query;
    if (token) {
      try {
        dispatch(saveToken(token));
        route.push("/");
      } catch (error) {
        console.log(error, "catch");
      }
    }
  }, [route]);
  return (
    <>
      <HeroSection />
      <OurTeam />
    </>
  );
};

export default Home;
