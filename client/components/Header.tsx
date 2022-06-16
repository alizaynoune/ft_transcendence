import Image from "next/image";

import headerStyle from "../styles/header.module.css";
import Button from "./Button";

// import { LogoDefault } from "../public/images/logo";

const Header: React.FC = () => {
  return (
    <header>
      <div className={`${headerStyle.header} `}>
        <div className={headerStyle.logo}>
          <Image src="/images/Logo.png" layout="fill" />
        </div>
        <Button>Sing in</Button>
      </div>
    </header>
  );
};

export default Header;
