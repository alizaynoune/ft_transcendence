import { NextComponentType } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import Header from "./Header";
import Button from './Button'

type Props = {
  children: ReactNode;
};

const MasterLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}

      <Button type="ghost" icon="addGroup" loading={true} disabled={true} > text </Button>
      <Button type="ghost" icon="addGroup" loading={true} > text </Button>
      <Button type="ghost" icon="AddFriend" loading={false} />
      <Button type="ghost" > text </Button>
      <br />
      <Button type="primary" icon="addGroup" loading={true} disabled={true} > text </Button>
      <Button type="primary" icon="addGroup" loading={true} > text </Button>
      <Button type="primary" icon="AddFriend" loading={false} />
      <Button type="primary" > text </Button>
      <br />

      <Button type="primary" danger={true} icon="addGroup" loading={true} disabled={true} > text </Button>
      <Button type="primary" danger={true} icon="addGroup" loading={true} > text </Button>
      <Button type="primary" danger={true} icon="AddFriend" loading={false} />
      <Button type="primary" danger={true} > text </Button>
      <br />
      
      
      
      
      
      
      
      
      <button className="btn-ghost m-5  icon-email danger">button</button>
      <button className="btn-ghost m-5 icon-prefix-password ">button</button>
      <button
        type="button"
        className="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        disabled
      >
        Disabled button
      </button>
      
      <button className="btn-primary m-5 icon-prefix-addGroup "></button>
      <button className="btn-ghost m-5 icon-prefix-AddFriend">
      </button>
      <br />
      <button className="btn-primary m-5 flex justify-center items-center   loading danger">button</button>
      <button className="btn-primary m-5  icon-prefix-AddFriend loading">
        button
      </button>
      <div className="container p-10">
        <div className="form-item">
          <div className="input-default icon-prefix-password icon-suffix-password">
            <input
              type="password"
              placeholder="Placeholder2"
              className="icon-prefix-password icon-suffix-password"
            />
          </div>
          <label className="message-error">message</label>
        </div>
      </div>
    </>
  );
};
export default MasterLayout;
