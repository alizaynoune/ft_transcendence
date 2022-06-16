import { NextComponentType } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import Header from "./Header";
import Button from './Button'
import Input from './Input'

type Props = {
  children: ReactNode;
};

const MasterLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default MasterLayout;
