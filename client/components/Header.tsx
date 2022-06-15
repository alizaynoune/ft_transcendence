import { NextComponentType } from "next";

import headerStyle from '../styles/header.module.css'

const Header: React.FC = () => {
  return (
    <>
      <div className={`${headerStyle.header} `}>
        <h1 className="">test</h1>
        <button className="btn-ghost">text</button>
        <div className="relative">
        <img className="w-12 h-12 rounded-full border-2 border-white" src="https://joeschmoe.io/api/v1/random" alt="" />
          <span className="top-0 left-8 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
      </div>
      </div>
    </>
  );
};

export default Header;
