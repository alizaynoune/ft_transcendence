import React, { useContext, useEffect, useState } from "react";
import Style from "./conversationFromSettings.module.css";
import { Form, Input, Button, Avatar, Space, Typography, message, Select, Spin, Checkbox } from "antd";
import { ConversationsType, UserType, MessengerContextType } from "@/types/types";
import axios from "@/config/axios";
import { MessengerContext } from "context/massengerContext";

const { Text } = Typography;
interface PropsType {
  conversation: ConversationsType;
}

interface UserValue {
  label: JSX.Element;
  value: number;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = (await axios.get(`/users/all?findBy=${username}`)) as { data: UserType[] };
      const data: UserValue[] = res.data.map(({ username, img_url, intra_id }) => ({
        label: (
          <Space>
            <Avatar src={img_url} />
            <Text>{username}</Text>
          </Space>
        ),
        value: intra_id,
      }));
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

const ConversationFromSettings: React.FC = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [value, setValue] = useState<UserValue[]>([]);
  const [form] = Form.useForm();
  const { currentConversation } = useContext(MessengerContext) as MessengerContextType;
  const [showField, setShowField] = useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    if (!currentConversation) return;
    form.setFields([
      { name: "title", value: currentConversation.title },
      { name: "public", value: currentConversation.public },
      { name: "protected", value: currentConversation.protected },
      { name: "members", value: undefined },
    ]);
    setShowField(currentConversation.protected);
  }, [currentConversation]);

  return (
    currentConversation && (
      <Form name="conversationSettings" onFinish={onFinish} style={{ width: 350 }} form={form}>
        <Form.Item name="title" rules={[{required: true, min: 2, max: 20}]} >
          <Input size="large" placeholder="title" />
        </Form.Item>
        <Form.Item name="password" hidden={!showField} rules={[{ required: showField }]}>
          <Input size="large" placeholder={currentConversation.protected ? "update password" : "set password"} />
        </Form.Item>
        <Form.Item name="members">
          <Select
            labelInValue
            placeholder="add members"
            mode="multiple"
            options={value}
            filterOption={false}
            allowClear={true}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            size="large"
            onSearch={(v) => {
              setFetching(true);
              fetchUserList(v)
                .then((res) => {
                  setValue(res);
                  setFetching(false);
                })
                .catch((e) => {
                  setFetching(false);
                  e instanceof Error && message.error(e.message);
                });
            }}
          />
        </Form.Item>
        <Form.Item name="public" valuePropName="checked">
          <Checkbox>{"Public"}</Checkbox>
        </Form.Item>
        <Form.Item name="protected" valuePropName="checked">
          <Checkbox
            onChange={(e) => {
              setShowField(e.target.checked);
            }}
          >
            {"protected by password"}
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {"update"}
          </Button>
        </Form.Item>
      </Form>
    )
  );
};

export default ConversationFromSettings;
