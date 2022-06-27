import style from "./login.module.css";
import { NextComponentType } from "next";
import { Button, Input, Form, Checkbox, Typography, Divider } from "antd";
import Link from "next/link";
import { GoogleOutlined } from "@ant-design/icons";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const onFinish = () => { };
  // console.log(providers, "Providers");
  // console.log(getCsrfToken());

  const onFinishFailed = () => { };

  const CsrfToken = getCsrfToken();

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
              onClick={() => signIn("google")}
            ></Button>
            <Button
              shape="circle"
              icon={<Icon_42 />}
              onClick={() => signIn("42-school")}
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
            <Input size="large" prefix={<EmailIcon />} placeholder="Email" />
          </Form.Item>
          {/* User name End */}
          {/* csrfToken */}
          {/* <input type='hidden' name='csrfToken' defaultValue={CsrfToken} /> */}
          {/* csrfToken End */}
          {/* Passwrod */}
          <Form.Item
            className={style.loginFormItem}
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<PasswordIcon />}
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

const EmailIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 7.05627C16 2.89571 12.7664 0 8.1179 0C3.30122 0 0 3.25048 0 7.99579C0 12.894 3.21351 16 8.28469 16C9.52408 16 10.7132 15.8275 11.5974 15.5302V14.3215C10.9792 14.6005 9.65061 14.7814 8.30482 14.7814C4.09777 14.7814 1.38462 12.1451 1.38462 8.05329C1.38462 4.06521 4.14666 1.20876 7.98993 1.20876C11.9224 1.20876 14.6154 3.57581 14.6154 7.03664C14.6154 9.39527 13.8188 10.9195 12.5794 10.9195C11.872 10.9195 11.4694 10.5269 11.4694 9.85381V4.22927H9.98562V5.39877H9.82746C9.445 4.56442 8.56075 4.04698 7.52696 4.04698C5.51402 4.04698 4.10784 5.67642 4.10784 8.00561C4.10784 10.4414 5.48382 12.0806 7.5284 12.0806C8.67865 12.0806 9.5629 11.5337 9.98562 10.5564H10.1438C10.2602 11.4959 11.1546 12.1662 12.3048 12.1662C14.5651 12.1662 16 10.1819 16 7.05767V7.05627ZM5.6808 8.04347C5.6808 6.36494 6.45722 5.36933 7.77426 5.36933C9.11143 5.36933 9.96549 6.40421 9.96549 8.04347C9.96549 9.68274 9.10137 10.7274 7.75413 10.7274C6.46729 10.7274 5.6808 9.71078 5.6808 8.04347Z"
      fill="currentColor"
    />
  </svg>
);

const PasswordIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.10969 1.50632C4.20741 1.75498 3.31125 2.02538 2.42201 2.31726C2.34081 2.34357 2.26863 2.39215 2.21369 2.45747C2.15875 2.52279 2.12326 2.60223 2.11127 2.68674C1.58643 6.62495 2.79906 9.49832 4.24569 11.3912C4.85818 12.2006 5.5885 12.9137 6.41233 13.5066C6.74012 13.7378 7.03001 13.9045 7.25833 14.0116C7.37201 14.0656 7.46486 14.1016 7.53591 14.1234C7.56698 14.1343 7.59902 14.1422 7.63159 14.1471C7.66378 14.1418 7.69547 14.1339 7.72633 14.1234C7.79833 14.1016 7.89117 14.0656 8.00486 14.0116C8.23223 13.9045 8.52307 13.7368 8.85086 13.5066C9.67467 12.9136 10.405 12.2006 11.0175 11.3912C12.4641 9.49926 13.6768 6.62495 13.1519 2.68674C13.14 2.60219 13.1046 2.5227 13.0496 2.45736C12.9947 2.39202 12.9224 2.34347 12.8412 2.31726C12.2244 2.11547 11.1833 1.78674 10.1535 1.50726C9.10191 1.22211 8.13465 1.01084 7.63159 1.01084C7.12949 1.01084 6.16127 1.22211 5.10969 1.50726V1.50632ZM4.85769 0.530526C5.88559 0.251053 6.97791 0 7.63159 0C8.28528 0 9.3776 0.251053 10.4055 0.530526C11.4571 0.814737 12.5172 1.15105 13.1405 1.35474C13.4012 1.44081 13.6322 1.59865 13.8072 1.81014C13.9822 2.02162 14.0939 2.27817 14.1296 2.55032C14.6942 6.79168 13.384 9.93505 11.7943 12.0145C11.1202 12.9041 10.3164 13.6874 9.40981 14.3384C9.09631 14.5637 8.76416 14.7618 8.41696 14.9305C8.1517 15.0556 7.86654 15.1579 7.63159 15.1579C7.39665 15.1579 7.11243 15.0556 6.84622 14.9305C6.49903 14.7618 6.16687 14.5637 5.85338 14.3384C4.94677 13.6874 4.14298 12.9041 3.46885 12.0145C1.87916 9.93505 0.568952 6.79168 1.13358 2.55032C1.16929 2.27817 1.28104 2.02162 1.45599 1.81014C1.63094 1.59865 1.86201 1.44081 2.12264 1.35474C3.02756 1.05803 3.93951 0.783213 4.85769 0.530526V0.530526Z"
      fill="currentColor"
    />
    <path
      opacity="0.3"
      d="M9.5 6.49922C9.50016 6.80954 9.40407 7.11228 9.22497 7.36571C9.04587 7.61914 8.79258 7.81078 8.5 7.91422L8.885 9.90422C8.89901 9.9766 8.89684 10.0512 8.87864 10.1226C8.86045 10.1941 8.82668 10.2606 8.77976 10.3175C8.73283 10.3743 8.67392 10.4201 8.60723 10.4515C8.54054 10.483 8.46772 10.4992 8.394 10.4992H7.606C7.53236 10.4991 7.45966 10.4827 7.3931 10.4512C7.32653 10.4197 7.26774 10.3739 7.22093 10.3171C7.17412 10.2602 7.14044 10.1938 7.1223 10.1224C7.10416 10.051 7.10201 9.97652 7.116 9.90422L7.5 7.91422C7.24076 7.82256 7.0117 7.66141 6.83786 7.44838C6.66401 7.23535 6.55206 6.97863 6.51425 6.70628C6.47644 6.43392 6.51422 6.15642 6.62345 5.90408C6.73269 5.65175 6.90919 5.43429 7.13365 5.27548C7.35812 5.11667 7.62192 5.02262 7.89623 5.00359C8.17053 4.98457 8.44479 5.04131 8.68903 5.16762C8.93327 5.29392 9.13809 5.48493 9.28111 5.71978C9.42414 5.95462 9.49986 6.22425 9.5 6.49922Z"
      fill="currentColor"
    />
  </svg>
);

const Icon_42 = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 -2 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.06897 1.10352H8.82759L2.75862 7.75048H8.82759V13.7932H6.06897V10.7718H0V7.75048L6.06897 1.10352Z"
      fill="currentColor"
    />
    <path
      opacity="0.5"
      d="M9.93115 1.10352H16.0001V4.12486L12.6898 7.75048V10.7718L15.4484 7.75048V11.3761H9.93115V7.75048L12.6898 4.72913V1.70778H12.138L9.93115 4.12486V1.10352Z"
      fill="currentColor"
    />
  </svg>
);
