import type { AppProps } from "next/app";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";
import React, { ReactNode, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

const authRoute = (Component: React.FC<any>) => {
  // console.log('doneeee');

  return (props: any) => {
    const { isAuth } = useAppSelector(selectAuth);
    const router = useRouter();

    useEffect(() => {
      if (!isAuth) router.push("/");
    }, []);
    if (isAuth) return <Component {...props} />;
    else return null;
  };
};

export default authRoute;
