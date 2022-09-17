import style from './newGroupChat.module.css'
import { Select, Spin } from 'antd';
import type { SelectProps } from 'antd/es/select';
import debounce from 'lodash/debounce';
import React, { useMemo, useRef, useState } from 'react';

const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];

interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
>({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };
    console.log(debounce(loadOptions, debounceTimeout), 'fetch<<<<<<,,');
    
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
    style={{
      width: 300
    }}
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

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
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [fetching, setFetching] = useState<boolean>(false)
  const [value, setValue] = useState<UserValue[]>([]);

    return (
      <Select
      style={{
        width: 300
      }}
        labelInValue
        mode="multiple"
        options={value}
        filterOption={false}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        onChange={v => {
          console.log(v);
        }}
        onSearch={v => {
          setFetching(true)
          fetchUserList(v).then(res => {
            console.log(res);
            setValue(res)
            setFetching(false)
          })
          
        }}
      />
    );
}

export default NewGroupChat