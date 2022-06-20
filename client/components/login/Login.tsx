import { NextComponentType } from "next";
import Image from "next/image";
import style from "./login.module.css";
import { Button } from "antd";
import Link from "next/link";

const Login: NextComponentType = () => {
  return (
    <div className={style.bady}>
      <div className={style.logo}>
        <Image src="/images/Logo.png" height={68} width={110} />
      </div>
      <div className={style.container}>
          <div className={style.leftSide}>
              <h1>Login Your Accont</h1>
              <Button  ghost>
                  <Link href="/auth/forgotpassword">
                      forgot password
                  </Link>
                  </Button>
          </div>
          <div className={style.rightSide}>
              <Button
              ghost
            //   type=""
              >
                  <Link href='/auth/register'>Register</Link>
              </Button>
          </div>
      </div>
    </div>
  );
};

export default Login;
