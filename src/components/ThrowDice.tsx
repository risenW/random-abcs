import { useState } from 'react';
import {
    Card,
    Statistic,
    Button,
} from 'antd';
import {
    CopyOutlined,
} from '@ant-design/icons';


interface ThrowDiceProps {
    showSuccessMessage: (message: string) => void;
}

export default function ThrowDice(props: ThrowDiceProps) {
    const { showSuccessMessage } = props;

    const [diceValues, setDiceValues] = useState({
        "dice1": 0,
        "dice2": 0,
    })

    const handleThrowDice = () => {
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;
        setDiceValues({
            "dice1": dice1,
            "dice2": dice2,
        })
    }

    const handleCopy = () => {
        const text = `Die 1 => ${diceValues.dice1}, Die 2 => ${diceValues.dice2}`
        navigator.clipboard.writeText(text);
        showSuccessMessage('Copied to clipboard!');
    };


    return (
        <div className='text-center mt-2 max-w-prose mx-auto'>
            <Card
                className='shadow-lg border-2 border-gray-200'
            >
                <div className='flex justify-center space-x-16 my-10'>
                    <Statistic title="Dice 1" value={diceValues.dice1} />
                    <Statistic title="Dice 2" value={diceValues.dice2} />
                </div>

                <div className='flex justify-center mt-4 gap-2'>
                    <Button
                        size='large'
                        onClick={handleThrowDice}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded'
                    >
                        Throw Dice
                    </Button>
                    <Button
                        size='large'
                        type="ghost"
                        onClick={handleCopy}
                        className='text-black hover:bg-gray-100 font-bold'
                    >
                        Copy to Clipboard <CopyOutlined />
                    </Button>
                </div>
            </Card>
        </div>
    )
}
