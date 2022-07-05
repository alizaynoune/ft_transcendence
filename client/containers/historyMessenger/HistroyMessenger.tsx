import style from "./historyMessenger.module.css";
import { useState, useEffect } from "react";
import { Input, Button, List } from "antd";
import Icon from "@ant-design/icons";

// components 
import ConversationCard from "@/components/historyMessengerCard/HistoryMessengerCard";

// icons
import searchIcon from "@/icons/search.svg";
import createGroupIcon from "@/icons/addGroup.svg";


interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
}

const HistroyMessenger: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=16&inc=name,gender,email,nat,picture,login&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData(body.results);
        setLoading(false);
        console.log(body);
        
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Input
        style={{
          borderRadius: '5px'
        }}
          suffix={
            <Icon
              component={searchIcon}
              style={{ fontSize: "120%", color: "var(--primary-color)" }}
            />
          }
          placeholder="search friends"
        />
        <Button
          type="primary"
          size="large"
          icon={
            <Icon component={createGroupIcon} style={{ fontSize: "120%" }} />
          }
        />
      </div>
      <div>
        {/* <ConversationCard username="user name" avatar="" /> */}

        <List
        dataSource={data}
        // itemLayout="horizontal"
        // grid={{
        //   gutter: 10,
        //   column: 2,
        // }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          total: 20,
          pageSize: 16,
        }}
        // renderItem={(item) => <ConversationCard  data={item} />}
      />

      </div>
    </div>
  );
};

export default HistroyMessenger;
