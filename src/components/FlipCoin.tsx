/* eslint-disable @next/next/no-img-element */
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
    const [isSpinning, setIsSpinning] = useState(true);


    const handleFlipCoin = () => {
        setIsSpinning(true);
        setCoinSide('');
        setTimeout(() => {
            setIsSpinning(false);
            flipCoin();
        }, 4000);
    }

    const flipCoin = () => {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        setCoinSide(result);
    }

    return (
        <div className='text-center mt-2 max-w-prose mx-auto'>
            <Card
                className='shadow-lg border-2 border-gray-200'
            >
                <div className='flex justify-center'>
                    <p>
                        {
                            isSpinning && <img src='/coin.gif' alt='Coin'
                                style={{
                                    width: '400px',
                                    height: '200px',
                                }}
                            />
                        }
                    </p>
                    {
                        !isSpinning && (
                            coinSide === 'Heads' ?
                                <img src='/coinhead.jpeg' alt='Heads'
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                    }}
                                />
                                :
                                <img src='/cointail.jpeg' alt='Tails'
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                    }}
                                />
                        )
                    }
                </div>
                <div className='flex justify-center mt-10'>
                    <Button
                        size='large'
                        type="primary"
                        onClick={handleFlipCoin}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded'
                    >
                        Flip Coin
                    </Button>
                </div>
            </Card>
        </div>
    )
}
