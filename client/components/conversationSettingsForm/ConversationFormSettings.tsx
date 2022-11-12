import React, { useContext, useEffect, useState } from "react";
import Style from "./conversationFromSettings.module.css";
import { Form, Input, Button, Avatar, Space, Typography, message, Select, Spin, Checkbox, Modal } from "antd";
import { UserType, MessengerContextType } from "@/types/types";
import axios from "@/config/axios";
import { MessengerContext } from "context/massengerContext";

const { Text } = Typography;

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
  const { currentConversation, updateConversation, deleteConversation } = useContext(MessengerContext) as MessengerContextType;
  const [showField, setShowField] = useState<boolean>(false);
  const [passwordRequired, setPasswordRequired] = useState<boolean>(false);

  const onFinish = async (values: {
    title: string;
    public: boolean;
    protected: boolean;
    members: UserValue[];
    password?: string;
  }) => {
    const update = { ...values };
    if (!update.protected || !update.password?.length) delete update.password;
    if (values.members) Object.assign(update, { members: values.members.map((i) => i.value) });
    const diff = Object.fromEntries(
      // @ts-ignore
      Object.entries(update).filter(([key, value]) => value !== undefined && currentConversation[key] !== value)
    );

    if (Object.keys(diff).length) {
      console.log(diff);
      try {
        const res = (await updateConversation(diff)) as string;
        message.success(res);
      } catch (error: any) {
        message.error(error instanceof Error ? error.message : error);
      }
    }
  };

  const confirmDeleteConversation = () => {
    Modal.confirm({
      title: `Are you sure to delete this conversation "${currentConversation?.title}"`,
      async onOk() {
        try {
          const res = (await deleteConversation()) as { message: string };
          message.success(res.message);
        } catch (error) {
          error instanceof Error && message.error(error.message);
        }
      },
      onCancel() {},
    });
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
    setPasswordRequired(!currentConversation.protected);
  }, [currentConversation]);

  return (
    currentConversation && (
      <>
        <Form name="conversationSettings" onFinish={onFinish} style={{ width: 350 }} form={form}>
          <Form.Item name="title" rules={[{ required: true, min: 2, max: 20 }]}>
            <Input size="large" placeholder="title" />
          </Form.Item>
          <Form.Item name="password" hidden={!showField} rules={[{ required: showField && passwordRequired, min: 6, max: 20 }]}>
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
                  .then((res: UserValue[]) => {
                    const filtered = res.filter((u) => {
                      return !currentConversation.members.some((m) => m.userid === u.value);
                    });
                    setValue(filtered);
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
                form.setFieldValue("password", "");
                setShowField(e.target.checked);
              }}
            >
              {"protected by password"}
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "space-between" }}>
              <Button type="primary" htmlType="submit">
                {"update"}
              </Button>
              <Button danger type="primary" onClick={confirmDeleteConversation}>
                {"delete"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </>
    )
  );
};

export default ConversationFromSettings;
