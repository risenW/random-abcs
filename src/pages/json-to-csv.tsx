import { useState } from 'react';
import {
    Button,
    Input,
    Card,
    Table,
} from 'antd';
import {
    ExpandOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import BaseLayout from '@/components/Layout';

import * as dfd from "danfojs";


export default function JsonToCSV() {
    const [jsonInput, setJsonInput] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorText, setErrorText] = useState("Invalid JSON. Please check your input.");
    const [fullScreen, setFullScreen] = useState(false);

    const [loadingJSON, setLoadingJSON] = useState(false);
    const [jsonUrl, setjsonUrl] = useState("");
    const [selectedJSONFile, setSelectedJSONFile] = useState<any>(null);
    const [jsonAsDataframe, setJsonAsDataframe] = useState<any>(null);

    const [tableData, setTableData] = useState<any>({
        columns: [],
        rows: []
    });


    const convertDataframeToTableData = (df: dfd.DataFrame) => {
        const columns = df.columns.map((col: string) => {
            return {
                key: col,
                title: col,
                dataIndex: col,
                width: 200,
                sortDirections: ['descend', 'ascend'],
                sorter: (a: any, b: any) => {
                    if (a[col] < b[col]) {
                        return -1;
                    }
                    if (a[col] > b[col]) {
                        return 1;
                    }
                    return 0;
                }
            }
        });

        const rows = df.values.map((row: any) => {
            const newRow: any = {};
            columns.forEach((col: any, index: number) => {
                newRow[col.key] = row[index];
                newRow.key = uuidv4();
            })
            return newRow;
        });

        return { columns, rows };
    }

    const handleJSONChange = (e: any) => {
        setJsonInput(e.target.value);
        setShowError(false);
    }

    const convertCSVStringToJSON = () => {
        setjsonUrl("");
        setSelectedJSONFile(null)
        setTableData({
            columns: [],
            rows: []
        });

        try {
            const csvObject = JSON.parse(jsonInput);
            const df = new dfd.DataFrame(csvObject);
            setJsonAsDataframe(df);
            setTableData(convertDataframeToTableData(df));
        } catch (error) {
            setErrorText("Invalid CSV. Please check your input.")
            setShowError(true);
        }
    }

    const handleJSONFileUpload = (e: any) => {
        setjsonUrl("");
        setJsonInput("");
        setTableData({
            columns: [],
            rows: []
        });


        const file = e.target.files[0];
        dfd.readJSON(file)
            .then((df: any) => {
                setJsonAsDataframe(df);
                const tabData = convertDataframeToTableData(df);
                setTableData(tabData);
            }).catch((err: any) => {
                setErrorText("Error loading JSON. Please check your file.");
                setShowError(true);
            })
    }

    const handleLoadJSONFromURL = () => {
        setJsonInput("");
        setSelectedJSONFile(null)
        setTableData({
            columns: [],
            rows: []
        });


        setLoadingJSON(true);
        dfd.readJSON(jsonUrl)
            .then((df: any) => {
                setJsonAsDataframe(df);
                const tabData = convertDataframeToTableData(df);
                setTableData(tabData);
                setLoadingJSON(false);
            })
            .catch((err: any) => {
                setErrorText("Error loading JSON. Please check your URL. Make sure it is publicly accessible.");
                setShowError(true);
                setLoadingJSON(false);
            })
    }

    const handleDownloadCSV = () => {
        dfd.toCSV(jsonAsDataframe, {
            fileName: `json-to-csv-${new Date().getTime()}.json`,
            download: true
        });
    }

    return (
        <BaseLayout title="JSON to CSV converter">
            <div className="">
                <h1 className="text-2xl mb-4 text-center">JSON to CSV</h1>
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
                                            <h2 className="text-2xl mb-4">JSON</h2>
                                            <div>
                                                <input
                                                    type="file"
                                                    accept=".json"
                                                    onChange={handleJSONFileUpload}
                                                    className='mb-6'
                                                    multiple={false}
                                                    value={selectedJSONFile}

                                                />
                                            </div>
                                            <div className='flex'>
                                                <Input
                                                    placeholder="Load a JSON from a URL"
                                                    className='mb-4'
                                                    value={jsonUrl}
                                                    onChange={(e) => setjsonUrl(e.target.value)}
                                                />
                                                <Button
                                                    type="default"
                                                    className='text-gray-500 hover:bg-gray-100 font-bold ml-4'
                                                    onClick={handleLoadJSONFromURL}
                                                    loading={loadingJSON}
                                                >
                                                    Load
                                                </Button>
                                            </div>
                                        </div>
                                        <hr className='mb-4' />
                                    </div>
                                    <Input.TextArea
                                        rows={25}
                                        value={jsonInput}
                                        onChange={handleJSONChange}
                                        placeholder="Or paste raw JSON here..."
                                        className='pt-4'
                                        bordered={false}
                                    />
                                </Card>

                                <div className="text-center mt-10">
                                    <Button
                                        type="primary"
                                        onClick={convertCSVStringToJSON}
                                        className='text-white hover:bg-gray-100 font-bold mt-4 bg-blue-600'
                                    >
                                        Convert to CSV
                                    </Button>
                                </div>
                            </>
                        )
                    }

                    <div
                        className={`w-full col-span-2 ${fullScreen ? 'fixed top-0 left-0 w-full h-full bg-white z-50 p-10' : ''}`}
                    >
                        <div className='flex justify-between'>
                            <h2 className="text-2xl mb-4">CSV</h2>
                            <div>
                                <Button
                                    type="default"
                                    className='text-gray-500 hover:bg-gray-100 font-bold'
                                    onClick={handleDownloadCSV}
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

                        <Table
                            columns={tableData.columns}
                            dataSource={tableData.rows}
                            scroll={{
                                x: 400,
                                y: fullScreen ? "calc(100vh - 200px)" : undefined
                            }}
                            bordered
                            size='large'
                            pagination={{ pageSize: 10 }}
                        />
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

