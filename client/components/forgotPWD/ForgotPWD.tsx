import { NextComponentType } from "next";
import Image from "next/image";
import style from "./forgotPWD.module.css";
import { Button, Typography, Form, Input, Divider } from "antd";
import Link from "next/link";
import {GoogleOutlined } from "@ant-design/icons";


const {Text, Title} = Typography
const ForgotPassword: NextComponentType = () => {

  const onFinish = () => {}
  

  return (
    <div className={style.container}>
    {/* Left Side */}
    <div className={style.leftSide}>
      <Text strong style={{ fontSize: "30px", color: "#ffffff" }}>
        Welcome Back!
      </Text>
      <Text style={{ color: "#ffffff" }}>
        To keep connected with us plase login with your personal info
      </Text>
      <Button style={{ color: "var(--primary-color)" }}>
        <Link href="/auth/login">Login</Link>
      </Button>
    </div>
    {/* Left Side end */}
    {/* Right side */}
    <div className={style.rightSide}>
      <Title className={style.title} level={3}>
        Forgot Password
      </Title>
      <Form
        name="newPassword"
        className={style.loginForm}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
               {/* Email */}
               <Form.Item
            className={style.loginFormItem}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input size="large" prefix={<EmailIcon />} placeholder="Email" />
          </Form.Item>
          {/* Email end */}
        {/* submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={style.loginFormButton}
          >
            SUBMIT
          </Button>
        </Form.Item>
        {/* submit end */}
      </Form>
      <Divider className={style.divider}>
        <Link href="/auth/login">Back to login!</Link>
      </Divider>
    </div>
    {/* Right Side End */}
  </div>
);
};

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

export default ForgotPassword;
