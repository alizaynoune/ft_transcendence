import style from './messenger.module.css'

// containers
import Conversations from '@/containers/Conversations/Conversations'
import BoxMessenger from '@/containers/boxMessenger/BoxMessenger'
import SettingMessenger from '@/containers/settingMessenger/SettingMessenger'
import { SetStateAction, useEffect, useState } from 'react'

import {ConversationsType} from 'types/types'

const Messanger: React.FC = () => {
  const [currentConversation, setCurrentConversation] = useState<ConversationsType | null>(null)

useEffect(() => {
  console.log(currentConversation, 'done');
  
}, [currentConversation])
  return (
    <div className={style.container}>
      <div className={style.historyMessenger}>
        <Conversations setCurrentConversation={function (value: SetStateAction<ConversationsType | null>): void {
          return setCurrentConversation(value)
        } } {...setCurrentConversation} />
      </div>
      <div className={style.boxMessenger}>
        <BoxMessenger currentConversation={currentConversation} />
      </div>
      <div className={style.settingMessenger}>
        <SettingMessenger />
      </div>
    </div>
    
  )
}

export default Messanger
