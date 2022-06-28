import style from "./friendsList.module.css";
import React, { useEffect, useState } from "react";
import { List, Avatar, Space, Popover, Button } from "antd";
import Icon from "@ant-design/icons";

// Icons
import DotsVIcon from "@/icons/DotsV.svg";
import DeleteUserIcon from '@/icons/DeleteUser.svg';
import BlockUserIcon from '@/icons/BlockUser.svg';
import MessageIcon from '@/icons/message.svg';
import PlayGameIcon from '@/icons/PlayGame.svg';



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
  }
}


const FriendsCard: React.FC = () => {
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
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  const deleteFriend = (id: string) => {
    console.log(id);

  }

  return (
    <div className={style.container}>
      <List
        dataSource={data}
        itemLayout="horizontal"
        grid={{
          gutter: 10,
          column: 2,
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          total: 20,
          pageSize: 16,
        }}
        renderItem={(item) => (
          <List.Item className={style.item}
            key={item.login.uuid}
            actions={[
              <Popover
                // key="ellipsis"
                content={
                  <div className={style.actionContainer}>
                    <Button
                      ghost
                      type="primary"
                      icon={<Icon component={MessageIcon} style={{ fontSize: '120%' }} />}
                      onClick={() => deleteFriend(item.login.uuid)}
                    />
                    <Button
                      ghost
                      type="primary"
                      icon={<Icon component={PlayGameIcon} style={{ fontSize: '120%' }} />}
                      onClick={() => deleteFriend(item.login.uuid)}
                    />
                    <Button
                      ghost
                      type="primary"
                      icon={<Icon component={BlockUserIcon} style={{ fontSize: '120%' }} />}
                      onClick={() => deleteFriend(item.login.uuid)}
                    />
                    <Button
                      ghost
                      type="primary"
                      icon={<Icon component={DeleteUserIcon} style={{ fontSize: '120%' }} />}
                      onClick={() => deleteFriend(item.login.uuid)}
                    />
                  </div>
                }
                trigger="click"
                placement="left"

              >
                <Icon
                  component={DotsVIcon}
                  style={{ fontSize: "140%" }}
                // onClick={deleteFriend.bind(this, item.login.uuid)}
                />
              </Popover>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} size='large' />}
              title={`${item.name.first} ${item.name.last}`}
              description={item.login.username}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default FriendsCard;
