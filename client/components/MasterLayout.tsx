import { NextComponentType } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import Header from "./Header";
import Button from './Button'
import Input from './Input'
import { Eye, EyeSlash } from '../public/assets/icons/EyeIcon'

type Props = {
  children: ReactNode;
};

const MasterLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}

      <Button type="ghost" icon="addGroup" loading={true} disabled={true}> text </Button>
      <Button type="ghost" icon="addGroup" loading={true}> text </Button>
      <Button type="ghost" icon="AddFriend" loading={false} />
      <Button type="ghost"> text </Button>
      <br />
      <Button type="primary" icon="addGroup" loading={true} disabled={true}> text </Button>
      <Button type="primary" icon="addGroup" loading={true}> text </Button>
      <Button type="primary" icon="password" loading={false} />
      <Button type="primary"> text </Button>
      <br />
      <Button type="primary" danger={true} icon="password" loading={true} disabled={true}> text </Button>
      <Button type="primary" danger={true} icon="addGroup" loading={true}> text </Button>
      <Button type="primary" danger={true} icon="AddFriend" loading={false} />
      <Button type="primary" danger={true} icon="password">
        
      </Button>
      <br />

      <div className="container p-10">



        <Input message="test message" type='password'>
          <Button type="primary" icon="Send" loading={false} />
        </Input>

      </div>
    </>
  );
};
export default MasterLayout;
