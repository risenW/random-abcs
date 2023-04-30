import { useState } from 'react';
import {
    Button,
    Input,
    Checkbox,
    Card
} from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import dynamic from 'next/dynamic';
import BaseLayout from '@/components/Layout';
import { jsonrepair } from 'jsonrepair'
import {
    ExpandOutlined,
    CloseOutlined,
} from '@ant-design/icons';

const ReactJson = dynamic(
    () => import('react-json-view'),
    { ssr: false }
);

export default function JSONFormatter() {
    const [jsonInput, setJsonInput] = useState("");
    const [jsonOutput, setJsonOutput] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState("Invalid JSON. Please check your input.");
    const [fullScreen, setFullScreen] = useState(false);

    const [displaySettings, setDisplaySettings] = useState<any>({
        collapsed: false,
        enableClipboard: false,
        displayObjectSize: false,
        displayDataTypes: false,
        sortKeys: false,
        quotesOnKeys: false,
        fixErrors: false,
        collapseStringsAfterLength: 10
    });

    const handleJsonChange = (e: any) => {
        setJsonInput(e.target.value);
        setShowError(false);
    }

    const formatJson = () => {
        let jsonObj;

        if (displaySettings.fixErrors === true) {
            try {
                jsonObj = jsonrepair(jsonInput);
                jsonObj = JSON.parse(jsonObj);
            } catch (error) {
                setErrorText("Ah, shoot. We couldn't fix your JSON.")
                setShowError(true);
            }
        } else {
            try {
                jsonObj = JSON.parse(jsonInput);
            } catch (error) {
                setErrorText("Invalid JSON. Please check your input.")
                setShowError(true);
            }
        }

        if (jsonObj) {
            setJsonOutput(jsonObj);
        }

    }

    const handleDisplaySettingsChange = (value: CheckboxValueType[]) => {
        const newDisplaySettings: any = { ...displaySettings }
        Object.keys(displaySettings).forEach(key => {
            newDisplaySettings[key] = value.includes(key);
        });
        setDisplaySettings(newDisplaySettings);
    }

    const downloadJSON = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(jsonOutput)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `formatted-json-${Date.now()}.json`
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    return (
        <BaseLayout title="JSON Formatter">
            <div>
                <h1 className="text-2xl mb-4 text-center">JSON Formatter</h1>
                <hr className="mb-4" />
                {showError &&
                    <p className="text-red-500 my-5">
                        {errorText}
                    </p>
                }
                <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
                    <Card className='shadow-sm border-2 border-gray-200 lg:col-span-2'>
                        <div>
                            <h2 className="text-2xl mb-4">Raw JSON</h2>
                            <hr className='mb-4' />
                        </div>
                        <Input.TextArea
                            rows={25}
                            value={jsonInput}
                            onChange={handleJsonChange}
                            placeholder="Enter raw JSON here..."
                            className='pt-4'
                            bordered={false}
                        />
                    </Card>

                    <div className="flex flex-col">
                        <h2 className="text-lg mt-10 font-semibold">Display Settings</h2>
                        <Checkbox.Group
                            className="flex-col items-baseline mt-5"
                            onChange={handleDisplaySettingsChange}
                            value={Object.keys(displaySettings).filter(key => displaySettings[key])}
                            options={[
                                { label: 'Collapsed', value: 'collapsed' },
                                { label: 'Enable Copy', value: 'enableClipboard' },
                                { label: 'Display Object Size', value: 'displayObjectSize' },
                                { label: 'Display Data Types', value: 'displayDataTypes' },
                                { label: 'Sort Keys', value: 'sortKeys' },
                                { label: 'Quotes on Keys', value: 'quotesOnKeys' },
                                { label: 'Fix Errors', value: 'fixErrors' },
                            ]}
                        />
                        <Button
                            type="primary"
                            onClick={formatJson}
                            className='text-white hover:bg-gray-100 font-bold mt-4 bg-blue-600'
                        >
                            Format JSON
                        </Button>
                    </div>

                    <div
                        className={`w-full col-span-2 ${fullScreen ? 'fixed top-0 left-0 w-full h-full bg-white z-50 p-10' : ''}`}
                    >
                        <Card className='shadow-lg border-2 border-gray-200' >
                            <div className='flex justify-between'>
                                <h2 className="text-2xl mb-4">Formatted JSON</h2>
                                <div>
                                    <Button
                                        type="default"
                                        className='text-gray-500 hover:bg-gray-100 font-bold'
                                        onClick={downloadJSON}
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
                            <hr className='mb-4' />
                            <ReactJson
                                src={jsonOutput || {}}
                                collapsed={displaySettings.collapsed}
                                enableClipboard={displaySettings.enableClipboard}
                                displayObjectSize={displaySettings.displayObjectSize}
                                displayDataTypes={displaySettings.displayDataTypes}
                                sortKeys={displaySettings.sortKeys}
                                quotesOnKeys={displaySettings.quotesOnKeys}
                                collapseStringsAfterLength={displaySettings.collapseStringsAfterLength}
                                style={{
                                    overflow: 'scroll',
                                    maxHeight: '600px',
                                }}
                                iconStyle='triangle'
                                name={false}
                            />

                        </Card>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

