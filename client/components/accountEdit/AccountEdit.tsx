import style from "./accountEdit.module.css";
import {
  Tabs,
  Form,
  Input,
  Button,
  Col,
  Row,
  Dropdown,
  Menu,
  MenuProps,
} from "antd";
import Icon, { DownOutlined } from "@ant-design/icons";

// Icons
import profileIcon from "@/icons/user.svg";
import emailIcon from '@/icons/email.svg'

const { TabPane } = Tabs;

const menu = (
  <Menu
    items={[
      {
        label: "Male",
        key: "0",
      },
      {
        type: "divider",
      },
      {
        label: "Female",
        key: "1",
      },
    ]}
  />
);

const AccountSetting: React.FC = () => {
  return (
    <Form className={style.form} name="accountSettings">
      <Row gutter={24} justify="space-around" align="middle">
        <Col span={10}>
          <Form.Item name="firstname">
            <Input
              size="large"
              placeholder="First Name"
              prefix={<Icon component={profileIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="laststname">
            <Input
              size="large"
              placeholder="Last Name"
              prefix={<Icon component={profileIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="username">
            <Input
              size="large"
              placeholder="Username"
              prefix={<Icon component={profileIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="email">
            <Input
              size="large"
              placeholder="Email"
              prefix={<Icon component={emailIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="phone">
            <Input
              size="large"
              placeholder="Phone"
              prefix={<Icon component={profileIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="birthday">
            <Input
              size="large"
              placeholder="Birthday"
              prefix={<Icon component={profileIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="address">
            <Input
              size="large"
              placeholder="Address"
              prefix={<Icon component={profileIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="primary" ghost icon={<DownOutlined />}>
              Grender
            </Button>
          </Dropdown>
        </Col>
        <Col span={10}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AccountSetting;
