import style from "./accountEdit.module.css";
import {
  Form,
  Input,
  Button,
  Col,
  Row,
  Dropdown,
  Menu,
  DatePicker,
  Select,
} from "antd";
import Icon from "@ant-design/icons";

// Icons
import {
  UserIcon,
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  CalenderEditIcon,
} from "@/icons/index";

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

const { Option } = Select;
const AccountSetting: React.FC = () => {
  return (
    <Form className={style.form} name="accountSettings">
      <Row gutter={24} justify="space-around" align="middle">
        <Col span={10}>
          <Form.Item name="firstname">
            <Input
              size="large"
              placeholder="First Name"
              prefix={<Icon component={UserIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="laststname">
            <Input
              size="large"
              placeholder="Last Name"
              prefix={<Icon component={UserIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="username">
            <Input
              size="large"
              placeholder="Username"
              prefix={<Icon component={UserIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="email">
            <Input
              size="large"
              placeholder="Email"
              prefix={<Icon component={EmailIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="phone">
            <Input
              size="large"
              placeholder="Phone"
              prefix={<Icon component={PhoneIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="birthday">
            <DatePicker
              size="large"
              placeholder="Birthday"
              suffixIcon={
                <Icon
                  component={CalenderEditIcon}
                  style={{ fontSize: "140%" }}
                />
              }
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name="address">
            <Input
              size="large"
              placeholder="Address"
              prefix={<Icon component={LocationIcon} />}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Select
            // showSearch
            placeholder="Grender"
            optionFilterProp="children"
            // onChange={onChange}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Col>
        <Col span={10}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                width: "100%",
              }}
            >
              Update
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AccountSetting;
