import type { AppProps } from 'next/app'
import {useAppSelector} from '@/hooks/reduxHooks'
import { selectAuht } from '@/store/reducers/auth'
import React, { ReactNode } from 'react'

const AuthRoute = ({Component, pageProps}: AppProps) => {

    return <Component {...pageProps} />
}