import { NextComponentType } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";

import Header from "./Header";

type Props = {
  children: ReactNode;
};

const MasterLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      {/* <div className="container p-10 d-flex"> */}
        <button className="btn-ghost m-5">button</button>
        <button className="button">button</button>
      {/* </div> */}
      <br />
      {/* <label htmlFor="currency" className="sr-only"></label> */}
      {/* <input className="input-default" placeholder="test" /> */}
      {/* <label htmlFor="currency" className=""></label> */}
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
