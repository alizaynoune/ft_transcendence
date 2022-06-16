import { Input } from 'antd'
import { AudioOutlined } from '@ant-design/icons';
import Image from 'next/image'

const { Search } = Input

const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

const HeroSection = () => {

    return (
        <>
            <Image src='/images/hero.png' width={1000} height={200} />
        </>
    )
}

export default HeroSection
