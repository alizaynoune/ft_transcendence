import TeamCard from "@/components/ourTeamCard/OurTeamCard";

import style from "./ourTeam.module.css";

const OurTeam: React.FC = () => {
    return (
        <div className={style.container}>
            <TeamCard
                name="BOLLES Yassir"
                job="Full Stack developer"
                image="https://media-exp1.licdn.com/dms/image/D4E03AQHn0jMUICSKZA/profile-displayphoto-shrink_800_800/0/1664463474485?e=1674086400&v=beta&t=IodnVms5vA7u7gng1J1_y-bZiAiltr5J4eDJLNQ4aN0"
                linkedin="https://www.linkedin.com/in/ysrbolles/"
                email="ysrbolles@gmail.com"
                github="https://www.github.com/ysrbolles"
            />
            <TeamCard
                name="Ali Zaynoune"
                job="Full Stack developer"
                image="https://media-exp1.licdn.com/dms/image/C4D03AQEoFj8m-nJMbw/profile-displayphoto-shrink_800_800/0/1591471879721?e=1674086400&v=beta&t=O6BUdUY339pS0rExBEJc4AE39rUCzupSzyKTazMcMSI"
                linkedin="https://www.linkedin.com/in/ali-zaynoune-168905161/"
                email="zaynoune.ali@gmail.com"
                github="https://github.com/alizaynoune"
            />
            <TeamCard
                name="Nawfal Abouzaher"
                job="Full Stack developer"
                image="https://media-exp1.licdn.com/dms/image/C4E03AQHdYP6xPBFc5w/profile-displayphoto-shrink_800_800/0/1657044364006?e=1674086400&v=beta&t=14fHGrqG7Utg6zTfq1iJJhYqTi3_OF0I-meNEQK62uU"
                linkedin="https://www.linkedin.com/in/nawfalabouzaher/"
                email="nawfal.abouzaher@gmail.com"
                github="https://github.com/83wid"
            />
        </div>
    );
};

export default OurTeam;
