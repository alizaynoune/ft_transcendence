import style from './achievements.module.css'
import AchivementsCard from '@/components/achivementCard/AchivementCard'

const Achivements: React.FC = () => {
    return (
        <div>
            <AchivementsCard type="platinum" icon={0} haveIt={false}/>
            <AchivementsCard type="platinum" icon={1} haveIt={false}/>
            <AchivementsCard type="platinum" icon={2} haveIt={false}/>
            <AchivementsCard type="platinum" icon={3} haveIt={false}/>
            <AchivementsCard type="platinum" icon={4} haveIt={false}/>
            <AchivementsCard type="platinum" icon={5} haveIt={false}/>
            <AchivementsCard type="gold" icon={0} haveIt={false}/>
            <AchivementsCard type="gold" icon={1} haveIt={false}/>
            <AchivementsCard type="gold" icon={2} haveIt={false}/>
            <AchivementsCard type="gold" icon={3} haveIt={false}/>
            <AchivementsCard type="gold" icon={4} haveIt={false}/>
            <AchivementsCard type="gold" icon={5} haveIt={false}/>
            <AchivementsCard type="bronze" icon={0} haveIt={false}/>
            <AchivementsCard type="bronze" icon={1} haveIt={false}/>
            <AchivementsCard type="bronze" icon={2} haveIt={false}/>
            <AchivementsCard type="bronze" icon={3} haveIt={false}/>
            <AchivementsCard type="bronze" icon={4} haveIt={false}/>
            <AchivementsCard type="bronze" icon={5} haveIt={false}/>
            <AchivementsCard type="silver" icon={0} haveIt={false}/>
            <AchivementsCard type="silver" icon={1} haveIt={false}/>
            <AchivementsCard type="silver" icon={2} haveIt={false}/>
            <AchivementsCard type="silver" icon={3} haveIt={false}/>
            <AchivementsCard type="silver" icon={4} haveIt={false}/>
            <AchivementsCard type="silver" icon={5} haveIt={false}/>
        </div>
    )
}

export default Achivements