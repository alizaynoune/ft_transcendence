import { NextComponentType } from "next";
import Image from "next/image";
import style from "./forgotPWD.module.css";
import { Button } from "antd";
import Link from "next/link";

const ForgotPassword: NextComponentType = () => {
  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <Button ghost>
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
      <div className={style.rightSide}>
        <h1>Forgot Password</h1>
      </div>
    </div>
  );
};

export default ForgotPassword;
