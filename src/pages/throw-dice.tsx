import BaseLayout from '../components/Layout';
import ThrowDice from '@/components/ThrowDice';

import { message } from 'antd';


export default function ThrowDicePage() {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccessMessage = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  return (
    <BaseLayout title='randomabcs - Throw a dice and get a random numbers'>
      {contextHolder}
      <div className=''>
        <h1 className='text-xl font-bold mb-5 text-center'>Throw a dice and get a random numbers</h1>
        <ThrowDice showSuccessMessage={showSuccessMessage} />
      </div>
    </BaseLayout>
  )
}
