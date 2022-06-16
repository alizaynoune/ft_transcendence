import { NextComponentType, NextPage } from "next";
import { AppProps } from "next/app";
import { useState } from "react";
import { Eye, EyeSlash } from "../public/assets/icons/EyeIcon";

const statusColor = {
  error : '--error-color',
  success: '--success-color',
  warning: '--warning-color',
  primary: '--primary-color',
}

interface Props {
  width?: string;
  disabled?: boolean;
  children?: JSX.Element | JSX.Element[];
  error?: boolean;
  status?: 'error' | 'success' | 'warning' | 'primary'; 
  type?: string;
  placeholder?: string;
  message?: string;
  prefix?: string;
  suffix?: string;
  required?: boolean;
}



const Input: React.FC<Props> = (props) => {
  const { type, placeholder, message, required, children, status , width, prefix } = props;
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  // const [shadowColor, setShadowColor] = useState<string>('primary');

 console.log(statusColor[status || 'primary']);
 
  return (
    <div className={`input-group`}
    style={{
      width: (width || "100%"),
      
    }}
    >
      <div
        className={`input-item `}
        style={{
          borderColor: status  ? `var(${statusColor[status]})` : "var(--primary-color)",
        }}
      >
        <div className={`input ${prefix && ('icon-prefix-' + prefix)}`}>
          <input
            className="input-filed"
            placeholder="placeholder"
            required={required}
            type={!type || (type == "password" && passwordShow) ? "text" : type}
          />
          <span
            onClick={() => setPasswordShow(!passwordShow)}
            style={{
              cursor: "pointer",
            }}
          >
            {type === "password" && (passwordShow ? <Eye /> : <EyeSlash />)}
          </span>
        </div>
        {children}
      </div>
      <p className="text-xs text-center italic input-message"
      style={{
        color: status  ? `var(${statusColor[status]})` : "var(--dark-color)",
      }}
      >{message}</p>
    </div>
  );
};
//  <div parent>  <div>icon<input/>icon<button/></div> <message /></div>

export default Input;
