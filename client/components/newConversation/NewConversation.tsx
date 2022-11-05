import style from "./newConversation.module.css";
import { Select, Spin, Button, Space, message, Avatar, Typography, Input, Form } from "antd";
import React, { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
import axios from "@/config/axios";
import { UserType, ConversationsHistory } from "@/types/types";

// Usage of DebounceSelect
interface UserValue {
  label: JSX.Element;
  value: number;
}
const { Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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

interface PropsType {
  setConversations: React.Dispatch<React.SetStateAction<ConversationsHistory[]>>;
  setCurrentConversation: React.Dispatch<React.SetStateAction<ConversationsHistory | undefined>>;
}

const NewConversation: React.FC<PropsType> = ({ setCurrentConversation, setConversations }) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [value, setValue] = useState<UserValue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: { members: UserValue[]; title: string }) => {
    try {
      const { title } = values;
      const members = values.members.map((i) => i.value);
      const res = (await axios.post("conversation/create", { members, title })) as { data: ConversationsHistory };
      message.success("conversation success created");
      setConversations((prev) => {
        const find = prev.find((c) => c.id === res.data.id);
        if (!find) return [res.data, ...prev];
        else {
          const filter = prev.filter((c) => c.id !== res.data.id);
          return [res.data, ...filter];
        }
      });
      setCurrentConversation(res.data);
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  return (
    <Form
      name="create_new_group"
      onFinish={onFinish}
      style={{
        width: 350,
      }}
    >
      <Form.Item name="title" rules={[{ required: true, message: "Please input a title for this conversation!" }]}>
        <Input placeholder="entry name of conversation" size="large" />
      </Form.Item>
      <Form.Item name="members" rules={[{ required: true, message: "Please select atlest on member!" }]}>
        <Select
          className={style.select}
          labelInValue
          placeholder="Select members"
          mode="multiple"
          options={value}
          filterOption={false}
          allowClear={true}
          notFoundContent={fetching ? <Spin size="small" /> : null}
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
      <Form.Item>
        <Button type="primary" size="large" htmlType="submit" icon={<CheckOutlined />}>
          {"create"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewConversation;
