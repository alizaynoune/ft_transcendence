import { NextComponentType } from 'next';
import TeamCard from '../components/ourTeamCard/OurTeamCard'

const OurTeam: NextComponentType = () => {
    return (
        <div>
            <TeamCard
            name="amal"
            job="zwina"
            image="/images/team.png"
            linkedin='linkedin'
            email='email'
            github='github'
            />
        </div>
    )
}

export default OurTeam;