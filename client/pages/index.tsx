import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HeroSection from "@/components/heroSection/HeroSection";
import OurTeam from "@/containers/ourTeam/OurTeam";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {  useAppDispatch } from "@/hooks/reduxHooks";
import { AuthTunk } from "@/store/actions/auth";
import { saveToken } from "@/tools/localStorage";

const Home: NextPage = () => {
  // const { data: session } = useSession();
  const route = useRouter();
  const dispatch = useAppDispatch()

  const login = async() => {
    try {
      console.log('done');
      await saveToken(route.query);
      await dispatch(AuthTunk())
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // console.log(route.query, '<<<<<<<<<<<<<<<<<<<');
    const { access_token } = route.query;
    if (access_token) login()
  }, [route]);
  return (
    <>
      <HeroSection />
      <OurTeam />
    </>
  );
};

export default Home

