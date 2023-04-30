import { useState } from 'react';
import {
    Button,
    Input,
    Checkbox,
    Card,
} from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import dynamic from 'next/dynamic';
import BaseLayout from '@/components/Layout';
import {
    ExpandOutlined,
    CloseOutlined,
} from '@ant-design/icons';

import * as dfd from "danfojs";

const ReactJson = dynamic(
    () => import('react-json-view'),
    { ssr: false }
);

export default function CSVToJSON() {
    const [csvInput, setcsvInput] = useState("");
    const [jsonOutput, setJsonOutput] = useState(null);
    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState("Invalid CSV. Please check your input.");
    const [fullScreen, setFullScreen] = useState(false);

    const [loadingCSV, setLoadingCSV] = useState(false);
    const [csvUrl, setCsvUrl] = useState("");
    const [selectedCSVFile, setSelectedCSVFile] = useState<any>(null);

    const [csvInDataframe, setCsvInDataframe] = useState<any>(null);

    const [displaySettings, setDisplaySettings] = useState<any>({
        collapsed: false,
        enableClipboard: false,
        displayObjectSize: false,
        displayDataTypes: false,
        sortKeys: false,
        quotesOnKeys: false,
        collapseStringsAfterLength: 10
    });

    const handleCSVChange = (e: any) => {
        setcsvInput(e.target.value);
        setShowError(false);
    }

    const rawCsvToObject = (rawCSV: string) => {
        if (!rawCSV) {
            return {
                headers: [],
                values: [],
            };
        }

        // Split the string into lines
        const lines: string[] = rawCSV.trim().split(/\r?\n/);

        // Split the first line into headers
        const headers: string[] = lines[0].split(',');

        // Map the rest of the lines into objects
        const values = lines.slice(1).map(line =>
            // Split each line into fields
            line.split(',')
                // Pair up the fields with the headers
                .reduce((obj: any, field, i) => {
                    obj[headers[i]] = field;
                    return obj;
                }, {})
        );

        // Return the result
        return {
            columns: headers,
            data: values,
        };
    }


    const handleDisplaySettingsChange = (value: CheckboxValueType[]) => {
        const newDisplaySettings: any = { ...displaySettings }
        Object.keys(displaySettings).forEach(key => {
            newDisplaySettings[key] = value.includes(key);
        });
        setDisplaySettings(newDisplaySettings);
    }

    const convertcsvStringToJSON = () => {
        setCsvUrl("");
        setSelectedCSVFile(null)
        setJsonOutput(null);

        try {
            const csvObject = rawCsvToObject(csvInput);
            const df = new dfd.DataFrame(csvObject.data, { columns: csvObject.columns })
            const inputAsjson: any = dfd.toJSON(df);
            setJsonOutput(inputAsjson);
            setCsvInDataframe(df);
        } catch (error) {
            setErrorText("Invalid CSV. Please check your input.")
            setShowError(true);
        }
    }

    const handleCSVFileUpload = (e: any) => {
        setcsvInput("");
        setCsvUrl("");
        setJsonOutput(null);

        const file = e.target.files[0];
        dfd.readCSV(file)
            .then((df: any) => {
                const inputAsjson: any = dfd.toJSON(df);
                setJsonOutput(inputAsjson);
                setCsvInDataframe(df);
            }).catch((err: any) => {
                setErrorText("Error loading CSV. Please check your file.");
                setShowError(true);
            })
    }

    const handleLoadCSVFromURL = () => {
        setcsvInput("");
        setSelectedCSVFile(null)
        setJsonOutput(null);

        setLoadingCSV(true);
        dfd.readCSV(csvUrl)
            .then((df: any) => {
                const inputAsjson: any = dfd.toJSON(df);
                setJsonOutput(inputAsjson);
                setLoadingCSV(false);
                setCsvInDataframe(df);
            })
            .catch((err: any) => {
                setErrorText("Error loading CSV. Please check your URL. Make sure it is publicly accessible.");
                setShowError(true);
                setLoadingCSV(false);
            })
    }

    const downloadJSON = () => {
        dfd.toJSON(csvInDataframe, {
            fileName: `csv-to-json-${new Date().getTime()}.json`,
            download: true
        });
    }


    return (
        <BaseLayout title="CSV to JSON converter">
            <div className="">
                <h1 className="text-2xl mb-4 text-center">CSV to JSON</h1>
                <hr className="mb-4" />
                {showError &&
                    <p className="text-red-500 my-5 text-center">
                        {errorText}
                    </p>
                }
                <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
                    {
                        !fullScreen && (
                            <>
                                <Card className='shadow-sm border-2 border-gray-200 col-span-2'>
                                    <div>
                                        <div className='flex-col'>
                                            <h2 className="text-2xl mb-4">CSV</h2>
                                            <div>
                                                <input
                                                    type="file"
                                                    accept=".csv"
                                                    onChange={handleCSVFileUpload}
                                                    className='mb-6'
                                                    multiple={false}
                                                    value={selectedCSVFile}

                                                />
                                            </div>
                                            <div className='flex'>
                                                <Input
                                                    placeholder="Load a CSV from a URL"
                                                    className='mb-4'
                                                    value={csvUrl}
                                                    onChange={(e) => setCsvUrl(e.target.value)}
                                                />
                                                <Button
                                                    type="default"
                                                    className='text-gray-500 hover:bg-gray-100 font-bold ml-4'
                                                    onClick={handleLoadCSVFromURL}
                                                    loading={loadingCSV}
                                                >
                                                    Load
                                                </Button>
                                            </div>
                                        </div>
                                        <hr className='mb-4' />
                                    </div>
                                    <Input.TextArea
                                        rows={25}
                                        value={csvInput}
                                        onChange={handleCSVChange}
                                        placeholder="Or paste raw CSV here..."
                                        className='pt-4'
                                        bordered={false}
                                    />
                                </Card>

                                <div className="text-center flex-col">
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
                                        ]}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={convertcsvStringToJSON}
                                        className='text-white hover:bg-gray-100 font-bold mt-4 bg-blue-600'
                                    >
                                        Convert to JSON
                                    </Button>
                                </div>
                            </>
                        )
                    }
                    <div
                        className={`w-full col-span-2 ${fullScreen ? 'fixed top-0 left-0 w-full h-full bg-white z-50 p-10' : ''}`}
                    >
                        <Card className='shadow-lg border-2 border-gray-200' >
                            <div className='flex justify-between'>
                                <h2 className="text-2xl mb-4">JSON</h2>
                                <div>
                                    <Button
                                        type="default"
                                        className='text-gray-500 hover:bg-gray-100 font-bold ml-4'
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

