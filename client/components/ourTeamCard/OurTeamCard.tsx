import { NextComponentType } from 'next';
import Image from 'next/image'
import { Card } from 'antd';


import style from './ourTeamCard.module.css'


const OurTeamCard : NextComponentType = () => {
    return (
        <div className={style.container}>
            <Card className={style.cardInfo}
            actions={[
                'git',
                'email',
                'linkedin'
            ]}
            >

            </Card>
        </div>
    )
}

export default OurTeamCard;