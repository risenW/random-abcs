import { useState } from 'react';
import {
    Card,
    Button,
} from 'antd';
import {
    CopyOutlined,
} from '@ant-design/icons';

interface RandomColorProps {
    showSuccessMessage: (message: string) => void;
}

export default function RandomColor(props: RandomColorProps) {
    const { showSuccessMessage } = props;
    const [hexColor, setHexColor] = useState('#000000');
    const [rgbColor, setRgbColor] = useState("(0,0,0)");


    const handleGenerateRandomColor = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setHexColor(randomColor);
        setRgbColor(hexToRgb(randomColor));
    }

    const renderColor = (value: any) => {
        if (!value) {
            return null;
        }

        return (
            <div className='text-center'>
                <div className='w-full h-10' style={{ backgroundColor: value }} />
                <span className='ml-2'>Hex: {value}</span>
                <p>RGB: {hexToRgb(value)}</p>
            </div>
        )
    }

    const hexToRgb = (hex: string) => {
        if (!hex) {
            return ""
        }

        const bigint = parseInt(hex.replace('#', ''), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return "(" + r + "," + g + "," + b + ")";
    }

    const handleCopy = () => {
        const text = `Hex: ${hexColor}, RGB: ${rgbColor}`
        navigator.clipboard.writeText(text);
        showSuccessMessage('Copied to clipboard!');
    };


    return (
        <div className='text-center mt-2 max-w-prose mx-auto'>
            <Card
                className='shadow-lg border-2 border-gray-200'
            >
                <div className='flex justify-center space-x-16 my-10'>
                    {renderColor(hexColor)}
                </div>
                <div className='flex'>
                    <Button
                        type="primary"
                        onClick={handleGenerateRandomColor}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded  w-full'
                    >
                        Generate
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
