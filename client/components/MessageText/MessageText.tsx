import React from 'react'
import style from './messageText.module.css'


import { MessageTextType } from '@/types/types'

const MessageText :React.FC<MessageTextType> = (props) => {


    return(
        <div className={style.container}>
            message Text
        </div>
    )
}

export default MessageText