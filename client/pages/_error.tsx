import { Result, Button } from "antd";
import Link from "next/link";

//@ts-ignore
function Error({ statusCode }) {
  return (
    <Result
      status={statusCode === 403 || statusCode === 404 || statusCode === 500 ? statusCode : 404}
      title={statusCode}
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link href={'/'}><Button type="primary">{"Back Home"}</Button></Link>}
    />
  )
}
//@ts-ignore
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
