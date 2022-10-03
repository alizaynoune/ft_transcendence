import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import style from './spin.module.css'

const MySpin : React.FC = () => {
    return (
            <span className={style.loader} />
    )
}

export default MySpin