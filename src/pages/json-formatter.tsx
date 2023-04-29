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

const ReactJson = dynamic(
    () => import('react-json-view'),
    { ssr: false }
);

export default function JSONFormatter() {
    const [jsonInput, setJsonInput] = useState("");
    const [jsonOutput, setJsonOutput] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState("Invalid JSON. Please check your input.");

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

    return (
        <BaseLayout title="JSON Formatter">
            <div className="p-4 ">
                <h1 className="text-4xl mb-4">JSON Formatter</h1>
                <hr className="mb-4" />
                {showError &&
                    <p className="text-red-500 my-5">
                        {errorText}
                    </p>
                }
                <div className='grid grid-cols-5 overflow-scroll'
                    style={{
                        maxHeight: '600px',
                    }}
                >
                    <Card className='shadow-sm border-2 border-gray-200 col-span-2'>
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

                    <div className="text-center">
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

                    <div className="col-span-2 overflow-scroll">
                        {jsonOutput &&
                            <Card className='shadow-lg border-2 border-gray-200' >
                                <div>
                                    <h2 className="text-2xl mb-4">Formatted JSON</h2>
                                    <hr className='mb-4' />
                                </div>

                                <ReactJson
                                    src={jsonOutput}
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
                        }
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

