import type {NextPage} from 'next'
import NewGameContainer  from '@/containers/newGame/NewGame'
import authRoute from '@/tools/protectedRoutes'

const NewGame: React.FC = () => {

    return (
        <NewGameContainer />
    )
}


export default authRoute(NewGame)