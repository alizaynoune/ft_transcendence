import style from "./layout.module.css";
import React, { useState, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ReactNode } from "react";
import { Layout, Typography, Affix, message, Modal, Steps, Button } from "antd";
import Link from "next/link";
import SiderLayout from "@/components/sider/Sider";
import Header from "@/components/header/Header";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { AuthTunk } from "@/store/actions/auth";
import { selectAuth } from "@/store/reducers/auth";
import { selectLoading } from "@/store/reducers/globalLoading";
import Spin from "@/components/spin/Spin";
import socket from "@/config/socket";

const { Footer, Content } = Layout;
interface Props {
  children: ReactNode;
}
interface updateType {
  username: string;
  img_url: string;
}

const { Step } = Steps;

const MasterLayout: React.FC<Props> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { children } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuth, access_token, updated_at, created_at, username, img_url } = useAppSelector(selectAuth);
  const { Loading } = useAppSelector(selectLoading);
  const [currentStep, setCurrentStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [updateData, setUpdateData] = useState<updateType>();

  const login = async () => {
    try {
      await dispatch(AuthTunk());
    } catch (error) {
      error instanceof Error && message.error(error.message);
    }
  };

  const steps = [
    {
      title: "First",
      content: "First-content",
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  const modal = () => {
    return (
      <Modal
        open={openModal}
        title={
          <Steps current={currentStep}>
            {steps.map((item) => (
              <Step key={item.title} />
            ))}
          </Steps>
        }
        footer={
          <Button
            type="primary"
            onClick={() => {
              currentStep < steps.length - 1 ? setCurrentStep((prev) => prev + 1) : setOpenModal(false);
            }}
          >
            {currentStep < steps.length - 1 ? "Next" : "finish"}
          </Button>
        }
        width={"90%"}
        closable={false}
      >
        {steps[currentStep].content}
      </Modal>
    );
  };

  useEffect(() => {
    if (isAuth) {
      if (updated_at && updated_at === created_at) {
        setOpenModal(true);
        //   Modal.info({
        //     title: (
        //       <>

        //         {currentStep < steps.length - 1 && (
        //           <Button type="primary" onClick={() => setCurrentStep((prev) => prev + 1)}>
        //             {"next"}
        //           </Button>
        //         )}
        //       </>
        //     ),
        //     content: steps[currentStep].content,
        //     width: "100%",
        //     okText: "finish",
        //     onOk() {},
        //   });
      }
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
