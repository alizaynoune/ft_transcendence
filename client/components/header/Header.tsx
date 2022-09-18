import { MenuOpenIcon, MenuCloseIcon, SearchIcon } from '@/icons/index';
import Icon, {BellFilled} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import style from './header.module.css'
import {Layout, Input, Button, Badge, Avatar} from 'antd'
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";


interface PropsType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
}
const Header: React.FC<PropsType> = (props) => {
  const {collapsed, setCollapsed} = props
  const { isAuth, avatar, email, name } = useAppSelector(selectAuth);
  return(
    <Layout.Header className={style.header}>
          <div className={style.trigger}>
            <Icon
              component={collapsed ? MenuOpenIcon : MenuCloseIcon}
              style={{
                fontSize: "40px",
                color: "var(--light-color)",
              }}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <div className={style.leftDiv}>
            <Link href="/">
              <a className={style.logo}>
                <Image src="/images/Logo.png" height={68} width={110} />
              </a>
            </Link>
            {isAuth && (
              <Input
                className={style.search}
                size="large"
                placeholder="Search"
                suffix={
                  <Icon
                    component={SearchIcon}
                    style={{ fontSize: "135%", color: "var(--light-color)" }}
                  />
                }
              />
            )}
          </div>
          {!isAuth ? (
            <Button>
              <Link href="/auth/login">{"Login"}</Link>
            </Button>
          ) : (
            <div className={style.rightDiv}>
              <Badge count={3}>
                <BellFilled
                  style={{
                    fontSize: "180%",
                    color: "var(--light-color)",
                    fontWeight: "bold",
                  }}
                />
              </Badge>
              <Link href={"/profile/me"}>
                <a>
                  <Avatar src={avatar} size={55} />
                </a>
              </Link>
            </div>
          )}
        </Layout.Header>
  )
}

export default Header