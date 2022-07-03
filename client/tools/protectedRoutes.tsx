import type { AppProps } from 'next/app'
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";
import React, { ReactNode, useEffect } from 'react'
import { redirect } from 'next/dist/server/api-utils';
import Router, { useRouter } from 'next/router';

const authRoute = (Component: React.FC<any>) => {
    // console.log('doneeee');
    
    
    return (props : any) => {
        const { isLoading, error, isAuth } = useAppSelector(selectAuth);
        const router = useRouter()
        console.log(isAuth);

        useEffect(() => {
            if (!isAuth)
                router.push('/auth/login')
        }, [])
        return <Component {...props} />
    }
}

export default authRoute