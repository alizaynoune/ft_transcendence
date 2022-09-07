import React from 'react'
import style from './messageText.module.css'


import { MessageTextType, ConversationsType } from '@/types/types'


type PropsType = {
    currentConversation: ConversationsType | null
  }

const MessageText :React.FC<PropsType> = (props) => {

    return(
        <div className={style.container}>
            message Text
        </div>
    )
}

export default MessageText