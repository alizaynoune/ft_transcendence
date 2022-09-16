import style from "./login.module.css";
import { Button, Input, Form, Checkbox, Typography, Divider } from "antd";
import Link from "next/link";
import Icon, { GoogleOutlined } from "@ant-design/icons";
import { selectAuth } from "@/reducers/auth";
import { AuthTunk } from "@/store/actions/auth";
import { useRouter } from "next/router";
// hooks
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useEffect } from "react";

// icons
import { EmailIcon, PasswordIcon, _42Icon } from "@/icons/index";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuth } = useAppSelector(selectAuth);
  const router = useRouter();
  const onFinish = async () => {
    // dispatch(AuthTunk())
    // .then((res) => {
    //   console.log(res, '<<<<<res');

    //   router.push('/')
    // })
    // .catch((e) => {
    //   console.log(e);
    // })
    try {
      await dispatch(AuthTunk());
//console.log(window.history, "back");

      // router.back()
      // if (window.history.length > 1 && document.referrer.indexOf(window.location.host) !== -1) {
      //   router.back();
      // } else {
      router.push("/");
      // }
    } catch (error) {
//console.log("<<<error>>>>>>>>", error);
    }
  };

  useEffect(() => {
    if (isAuth) router.push("/");
  }, []);

  const onFinishFailed = () => {
//console.log("failed");
  };

  return (
    <div className={style.container}>
      {/* Left Side */}
      <div className={style.leftSide}>
        <Title className={style.title} level={3}>
          {"Login to Your Account"}
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
              icon={<Icon component={_42Icon} style={{ fontSize: "120%" }} />}
              onClick={() => onFinish()}
            ></Button>
          </div>
          <Text type="secondary">{"or user your email for login"}</Text>
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
              <Checkbox>{"Remember me"}</Checkbox>
            </Form.Item>
            {/* Rommember me End */}
            {/* Forgot Password */}
            <Button className={style.forgotPWD} type="link">
              <Link href="/auth/forgotpassword">{"forgot password?"}</Link>
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
              {"SIGN IN"}
            </Button>
          </Form.Item>
          {/* Submit End */}
        </Form>
        {/* Form End */}
      </div>
      {/* Left Side End */}
      {/* Right Side */}
      <div className={style.rightSide}>
        <Text strong style={{ fontSize: "30px", color: "#ffffff" }}>
          {"New Here!"}
        </Text>
        <Text style={{ color: "#ffffff" }}>
          {"sign up and discover a great Game"}
        </Text>
        <Button style={{ color: "var(--primary-color)" }}>
          <Link href="/auth/register">{"Register"}</Link>
        </Button>
      </div>
      {/* Right Side End */}
    </div>
  );
};

export default Login;
