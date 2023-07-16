import { useState } from 'react';
import {
    Button,
    Input,
    Card,
    Form,
    // Select,
    message,
} from 'antd';
import BaseLayout from '@/components/Layout';
import {
    ExpandOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { LoremIpsum } from "lorem-ipsum";

export default function JSONFormatter() {
    const [messageApi, contextHolder] = message.useMessage();

    const showSuccessMessage = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };


    const [generatedText, setGeneratedText] = useState("");
    const [fullScreen, setFullScreen] = useState(false);


    const [textSettings, setTextSettings] = useState<any>({
        count: 1,
        format: "plain",
        paragraphLowerBound: 3,
        paragraphUpperBound: 7,
        random: Math.random,
        sentenceLowerBound: 5,
        sentenceUpperBound: 15,
        suffix: "\n",
        units: "paragraphs",

    });


    const generateText = (values: any) => {
        const updatedSettings = {
            ...textSettings,
            ...values,
            count: Number(values.count),
            paragraphLowerBound: Number(values.paragraphLowerBound),
            paragraphUpperBound: Number(values.paragraphUpperBound),
            // sentenceLowerBound: Number(values.sentenceLowerBound),
            // sentenceUpperBound: Number(values.sentenceUpperBound),
        }
        setTextSettings(updatedSettings);
        const lorem = new LoremIpsum(updatedSettings);
        const sentence = lorem.generateParagraphs(updatedSettings.count);
        setGeneratedText(sentence);
    }

    const downloadText = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(generatedText)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `generated-text-${Date.now()}.txt`
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    const handleCopyText = () => {
        navigator.clipboard.writeText(generatedText);
        showSuccessMessage("Copied to clipboard");
    }

    return (
        <BaseLayout title="Random Text Generator - Lorem ipsum">
            {contextHolder}
            <div>
                <h1 className="text-2xl mb-4 text-center">Random Text Generator</h1>
                <hr className="mb-4" />
                <div className='flex gap-4'>
                    <div className="flex flex-col">
                        <Form
                            className="flex-col items-baseline mt-5"
                            layout='vertical'
                            onFinish={generateText}
                            initialValues={textSettings}
                        >
                            <Form.Item
                                label="Number of paragraphs"
                                name="count"
                            >
                                <Input
                                    type="number"
                                    min={1}
                                    value={textSettings.count}
                                />
                            </Form.Item>
                            {/* <Form.Item
                                label="Format"
                                name="format"
                            >
                                <Select
                                    defaultValue="plain"
                                    style={{ width: 120 }}
                                    onChange={(value) => setTextSettings({ ...textSettings, format: value })}
                                >
                                    <Select.Option value="plain">Plain Text</Select.Option>
                                    <Select.Option value="html">HTML</Select.Option>
                                </Select>
                            </Form.Item> */}
                            {/* <Form.Item
                                label="Units"
                                name="units"
                            >
                                <Select
                                    defaultValue="sentences"
                                    style={{ width: 120 }}
                                    onChange={(value) => setTextSettings({ ...textSettings, units: value })}
                                >
                                    <Select.Option value="sentences">Sentence</Select.Option>
                                    <Select.Option value="paragraphs">Paragraph</Select.Option>
                                    <Select.Option value="words">Word</Select.Option>

                                </Select>
                            </Form.Item> */}
                            <Form.Item
                                label="Min. number of sentences per paragraph."
                                name="paragraphLowerBound"
                            >
                                <Input
                                    type="number"
                                    min={1}
                                    value={textSettings.paragraphLowerBound}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Max. number of sentences per paragraph."
                                name="paragraphUpperBound"
                            >
                                <Input
                                    type="number"
                                    min={1}
                                    value={textSettings.paragraphUpperBound}
                                />
                            </Form.Item>

                            {/* <Form.Item
                                label="Min. number of words per sentence."
                                name="sentenceLowerBound"
                            >
                                <Input
                                    type="number"
                                    min={1}
                                    value={textSettings.sentenceLowerBound}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Max. number of words per sentence."
                                name="sentenceUpperBound"
                            >
                                <Input
                                    type="number"
                                    min={1}
                                    value={textSettings.sentenceUpperBound}
                                />
                            </Form.Item> */}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className='text-white hover:bg-gray-100 font-bold mt-4 bg-blue-600'
                                >
                                    Generate Text
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div
                        className={`w-full col-span-2 ${fullScreen ? 'fixed top-0 left-0 w-full h-full bg-white z-50 p-10' : ''}`}
                    >
                        <Card className='shadow-sm border-2 border-gray-200 flex-1'>
                            <div className='flex justify-end'>
                                <div>
                                    <Button
                                        type="default"
                                        className='text-gray-500 hover:bg-gray-100 font-bold'
                                        onClick={handleCopyText}
                                    >
                                        Copy
                                    </Button>
                                    <Button
                                        type="default"
                                        className='text-gray-500 hover:bg-gray-100 font-bold'
                                        onClick={downloadText}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        type="default"
                                        className='text-gray-500 hover:bg-gray-100 font-bold ml-2'
                                        onClick={() => setFullScreen(!fullScreen)}
                                        icon={fullScreen ? <CloseOutlined /> : <ExpandOutlined />}
                                    />
                                </div>
                            </div>
                            <Input.TextArea
                                rows={25}
                                value={generatedText}
                                placeholder="lorem ipsum..."
                                className='pt-4'
                                bordered={false}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

