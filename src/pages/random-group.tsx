import BaseLayout from '../components/Layout';
import RandomNameGroups from '../components/RandomNameGroups';

import { message } from 'antd';


export default function RandomGroupPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccessMessage = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  return (
    <BaseLayout title='randomabcs - Randomly assign items to groups'>
      {contextHolder}
      <div className=''>
        <h1 className='text-xl font-bold mb-5 text-center'>Randomly assign items to groups</h1>
        <RandomNameGroups showSuccessMessage={showSuccessMessage} />
      </div>
    </BaseLayout>
  )
}
