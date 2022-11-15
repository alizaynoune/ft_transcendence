import style from "./accountEdit.module.css";
import { Form, Input, Button, Col, Row, Modal, Image, message } from "antd";
import Icon from "@ant-design/icons";
import _ from "lodash";
import { UserIcon, EmailIcon } from "@/icons/index";
import { useContext, useEffect, useState } from "react";
import { ProfileContextType } from "@/types/types";
import { ProfileContext } from "context/profileContext";
import axios from "@/config/axios";

const AccountSetting: React.FC = () => {
  const { profile, updateProfile } = useContext(ProfileContext) as ProfileContextType;
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("Are you sure to enable 2FAT");
  const [qr, setQr] = useState<string>();
  const [TwoFat, setTwoFat] = useState<boolean>(profile?.two_factor_activate ? true : false);
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
    const update = (({ email, first_name, last_name, username }) => ({
      email,
      first_name,
      last_name,
      username,
    }))(values);
    const diff = Object.fromEntries(
      // @ts-ignore
      Object.entries(update).filter(([key, value]) => profile[key] !== value)
    );
    if (Object.keys(diff).length) {
      console.log(diff);
      try {
        const d = await updateProfile(diff as { email: string; first_name: string; last_name: string; username: string });
        console.log(d);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // /auth/2fa/generate
  const two_fat_generate_qr = async () => {
    try {
      const res = await axios.post("/auth/2fa/generate");
      setQr(res.data);
      setTwoFat(!TwoFat);
      setModalTitle("please scan the QR code by Google Authenticator");
      message.success('success enabled 2fat')
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  const disableTwoFat = () => {
    Modal.confirm({
      title: "Are you sure to enable 2FAT",
      onOk: async () => {
        try {
          setQr(undefined);
          setModalTitle("Are you sure to enable 2FAT");
          const res = await axios.post("/auth/2fa/disable");
          console.log(res.data);
          message.success(res.data.message)
          setTwoFat(!TwoFat);
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
    });
  };

  return (
    <>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title={modalTitle}
        cancelText={"close"}
        onOk={async () => await two_fat_generate_qr()}
        okButtonProps={{ disabled: qr ? true : false }}
      >
        {qr ? <Image src={qr} /> : null}
      </Modal>
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
          <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
            <Button
              danger={TwoFat}
              type="primary"
              size="large"
              onClick={() => (TwoFat ? disableTwoFat() : setOpenModal(true))}
            >{`${TwoFat ? "disable" : "enable"} 2FAT`}</Button>
          </Col>
          <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
            <Form.Item noStyle>
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
    </>
  );
};

export default AccountSetting;
