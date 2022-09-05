import style from './conversationCard.module.css'
import {ConversationsType} from '@/types/types'
import { List, Avatar } from 'antd'
const ConversationCard: React.FC<ConversationsType> = (props) => {
    const {id, type, adminID, lastMessage, members} = props

    return (
        <div className={style.container}>
            <List.Item.Meta
              avatar={<Avatar src={members[0].avatar} />}
              title={<a href="#">{members[0].name.username}</a>}
              description={lastMessage.content}
            />
            {/* <div>Content</div> */}
          {/* </List.Item> */}
        </div>
    )
}

export default ConversationCard