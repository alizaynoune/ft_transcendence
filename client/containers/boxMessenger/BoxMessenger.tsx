import style from './boxMessenger.module.css'
import CardSender from "@/components/boxMessengerCardSender/BoxMessengerCardSender"
import CardReceiver from '@/components/boxMessengerCardReceiver/BoxMessengerCardReceiver'

const   BoxMessenger : React.FC = () => {
    return (
        <div className={style.container}>
            <CardSender/>
            <CardReceiver/>
        </div>
    )
}

export default BoxMessenger