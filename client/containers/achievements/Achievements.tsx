import style from './achievements.module.css'
import AchievementsCard from '@/components/achievementCard/AchievementCard'
import { Space } from 'antd'

const Achievements: React.FC = () => {
    return (
        <Space direction="vertical" className={style.container}>
            <AchievementsCard type="platinum" icon={0} haveIt={false}/>
            <AchievementsCard type="gold" icon={0} haveIt={false}/>
            <AchievementsCard type="bronze" icon={0} haveIt={false}/>
            <AchievementsCard type="silver" icon={0} haveIt={false}/>
        </Space>
    )
}

export default Achievements