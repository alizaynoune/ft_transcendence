import { NextComponentType } from "next";
import style from "./login.module.css";
import { Button, Input, Form, Checkbox } from "antd";
import Link from "next/link";

const Login: NextComponentType = () => {
  const onFinish = () => {};

  const onFinishFailed = () => {};

  return (
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
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input size="large"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Button type="link">
          <Link href="/auth/forgotpassword">forgot password?</Link>
        </Button>
      </div>
      <div className={style.rightSide}>
        <Button ghost>
          <Link href="/auth/register">Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
