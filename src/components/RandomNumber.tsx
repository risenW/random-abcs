import { useState } from 'react';
import {
    Card,
    InputNumber,
    Statistic,
    Form,
    Button,
} from 'antd';
import {
    CopyOutlined,
} from '@ant-design/icons';

interface RandomNumberProps {
    showSuccessMessage: (message: string) => void;
}

export default function RandomNumber(props: RandomNumberProps) {
    const { showSuccessMessage } = props;

    const [randomNumber, setRandomNumber] = useState(0);

    const handleGenerateRandomNumber = (values: any) => {
        const {
            min = 0,
            max = 100,
        } = values;
        const result = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNumber(result);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(String(randomNumber));
        showSuccessMessage('Copied to clipboard!');
    };


    return (
        <div className='text-center mt-2 max-w-prose mx-auto'>
            <Card
                className='shadow-lg border-2 border-gray-200'
            >
                <p>
                    Generate a Random Number
                </p>
                <Statistic
                    value={randomNumber}
                    className='mb-10 '
                />

                <Form
                    name="random-number"
                    initialValues={{ remember: true }}
                    onFinish={handleGenerateRandomNumber}
                    labelAlign='left'
                >
                    <Form.Item
                        label="Min"
                        name="min"
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="Max"
                        name="max"
                    >
                        <InputNumber />
                    </Form.Item>
                    <div className='flex'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded  w-full flex-1'
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
                </Form>
            </Card>
        </div>
    )
}
