import { NextComponentType } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";

import Header from "./Header";
// import UserIcon from '../public/assets/icons/user.svg'

type Props = {
  children: ReactNode;
};

const MasterLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <button className="btn-ghost m-5  icon-email danger">button</button>
      <button className="btn-ghost m-5 icon-prefix-password ">button</button>
      <br />
      <button className="btn-primary m-5   loading danger">button</button>
      <button className="btn-primary m-5  icon-prefix-email loading">button</button>
      <div className="container p-10">
        <div className="form-item">
          <div className="input-default icon-prefix-password icon-suffix-password">
            <input type="password" placeholder="Placeholder2" className="icon-prefix-password icon-suffix-password" />
          </div>
          <label className="message-error">message</label>
        </div>
      </div>
    </>
  );
};
export default MasterLayout;
