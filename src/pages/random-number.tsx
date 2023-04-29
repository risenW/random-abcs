import BaseLayout from '../components/Layout';
import RandomNumber from '../components/RandomNumber';

import { message } from 'antd';


export default function RandomNumberPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccessMessage = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  return (
    <BaseLayout title='randomabcs - Generate a random number between a range'>
      {contextHolder}
      <div className=''>
        <h1 className='text-xl font-bold mb-5 text-center'>Generate a random number between a range</h1>
        <RandomNumber showSuccessMessage={showSuccessMessage} />
      </div>
    </BaseLayout>
  )
}
