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
      {/* <div className="container p-10 d-flex"> */}
      <button className="btn-ghost m-5 userInfo loading" disabled type="button">
        button1
      </button>
      <button className="btn-primary m-5  userInfo loading">button</button>
     
      <div className="container p-10">
        <div className="form-item">
          <div className="input-error">
            <span className="">
              <img src="/assets/icons/user.svg" />
            </span>
            <input type="password" placeholder="Placeholder2" />
            <span className="">
              <img src="/assets/icons/user.svg" />
            </span>
          </div>
          <label className="message-error">message</label>
        </div>
      </div>
    </>
  );
};
// form form-item input message
export default MasterLayout;
