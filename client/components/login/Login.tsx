import { NextComponentType } from "next";
import Image from "next/image";
import style from "./login.module.css";
import { Button, Input, Form, Checkbox } from "antd";
import Link from "next/link";

const Login: NextComponentType = () => {
  const onFinish = () => {};

  const onFinishFailed = () => {};

  return (
    <div className={style.bady}>
      <div className={style.logo}>
        <Image src="/images/Logo.png" height={68} width={110} />
      </div>
      <div className={style.container}>
        <div className={style.leftSide}>
          <h1>Login Your Accont</h1>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
              <Button type="link">
                <Link href="/auth/forgotpassword">forgot password</Link>
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
             
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={style.rightSide}>
          <Button ghost>
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
