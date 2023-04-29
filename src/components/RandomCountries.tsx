import { useState } from 'react';
import { countries } from '../fixtures/countries';
import { Button, Card, Form, InputNumber, Tag } from 'antd';
import {
    CopyOutlined,
} from '@ant-design/icons';

interface RandomCountriesProps {
    showSuccessMessage: (message: string) => void;
}

export default function RandomCountries(props: RandomCountriesProps) {
    const { showSuccessMessage } = props;
    const [randomCountries, setRandomCountries] = useState([]);

    const handleGenerate = (values: any) => {
        const { numCountries = 1 } = values;
        const shuffled = countries.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, numCountries);
        const selectedNames: any = selected.map(country => country.en);
        setRandomCountries(selectedNames);
    };

    const handleCopy = () => {
        const text = randomCountries.join(', ');
        navigator.clipboard.writeText(text);
        showSuccessMessage('Copied to clipboard!');
    };


    return (
        <div className='text-center mt-2 max-w-prose mx-auto'>
            <Card
                className='shadow-lg border-2 border-gray-200'
            >
                <Form
                    name="Random Countries"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    className='w-full'
                    onFinish={handleGenerate}
                >
                    <Form.Item
                        label="Number of Countries"
                        name="numCountries"
                    >
                        <InputNumber
                            min={1}
                            max={countries.length}
                            placeholder='1'
                            className='w-full'
                        />
                    </Form.Item>

                    <DisplayCountries countries={randomCountries} />

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
    );
}

interface DisplayCountriesProps {
    countries: string[],
}

const DisplayCountries = (props: DisplayCountriesProps) => {
    const { countries } = props;

    return (
        <div className='my-10 text-left'>
            {countries.map((country, index) => (
                <Tag key={index} color='blue' className='m-1'>
                    {country}
                </Tag>
            ))}
        </div>
    );
}
