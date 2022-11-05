import style from "./newConversation.module.css";
import { Select, Spin, Button, Space, message, Avatar, Typography } from "antd";
import type { SelectProps } from "antd/es/select";
import debounce from "lodash/debounce";
import React, { useEffect, useState } from "react";
import { AddGroupIcon } from "@/icons/index";
import { CheckOutlined } from "@ant-design/icons";
import axios from "@/config/axios";
import { UserType } from "@/types/types";

// Usage of DebounceSelect
interface UserValue {
  label: JSX.Element;
  value: number;
}
const { Text } = Typography;

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

const NewConversation: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<UserValue[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  const [value, setValue] = useState<UserValue[]>([]);

  const onChange = (v: UserValue[]) => {
    setSelectedItems(v);
  };

  const onFinish = async () => {
    try {
      const members = selectedItems.map((i) => i.value);
      const res = await axios.post("conversation/create", { members });
      console.log(res.data);
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  return (
    <Space>
      <Select
        className={style.select}
        labelInValue
        placeholder="Input friends username"
        mode="multiple"
        options={value}
        filterOption={false}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        onChange={onChange}
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
      <Button type="primary" shape="circle" icon={<CheckOutlined />} onClick={onFinish} />
    </Space>
  );
};

export default NewConversation;
