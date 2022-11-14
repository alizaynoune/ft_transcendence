import style from "./accountEdit.module.css";
import { Form, Input, Button, Col, Row, Select, Checkbox } from "antd";
import Icon from "@ant-design/icons";
import _ from "lodash";
import { UserIcon, EmailIcon } from "@/icons/index";
import { useContext, useEffect, useState } from "react";
import { ProfileContextType } from "@/types/types";
import { ProfileContext } from "context/profileContext";

const AccountSetting: React.FC = () => {
  const { profile, updateProfile } = useContext(ProfileContext) as ProfileContextType;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      first_name: profile?.first_name,
      last_name: profile?.last_name,
      email: profile?.email,
      username: profile?.username,
    });
  }, [profile]);

  const onFinish = async (values: any) => {
    console.log(values);
    const update = (({ email, first_name, last_name, username, two_factor_activate }) => ({
      email,
      first_name,
      last_name,
      username,
      two_factor_activate,
    }))(values);
    const diff = Object.fromEntries(
      // @ts-ignore
      Object.entries(update).filter(([key, value]) => profile[key] !== value)
    );
    if (Object.keys(diff).length) {
      console.log(diff);
      try {
        const d = await updateProfile(
          diff as { email: string; first_name: string; last_name: string; username: string; two_factor_activate: boolean }
        );
        console.log(d);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Form className={style.form} name="accountSettings" form={form} onFinish={onFinish}>
      <Row gutter={24} justify="space-around" align="middle">
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Form.Item name="first_name">
            <Input size="large" placeholder="First Name" value={"kdfksjkj"} prefix={<Icon component={UserIcon} />} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Form.Item name="last_name">
            <Input size="large" placeholder="Last Name" prefix={<Icon component={UserIcon} />} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Form.Item name="username">
            <Input size="large" placeholder="Username" prefix={<Icon component={UserIcon} />} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Form.Item name="email">
            <Input size="large" placeholder="Email" prefix={<Icon component={EmailIcon} />} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 24, offset: 3 }}>
          <Form.Item name="two_factor_activate">
            <Checkbox defaultChecked={profile?.two_factor_activate}>{"two_factor_activate"}</Checkbox>
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                width: "100%",
              }}
            >
              {"Update"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AccountSetting;
