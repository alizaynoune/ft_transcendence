import { NextComponentType } from "next";
import TeamCard from "@/components/ourTeamCard/OurTeamCard";

import style from "./ourTeam.module.css";

const OurTeam: React.FC = () => {
  return (
    <div className={style.container}>
      <TeamCard
        name="Amal Rtam"
        job="WebDev"
        image="/images/team.png"
        linkedin="https://linkedin.com"
        email="https://www.gmail.com"
        github="https://www.github.com"
      />
      <TeamCard
        name="Ali Zaynoune"
        job="WebDev"
        image="/images/ali.png"
        linkedin="https://linkedin.com"
        email="https://www.gmail.com"
        github="https://www.github.com"
      />
      <TeamCard
        name="Achraf Kamel"
        job="WebDev"
        image="/images/team.png"
        linkedin="https://linkedin.com"
        email="https://www.gmail.com"
        github="https://www.github.com"
      />
      <TeamCard
        name="Ilyass Moumni"
        job="WebDev"
        image="/images/team.png"
        linkedin="https://linkedin.com"
        email="https://www.gmail.com"
        github="https://www.github.com"
      />
      <TeamCard
        name="Anouar Essaid"
        job="WebDev"
        image="/images/team.png"
        linkedin="https://linkedin.com"
        email="https://www.gmail.com"
        github="https://www.github.com"
      />
    </div>
  );
};

export default OurTeam;
