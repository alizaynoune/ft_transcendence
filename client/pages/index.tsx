import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HeroSection from "../components/heroSection/HeroSection";
import OurTeam from "../containers/OurTeam";


const Home: NextPage = () => {
  return (
    <div style={{
      padding: '10px'
    }}>
      <HeroSection />
      <OurTeam />
    </div>
  )
};

export default Home;
