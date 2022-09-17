import style from './newGroupChat.module.css'
import { Select, Spin, Button, Space } from 'antd';
import type { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import React, { useEffect, useState } from 'react';
import {AddGroupIcon} from '@/icons/index'
import {CheckOutlined} from '@ant-design/icons'

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
}

async function fetchUserList(username: string): Promise<UserValue[]> {
  console.log('fetching user', username);

  return fetch('https://randomuser.me/api/?results=20')
    .then(response => response.json())
    .then(body =>
      body.results.map(
        (user: { name: { first: string; last: string }; login: { username: string } }) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }),
      ),
    );
}

const NewGroupChat: React.FC = () =>{
  const [selectedItems, setSelectedItems] = useState<UserValue[]>([]);
  const [fetching, setFetching] = useState<boolean>(false)
  const [value, setValue] = useState<UserValue[]>([]);

  const onChange = (v:UserValue[]) => {
    setSelectedItems(v)
  }

  const onFinish = () => {
    console.log(selectedItems);
  }

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
        onSearch={v => {
          setFetching(true)
          fetchUserList(v).then(res => {
            setValue(res)
            setFetching(false)
          })
          .catch(e => {
            setFetching(false)
            console.log(e, 'error<<<<<<<');
            
          })
          
        }}
      />
      <Button
      type='primary'
      shape='circle'
      icon={<CheckOutlined />}
      onClick={onFinish}
      />
      </Space>
    );
}

export default NewGroupChat