import { NextComponentType, NextPage } from "next";
import { AppProps } from "next/app";
import {useState} from 'react'
import {Eye, EyeSlash} from '../public/assets/icons/EyeIcon'

interface Props {
  disabled?: boolean;

  children?: JSX.Element | JSX.Element[];
  error?: boolean;

  type?: string;
  placeholder?: string;
  message?: string;
  prefix?: string;
  suffix?: string;
  required?: boolean;
}

const Input: React.FC<Props> = (props) => {
  const { type, placeholder, message, required, children } = props;
  const [passwordShow, setPasswordShow] = useState<boolean>(false)

  const handelClick = () => {
    setPasswordShow(!passwordShow)
  }

  return (
    <div className="input-group">
      <div className="input-item">
        <div className="input icon-prefix-password  ">
          <input
          className="input-filed"
          placeholder="placeholder"
          type={!type  || (type == 'password' && passwordShow) ? 'text' : type}
          />
          <span
            onClick={() => setPasswordShow(!passwordShow)}
            style={{
              cursor: 'pointer'
            }}
            >
              {passwordShow ? <Eye /> : <EyeSlash/> 
               }
          </span>
        </div>
        {children}
      </div>
      <p className="text-xs text-center italic input-message">{message}</p>
    </div>
  );
};
//  <div parent>  <div>icon<input/>icon<button/></div> <message /></div>

export default Input;
