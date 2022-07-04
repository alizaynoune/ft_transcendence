import style from "./login.module.css";
import { Button, Input, Form, Checkbox, Typography, Divider } from "antd";
import Link from "next/link";
import Icon, { GoogleOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";
import { selectAuth } from "@/reducers/auth";
import { AuhtTunk } from "@/actions/auth";
import { useRouter } from 'next/router';
// hooks
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";

// icons
import EmailIcon from "@/icons/email.svg";
import PasswordIcon from "@/icons/password.svg";
import Icon_42 from "@/icons/42.svg";
import { useEffect } from "react";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuth } = useAppSelector(selectAuth);
  const router = useRouter()
  const onFinish = async () => {
    dispatch(AuhtTunk())
    .then((res) => {
      console.log(res, '<<<<<res');
      
      router.push('/')
    })
    .catch((e) => {
      console.log(e);
    })
  };

  useEffect(() => {
    if (isAuth) router.push('/')
  }, [])

  const onFinishFailed = () => {
    console.log("failed");
  };

  return (
    <div className={style.container}>
      {/* Left Side */}
      <div className={style.leftSide}>
        <Title className={style.title} level={3}>
          Login to Your Account
        </Title>
        {/* Icons */}
        <div className={style.iconContainer}>
          <div className={style.icons}>
            <Button
              shape="circle"
              icon={<GoogleOutlined />}
              onClick={() => onFinish()}
            ></Button>
            <Button
              shape="circle"
              icon={<Icon component={Icon_42} style={{ fontSize: "120%" }} />}
              onClick={() => onFinish()}
            ></Button>
          </div>
          <Text type="secondary">or user your email for login</Text>
        </div>
        {/* Icons End */}
        {/* Form */}
        <Form
          name="login"
          className={style.loginForm}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {/* User name */}
          <Form.Item
            className={style.loginFormItem}
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              size="large"
              prefix={
                <Icon component={EmailIcon} style={{ fontSize: "120%" }} />
              }
              placeholder="Email"
            />
          </Form.Item>
          {/* User name End */}
          {/* Passwrod */}
          <Form.Item
            className={style.loginFormItem}
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={
                <Icon component={PasswordIcon} style={{ fontSize: "120%" }} />
              }
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          {/* Password End */}
          {/* Remmember me */}
          <Form.Item className={style.rememberAndForogt}>
            <Form.Item
              name="remember"
              valuePropName="checked"
              style={{ float: "left" }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {/* Rommember me End */}
            {/* Forgot Password */}
            <Button className={style.forgotPWD} type="link">
              <Link href="/auth/forgotpassword">forgot password?</Link>
            </Button>
          </Form.Item>
          {/* Forgot Password End */}
          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className={style.loginFormButton}
            >
              SIGN IN
            </Button>
          </Form.Item>
          {/* Submit End */}
        </Form>
        {/* Form End */}
        <Divider className={style.divider}>
          <Link href="/auth/register">New Here!</Link>
        </Divider>
      </div>
      {/* Left Side End */}
      {/* Right Side */}
      <div className={style.rightSide}>
        <Text strong style={{ fontSize: "30px", color: "#ffffff" }}>
          New Here!
        </Text>
        <Text style={{ color: "#ffffff" }}>
          sign up and discover a great Game
        </Text>
        <Button style={{ color: "var(--primary-color)" }}>
          <Link href="/auth/register">Register</Link>
        </Button>
      </div>
      {/* Right Side End */}
    </div>
  );
};

export default Login;
