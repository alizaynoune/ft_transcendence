import style from "./authLayout.module.css";
import { NextPage } from "next";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

const AuthLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className={style.container}>
      <Link href="/">
        <div className={style.logo}>
          <Image src="/images/Logo.png" height={68} width={110} />
        </div>
      </Link>
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
