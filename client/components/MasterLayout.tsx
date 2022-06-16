import { NextComponentType } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";
// import Header from "./Header";
import Button from './Button'
import Input from './Input'
import {Layout} from 'antd'

const { Header, Footer, Sider, Content} = Layout

type Props = {
  children: ReactNode;
};

const MasterLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default MasterLayout;
