import { useState } from 'react';
import {
    Card,
    Statistic,
    Button,
} from 'antd';
import {
    CopyOutlined,
} from '@ant-design/icons';

interface FlipCoinProps {
    showSuccessMessage: (message: string) => void;
}

export default function FlipCoin(props: FlipCoinProps) {
    const { showSuccessMessage } = props;

    const [coinSide, setCoinSide] = useState('Heads');


    const handleFlipCoin = () => {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        setCoinSide(result);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(coinSide);
        showSuccessMessage('Copied to clipboard!');
    };


    return (
        <div className='text-center mt-2 max-w-prose mx-auto'>
            <Card
                className='shadow-lg border-2 border-gray-200'
            >
                <p>
                    Flip a coin
                </p>
                <div className='flex justify-center space-x-16 my-10'>
                    <Statistic value={coinSide} />
                </div>
                <div className='flex'>
                    <Button
                        type="primary"
                        onClick={handleFlipCoin}
                        className='flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded  w-full'
                    >
                        Flip
                    </Button>
                    <Button
                        type="ghost"
                        onClick={handleCopy}
                        className='text-black hover:bg-gray-100 font-bold'
                    >
                        <CopyOutlined />
                    </Button>
                </div>
            </Card>
        </div>
    )
}
