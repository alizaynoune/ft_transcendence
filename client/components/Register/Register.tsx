import { NextComponentType } from "next";
import Image from "next/image";
import style from "./register.module.css";
import { Button } from "antd";
import Link from "next/link";

const Register: NextComponentType = () => {
  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <Button
          //   href="/auth/register"
          ghost
          //   type=""
        >
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
      <div className={style.rightSide}>
        <h1>Register</h1>
      </div>
    </div>
  );
};

export default Register;
