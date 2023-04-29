import BaseLayout from '../components/Layout';
import RandomCountries from '@/components/RandomCountries';

import { message } from 'antd';


export default function RandomCountriesPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccessMessage = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  return (
    <BaseLayout title='randomabcs - Generate random countries'>
      {contextHolder}
      <div className=''>
        <h1 className='text-xl font-bold mb-5 text-center'>Generate random countries</h1>
        <RandomCountries showSuccessMessage={showSuccessMessage} />
      </div>
    </BaseLayout>
  )
}
