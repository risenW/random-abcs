import BaseLayout from '../components/Layout';
import RandomNumber from '../components/RandomNumber';
import ThrowDice from '../components/ThrowDice';
import FlipCoin from '../components/FlipCoin';
import RandomColor from '../components/RandomColor';
import RandomNameGroups from '../components/RandomNameGroups';
import RandomCountries from '@/components/RandomCountries';

import { message } from 'antd';


export default function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const showSuccessMessage = (message: string) => {
    messageApi.open({
      type: 'success',
      content: message,
    });
  };

  return (
    <BaseLayout title='Random Chaos - Generate random numbers, colors, names, countries, and more'>
      {contextHolder}
      <div className='space-y-10'>
        <RandomNumber showSuccessMessage={showSuccessMessage} />
        <ThrowDice showSuccessMessage={showSuccessMessage} />
        <FlipCoin showSuccessMessage={showSuccessMessage} />
        <RandomColor showSuccessMessage={showSuccessMessage} />
        <RandomNameGroups showSuccessMessage={showSuccessMessage} />
        <RandomCountries showSuccessMessage={showSuccessMessage} />
      </div>
    </BaseLayout>
  )
}
