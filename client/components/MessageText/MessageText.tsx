import React from 'react'
import style from './messageText.module.css'


import { MessageTextType, ConversationsType } from '@/types/types'

const MessageText :React.FC<ConversationsType> = (props) => {

    return(
        <div className={style.container}>
            message Text
        </div>
    )
}

export default MessageText