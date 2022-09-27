import style from './style.module.css'

import CurrentGame from '@/containers/currentGame/CurrentGame'
import authRoute from '@/tools/protectedRoutes'

const Games : React.FC= () => {
    return(
        <div>
            <CurrentGame />
        </div>
    )
}

export default authRoute(Games)