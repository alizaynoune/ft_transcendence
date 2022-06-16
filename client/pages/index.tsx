import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import HeroSection from "../components/HeroSection";


const Home: NextPage = () => {
  return (
    <div style={{
      padding: '10px'
    }}>
      <HeroSection />
    </div>
  )
};

export default Home;
