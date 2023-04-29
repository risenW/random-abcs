import BaseLayout from '../components/Layout';
import RandomColor from '@/components/RandomColor';

import { message } from 'antd';


export default function RandomColorPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccessMessage = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  return (
    <BaseLayout title='randomabcs - Generate a random color in HEX, RGB, and HSL'>
      {contextHolder}
      <div className=''>
        <h1 className='text-xl font-bold mb-5 text-center'>Generate a random color in HEX and RGB</h1>
        <RandomColor showSuccessMessage={showSuccessMessage} />
      </div>
    </BaseLayout>
  )
}
