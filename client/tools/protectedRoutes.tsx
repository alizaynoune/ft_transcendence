import type { AppProps } from 'next/app'
import {useAppSelector} from '@/hooks/reduxHooks'
import { selectAuht } from '@/store/reducers/auth'
import React, { ReactNode } from 'react'

const AuthRoute = (Component: React.FC) => {
    // const {isAuth} = useAppSelector(selectAuht)
    // console.log(isAuth);
    console.log('doneeee');
    
    
    return <Component />
}

export default AuthRoute