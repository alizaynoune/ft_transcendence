import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HeroSection from "@/components/heroSection/HeroSection";
import OurTeam from "@/containers/ourTeam/OurTeam";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { AuthTunk } from "@/store/actions/auth";
import { saveToken } from "@/store/reducers/auth";

const Home: NextPage = () => {
  // const { data: session } = useSession();
  const route = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { access_token } = route.query;
    if (access_token) {
      try {
        dispatch(saveToken(route.query.access_token));
      dispatch(AuthTunk())
      route.push('/')
      } catch (error) {
        console.log(error);
        
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
