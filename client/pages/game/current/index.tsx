import style from './style.module.css'

import CurrentGame from '@/containers/currentGame/CurrentGame'

const Games : React.FC= () => {
    return(
        <div>
            <CurrentGame />
        </div>
    )
}

export default Games