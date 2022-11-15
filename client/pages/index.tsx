import HeroSection from "@/components/heroSection/HeroSection";
import OurTeam from "@/containers/ourTeam/OurTeam";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { saveToken } from "@/store/reducers/auth";
import { message, Modal, Form, Button, Typography } from "antd";
import axios from "@/config/axios";
import InputCode from "react-verification-input";

const { Text } = Typography;
const Home: React.FC = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [token, setToken] = useState<string>("");

  const onFinish = async (values: any) => {
    try {
      const { code } = values;
      const res = await axios.post(
        `/auth/2fa/validate`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(saveToken(res.data.token));
      setOpenModal(false);
    } catch (error) {
      error instanceof Error && message.error(error.message);
      form.resetFields(["code"]);
    }
  };

  useEffect(() => {
    if (!route.isReady) return;
    const { token: access_token } = route.query;
    const _2FAT = route.query.tow_factor_activate === "true";
    if (!access_token) return;
    setToken(access_token as string);
    route.push("/");
    if (_2FAT) setOpenModal(true);
    else dispatch(saveToken(access_token));
  }, [route]);
  return (
    <>
      <Modal
        open={openModal}
        footer={null}
        onCancel={() => setOpenModal(false)}
        title={
          <Text strong italic>
            {"Google Authenticator Code"}
          </Text>
        }
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="code"
            rules={[{ required: true, len: 6 }]}
            style={{ display: "flex", justifyContent: "center", margin: "20px 20px 20px 0" }}
          >
            <InputCode
              autoFocus={true}
              classNames={{
                container: "container_input_code",
                character: "character_input_code",
                characterInactive: "character__inactive_input_code",
                characterSelected: "character__selected_input_code",
              }}
            />
          </Form.Item>
          <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" htmlType="submit">
              {"Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <HeroSection />
      <OurTeam />
    </>
  );
};

export default Home;
