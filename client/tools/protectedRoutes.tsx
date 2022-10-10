import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { changeLoading } from "@/reducers/globalLoading";

const authRoute: (Component: React.FC) => React.FC | null = (Component) => {
  return (props: any) => {
    const isAuth = useAppSelector(selectAuth).isAuth;
    const router = useRouter();

    useEffect(() => {
      console.log(isAuth);
      if (isAuth === undefined) return;
      if (!isAuth) router.push("/");
    }, [isAuth]);
    if (isAuth) return <Component {...props} />;
    else return null;
  };
};

export default authRoute;
