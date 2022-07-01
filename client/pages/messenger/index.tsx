import style from './messenger.module.css'

// containers
import HistoryMessenger from '@/containers/historyMessenger/HistroyMessenger'
import BoxMessenger from '@/containers/boxMessenger/BoxMessenger'
import SettingMessenger from '@/containers/settingMessenger/SettingMessenger'

const Messanger: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.historyMessenger}>
        <HistoryMessenger />
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
