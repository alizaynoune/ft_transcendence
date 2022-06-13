import { NextComponentType } from "next";

import headerStyle from '../styles/header.module.css'

const Header: NextComponentType = () => {
  return (
    <>
      <div className={`${headerStyle.header} `}>
        <h1 className="">test</h1>
        <button className="btn-ghost">text</button>
      </div>
    </>
  );
};

export default Header;
