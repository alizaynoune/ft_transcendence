import style from './accountSetting.module.css'
import { Tabs, Form, Input, Button, Col, Row } from 'antd'
import Icon from "@ant-design/icons";


// Icons
import profileIcon from "public/assets/icons/user.svg";



const { TabPane } = Tabs
const AccountSetting: React.FC = () => {

    return (
        <div className={style.container}>
            <Tabs size='large' tabBarStyle={{
                backgroundColor: '#464E5F',
                width: '100%',
                margin: 'auto',
                borderRadius: '6px',
                fontWeight: 'bold',
                boxShadow: '0px 0px 8px rgba(154, 154, 154, 0.5)',
                padding: '0 20px'
                // fontSize: '30px',
            }}>
                <TabPane tab='Edit' key='1'>
                    <Form className={style.form} name='accountSettings'>
                        <Row gutter={24} justify="space-around" align='middle'>
                            <Col span={10}>
                                <Form.Item name='firstname'>
                                    <Input size='large' placeholder='First Name' prefix={<Icon component={profileIcon} />} />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item name='laststname'>
                                    <Input size='large' placeholder='Last Name' prefix={<Icon component={profileIcon} />} />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item name='username'>
                                    <Input size='large' placeholder='Username' prefix={<Icon component={profileIcon} />} />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item name='email'>
                                    <Input size='large' placeholder='Email' prefix={<Icon component={profileIcon} />} />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item name='phone'>
                                    <Input size='large' placeholder='Phone' prefix={<Icon component={profileIcon} />} />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item name='birthday'>
                                    <Input size='large' placeholder='Birthday' prefix={<Icon component={profileIcon} />} />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item name='address'>
                                    <Input size='large' placeholder='Address' prefix={<Icon component={profileIcon} />} />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                {/* DropDown >> Grender */}
                            </Col>
                            <Col span={10}>
                                <Form.Item>
                                    <Button type='primary' htmlType='submit' style={{
                                        width: '100%'
                                    }}>Submit</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane tab='Privacy' key='2'>
                    Privacy
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AccountSetting
