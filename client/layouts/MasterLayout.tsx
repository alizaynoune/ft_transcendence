import style from "./layout.module.css";
import React, { useState, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ReactNode } from "react";
import { Layout, Typography, Affix, message, Modal, Button, Input, Upload, UploadProps, Form } from "antd";
import Link from "next/link";
import SiderLayout from "@/components/sider/Sider";
import Header from "@/components/header/Header";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { AuthTunk } from "@/store/actions/auth";
import { selectAuth, updateInfo } from "@/store/reducers/auth";
import { selectLoading } from "@/store/reducers/globalLoading";
import Spin from "@/components/spin/Spin";
import socket from "@/config/socket";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "@/config/axios";

const { Footer, Content } = Layout;
interface Props {
  children: ReactNode;
}
interface updateType {
  username: string;
  avatar: RcFile | undefined;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const MasterLayout: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { children } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuth, access_token, updated_at, created_at, username, img_url } = useAppSelector(selectAuth);
  const { Loading } = useAppSelector(selectLoading);
  const [openModal, setOpenModal] = useState(false);
  const [updatedData, setupdatedData] = useState<updateType>({ username: "", avatar: undefined });
  const [imageBase64, setImageBase64] = useState<string>();
  const [loadingImg, setLoadingImg] = useState(false);
  const [form] = Form.useForm();

  const login = async () => {
    try {
      await dispatch(AuthTunk());
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  const handleChange: UploadProps["onChange"] = (info: UploadChangeParam<UploadFile>) => {
    console.log(info);

    if (info.file.status === "uploading") {
      setLoadingImg(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url: string) => {
        setLoadingImg(false);
        setupdatedData((prev) => {
          return { ...prev, avatar: info.file.originFileObj };
        });
        setImageBase64(url);
      });
    }
  };

  const handleChangeUsername = (value: any) => {
    console.log(value.target.value);
    // emit to check if username already taken
    setupdatedData((prev) => {
      return { ...prev, username: value.target.value };
    });
  };

  const onFinish = async (values: any) => {
    console.log(values);
    try {
      // const files['img_url'] = updatedData.file
      const res = await axios.put("/users/update", updatedData);
      // dispatch new data
      console.log(res.data);
      dispatch(updateInfo(res.data));
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
    setOpenModal(false);
  };

  const modal = () => {
    return (
      <Modal open={openModal} title={"please update your data"} footer={null} closable={false}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input placeholder="username" size="large" onChange={handleChangeUsername} />
          </Form.Item>
          <Form.Item valuePropName="fileList">
            <Upload name="avatar" listType="picture-card" accept="image/*" showUploadList={false} onChange={handleChange}>
              {imageBase64 || img_url ? (
                <img src={imageBase64 || `${process.env.API_URL}${img_url}`} alt="avatar" style={{ width: "100%" }} />
              ) : (
                <div>
                  {loadingImg ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>{"Upload"}</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {"Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  useEffect(() => {
    if (isAuth) {
      // if (updated_at && updated_at === created_at) {
      setupdatedData({ username, avatar: undefined });
      form.setFieldsValue({
        username,
      });
      setOpenModal(true);
      // }
      socket.connect();
      socket.on("error", (error) => {
        message.error(`Socket ${error.message}`);
      });
      socket.on("connect_error", (error) => {
        message.error(error?.message);
      });

      return () => {
        socket.off("connect_error");
        socket.off("error");
      };
    }
  }, [isAuth]);

  useEffect(() => {
    access_token && login();
  }, [access_token]);

  return (
    <Layout className={style.layout}>
      {Loading && <Spin />}
      {modal()}
      <Affix>
        <Header
          collapsed={collapsed}
          setCollapsed={function (value: SetStateAction<boolean>): void {
            setCollapsed(value);
          }}
        />
      </Affix>
      <Layout>
        {isAuth && (
          <Affix offsetTop={70}>
            <SiderLayout
              collapsed={collapsed}
              setCollapsed={function (value: SetStateAction<boolean>): void {
                setCollapsed(value);
              }}
            />
          </Affix>
        )}
        <Layout className={style.contentContainer}>
          <Content>{children}</Content>
          <div className={style.layoutFooter}>
            {router.pathname === "/" && (
              <div className={style.sectionGameInfo}>
                <div className={style.sectionGameInfoLogo}>
                  <Link href="/">
                    <a>
                      <Image src="/images/Logo.png" height={68} width={110} />
                    </a>
                  </Link>
                </div>
                <div className={style.sectionGameInfoText}>
                  <Typography.Title level={3} className={style.sectionGameInfoTettel}>
                    {"About game"}
                  </Typography.Title>
                  <Typography.Text className={style.sectionGameInfoText}>
                    {
                      "Ping-pong is a game in which two or four players hit a\
                    light, hollow ball back and forth across a net stretched\
                    across the center of a table. The game is more commonly\
                    known as table tennis, reflecting its origin as an indoor\
                    modification of the sport of lawn tennis. The term ping-pong\
                    is a federally registered trademark for the game first\
                    issued to Parker Brothers, Inc., in 1901, and now owned by\
                    Escalade Sports, of Evansville, Indiana. Provide additional\
                    interactive capacity of editable and copyable."
                    }
                  </Typography.Text>
                </div>
              </div>
            )}
            <Footer className={style.footer}>
              <span>{"ft_transcendence"}</span>
              <span>{"© 2022 1337. All rights reserved."}</span>
            </Footer>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MasterLayout;
