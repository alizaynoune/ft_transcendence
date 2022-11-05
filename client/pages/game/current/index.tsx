import style from './style.module.css'

import CurrentGame from '@/containers/currentGame/CurrentGame'
import authRoute from '@/tools/protectedRoutes'

const Games : React.FC= () => {
    return(
        <div style={{
            // height: '100%',
            // maxHeight: 'calc(100vh - 170px)',
            // overflow: 'hidden'
        }}>
            <CurrentGame />
        </div>
    )
}

export default authRoute(Games)