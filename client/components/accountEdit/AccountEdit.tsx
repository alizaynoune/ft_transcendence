import style from "./accountEdit.module.css";
import { Form, Input, Button, Col, Row, DatePicker, Select } from "antd";
import Icon from "@ant-design/icons";
import axios from "@/config/axios";

// Icons
import {
    UserIcon,
    EmailIcon,
    PhoneIcon,
    LocationIcon,
    CalenderEditIcon,
} from "@/icons/index";
import { useEffect, useState } from "react";
// email: "nawfal.nawfal@nawfal.nawfal2";
// first_name: "Ali";
// id: 1;
// img_url: "https://cdn.intra.42.fr/users/alzaynou.jpg";
// intra_id: 51111;
// last_name: "Zaynoune";
// updated_at: "2022-09-23T15:21:25.408Z";
// username: "alzaynou";
const { Option } = Select;
const AccountSetting: React.FC = () => {
    const [data, setData] = useState<{email: string; first_name: string; last_name: string}>();

    const LoadingData = async () => {
        try {
            const res = await axios.get("profile");
            
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        LoadingData();
    }, []);
    return (
        <Form className={style.form} name="accountSettings">
            <Row gutter={24} justify="space-around" align="middle">
                <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <Form.Item name="firstname">
                        <Input
                            size="large"
                            placeholder="First Name"
                            prefix={<Icon component={UserIcon} />}
                        />
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <Form.Item name="laststname">
                        <Input
                            size="large"
                            placeholder="Last Name"
                            prefix={<Icon component={UserIcon} />}
                        />
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <Form.Item name="username">
                        <Input
                            size="large"
                            placeholder="Username"
                            prefix={<Icon component={UserIcon} />}
                        />
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <Form.Item name="email">
                        <Input
                            size="large"
                            placeholder="Email"
                            prefix={<Icon component={EmailIcon} />}
                        />
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <Form.Item name="phone">
                        <Input
                            size="large"
                            placeholder="Phone"
                            prefix={<Icon component={PhoneIcon} />}
                        />
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
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
                <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <Form.Item name="address">
                        <Input
                            size="large"
                            placeholder="Address"
                            prefix={<Icon component={LocationIcon} />}
                        />
                    </Form.Item>
                </Col>
                <Col xs={{ span: 24, offset: 1 }} lg={{ span: 10, offset: 1 }}>
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
                            Update
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default AccountSetting;
