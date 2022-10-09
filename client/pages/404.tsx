import { Result, Button } from "antd";
import Link from "next/link";

const _404: React.FC = () => {
  return(
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link href={'/'}><Button type="primary">{"Back Home"}</Button></Link>}
  />
  )
}

export default _404