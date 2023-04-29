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
                <Statistic
                    value={randomNumber}
                    className='mb-10 '
                />

                <Form
                    name="random-number"
                    initialValues={{ remember: true }}
                    onFinish={handleGenerateRandomNumber}
                >
                    <Form.Item
                        label="Minimum Value"
                        name="min"
                    >
                        <InputNumber className='w-full' />
                    </Form.Item>

                    <Form.Item
                        label="Maximum Value"
                        name="max"
                    >
                        <InputNumber className='w-full' />
                    </Form.Item>
                    <div className='flex justify-center mt-4 gap-2'>
                        <Button
                            size='large'
                            type="primary"
                            htmlType="submit"
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold rounded  '
                        >
                            Generate
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
                </Form>
            </Card>
        </div>
    )
}
