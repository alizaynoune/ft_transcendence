import style from "./accountEdit.module.css";
import { Form, Input, Button, Col, Row, DatePicker, Select } from "antd";
import Icon from "@ant-design/icons";
import axios from "@/config/axios";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectLoading, changeLoading } from "@/reducers/globalLoading";
import _ from "lodash";
// Icons
import { UserIcon, EmailIcon, PhoneIcon, LocationIcon, CalenderEditIcon } from "@/icons/index";
import { useContext, useEffect, useState } from "react";
import { UserType, ProfileContextType } from "@/types/types";
import { ProfileContext } from "context/profileContext";

const { Option } = Select;
interface PropsType {
  profile: UserType;
}
const AccountSetting: React.FC = () => {
  const { profile, updateProfile } = useContext(ProfileContext) as ProfileContextType;
  const [data, setData] = useState<{
    email: string;
    first_name: string;
    last_name: string;
    username: string;
  }>();
  const dispatch = useAppDispatch();
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
    const update = (({ email, first_name, last_name, username }) => ({
      email,
      first_name,
      last_name,
      username,
    }))(values);
    const diff = Object.fromEntries(
      // @ts-ignore
      Object.entries(update).filter(([key, value]) => profile[key] != value)
    );
    if (Object.keys(diff).length) {
      console.log(diff);
      try {
        const d = await updateProfile(diff as { email: string; first_name: string; last_name: string; username: string } )
        console.log(d);
        
      } catch (error) {
        console.log(error);
        
      }

      // dispatch(changeLoading(true));
      // try {
      //     const res = await axios.put("users/update", {...diff});
      //     console.log(res.data, '<<<<<<<<<<<<');
      //     setData(
      //         (({ email, first_name, last_name, username }) => ({
      //             email,
      //             first_name,
      //             last_name,
      //             username
      //         }))(res.data)
      //     );
      //     dispatch(changeLoading(false));
      // } catch (error) {
      //     dispatch(changeLoading(false));
      //     console.log(error);
      // }
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
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Form.Item name="phone">
            <Input size="large" placeholder="Phone" prefix={<Icon component={PhoneIcon} />} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Form.Item name="birthday">
            <DatePicker
              size="large"
              placeholder="Birthday"
              suffixIcon={<Icon component={CalenderEditIcon} style={{ fontSize: "140%" }} />}
            />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Form.Item name="address">
            <Input size="large" placeholder="Address" prefix={<Icon component={LocationIcon} />} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
          <Select
            // showSearch
            placeholder="Grender"
            optionFilterProp="children"
            // onChange={onChange}
            // onSearch={onSearch}
            filterOption={(input, option) => (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
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
