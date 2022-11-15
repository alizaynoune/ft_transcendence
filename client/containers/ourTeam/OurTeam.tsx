import TeamCard from "@/components/ourTeamCard/OurTeamCard";

import style from "./ourTeam.module.css";

const OurTeam: React.FC = () => {
  return (
    <div className={style.container}>
      <TeamCard
        name="BOLLES Yassir"
        job="Full Stack developer"
        image="https://media-exp1.licdn.com/dms/image/C4E03AQF-Gu5zM00nlg/profile-displayphoto-shrink_400_400/0/1654789248820?e=1669852800&v=beta&t=eLprDURgwQvmETZeoL4QSpVPVfNyCVdeFTfye1inu28"
        linkedin="https://www.linkedin.com/in/ysrbolles/"
        email="ysrbolles@gmail.com"
        github="https://www.github.com/ysrbolles"
      />
      <TeamCard
        name="Ali Zaynoune"
        job="Full Stack developer"
        image="/images/ali.png"
        linkedin="https://linkedin.com"
        email="https://www.gmail.com"
        github="https://www.github.com"
      />
      <TeamCard
        name="Nawfal Abouzaher"
        job="Full Stack developer"
        image="/images/team.png"
        linkedin="https://linkedin.com"
        email="https://www.gmail.com"
        github="https://www.github.com"
      />
    </div>
  );
};

export default OurTeam;
