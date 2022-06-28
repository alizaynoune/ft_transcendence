import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HeroSection from "@/components/heroSection/HeroSection";
import OurTeam from "@/containers/ourTeam/OurTeam";
import { useSession } from "next-auth/react"


const Home: NextPage = () => {
  const { data: session } = useSession()
  return (
    <div >
      <HeroSection />
      <OurTeam />
    </div>
  )
};

export default Home;