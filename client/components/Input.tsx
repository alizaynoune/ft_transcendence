import { NextComponentType, NextPage } from "next";
import { AppProps } from "next/app";

interface Props {
  disabled?: boolean;
  loading?: boolean;

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
  return (
    <div className="input-group">
      <div className="input-item">
        <div className="input icon-prefix-password  icon-suffix-eyeActive">
          <input className="input-filed" placeholder="placeholder" />
        </div>
        {children}
      </div>
      <p className="text-xs text-center italic input-message">{message}</p>
    </div>
  );
};
//  <div parent>  <div>icon<input/>icon<button/></div> <message /></div>

export default Input;
