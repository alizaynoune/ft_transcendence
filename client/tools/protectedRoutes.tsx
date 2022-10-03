import type { AppProps } from "next/app";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";
import React, { ReactNode, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import Router, { useRouter } from "next/router";

const authRoute = (Component: React.FC<any>) => {
  // console.log('doneeee');

  return (props: any) => {
    const { isAuth } = useAppSelector(selectAuth);
    const data = useAppSelector(selectAuth)
    const router = useRouter();
    //console.log(isAuth);

    useEffect(() => {
      console.log(data);
      
      // if (!isAuth) router.push("/");
    }, []);
    if (isAuth) return <Component {...props} />;
    else return null;
  };
};

export default authRoute;
