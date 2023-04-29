import BaseLayout from '../components/Layout';
import FlipCoin from '@/components/FlipCoin';

import { message } from 'antd';


export default function FlipCoinPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccessMessage = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  return (
    <BaseLayout title='randomabcs - Flip a coin and get a random result'>
      {contextHolder}
      <div className=''>
        <h1 className='text-xl font-bold mb-5 text-center'>Flip a coin and get a random result</h1>
        <FlipCoin showSuccessMessage={showSuccessMessage} />
      </div>
    </BaseLayout>
  )
}
