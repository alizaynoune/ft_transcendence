import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HeroSection from "@/components/heroSection/HeroSection";
import OurTeam from "@/containers/ourTeam/OurTeam";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { AuthTunk } from "@/store/actions/auth";
import { saveToken, selectAuth } from "@/store/reducers/auth";

const Home: NextPage = () => {
  // const { data: session } = useSession();
  const route = useRouter();
  const dispatch = useAppDispatch();
  const {isAuth, isLoading, error} = useAppSelector(selectAuth)

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
