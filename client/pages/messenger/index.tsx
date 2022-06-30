import style from 'styles//messenger.module.css'

// containers
import Conversations from '@/containers/conversations/Conversations'
import BoxMessenger from '@/containers/boxMessenger/BoxMessenger'
import SettingMessenger from '@/containers/settingMessenger/SettingMessenger'

const Messanger: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.conversations}>
        <Conversations />
      </div>
      <div className={style.boxMessenger}>
        <BoxMessenger />
      </div>
      <div className={style.settingMessenger}>
        <SettingMessenger />
      </div>
    </div>
    
  )
}

export default Messanger
