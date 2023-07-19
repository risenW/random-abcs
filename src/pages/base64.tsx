import { useState } from 'react';
import { 
  Button, 
  Input, 
  Checkbox, 
  Card } from 'antd';
import BaseLayout from '@/components/Layout';

  export default function Base64() {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [sourceCharacterSet, setSourceCharacterSet] = useState('UTF-8');
  const [decodeEachLine, setDecodeEachLine] = useState(false);

  const handleEncode = () => {
    const encoded = Buffer.from(inputText).toString('base64');
    setEncodedText(encoded);
  };

  const handleDecode = () => {
    const decoded = Buffer.from(inputText, 'base64').toString('utf-8');
    setDecodedText(decoded);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSourceCharacterSetChange = (e) => {
    setSourceCharacterSet(e.target.value);
  };

  const handleDecodeEachLineChange = () => {
    setDecodeEachLine((prevValue) => !prevValue);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setInputText( content );
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([inputText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `base64-input.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handleFileDecode = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setEncodedText(content);
      handleDecode();
    };
    reader.readAsText(file);
  };

  return (
    <BaseLayout title="Base64 Tool">
      <div>
        <h1 className="text-2xl mb-4 text-center">Base64 Encoder/Decoder</h1>
        <hr className="mb-4" />
        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
          <Card className="shadow-sm border-2 border-gray-200 lg:col-span-2">
            <div>
              <h2 className="text-2xl mb-4">Raw Text</h2>
              <hr className="mb-4" />
            </div>
            <Input.TextArea
              rows={10}
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter your text..."
              className="pt-4"
              bordered={false}
            />
          </Card>

          <div className="flex flex-col">
            <h2 className="text-lg mt-10 font-semibold">Display Settings</h2>
            <div className="mt-5">
              <label htmlFor="sourceCharacterSet" className="text-base font-medium">
                Source character set:
              </label>
              <select
                id="sourceCharacterSet"
                value={sourceCharacterSet}
                onChange={handleSourceCharacterSetChange}
                className="mt-2 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="UTF-8">UTF-8</option>
                <option value="ASCII">ASCII</option>
                <option value="ISO-8859-1">ISO-8859-1</option>
                <option value="ISO-8859-2">ISO-8859-2</option>
                <option value="Shift_JIS">Shift_JIS</option>
                <option value="EUC-JP">EUC-JP</option>
                <option value="ISO-2022-JP">ISO-2022-JP</option>
                <option value="ISO-8859-5">ISO-8859-5</option>
                <option value="KOI8-R">KOI8-R</option>
              </select>
            </div>
            <div className="mt-3">
              <Checkbox
                id="decodeEachLine"
                checked={decodeEachLine}
                onChange={handleDecodeEachLineChange}
              >
                Decode each line separately
              </Checkbox>
            </div>
            <Button
              type="primary"
              onClick={handleEncode}
              className="text-white hover:bg-gray-100 font-bold mt-4 bg-blue-600"
            >
              Encode
            </Button>
            <Button
              type="primary"
              onClick={handleDecode}
              className="text-white hover:bg-gray-100 font-bold mt-2 bg-blue-600"
            >
              Decode
            </Button>
            <div className="mt-4">
              <label htmlFor="fileUpload" className="text-base font-medium">
                Upload file:
              </label>
              <input
                type="file"
                id="fileUpload"
                accept=".txt"
                onChange={handleFileUpload}
                className="mt-2 block"
              />
            </div>
  
            <div style={{ marginTop: '40px' }}>
            <h3 className="font-bold text-left">Decode files from Base64 format</h3>
            <input
              type="file"
              accept="image/*, .pdf, .doc, .docx"
              onChange={handleFileDecode}
              className="mt-2"
            />
            <p className="italic">The maximum file size is 192MB.</p>
          </div>
          </div>

          <div className="w-full col-span-2">
            <Card className="shadow-lg border-2 border-gray-200">
              <div>
                <h2 className="text-2xl mb-4">Encoded/Decoded Text</h2>
                <hr className="mb-4" />
              </div>
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <h3 className="text-lg mb-2">Encoded Text:</h3>
                  <Input.TextArea
                    rows={10}
                    value={encodedText}
                    placeholder='Results goes here...'
                    readOnly
                    className="resize-vertical"
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <h3 className="text-lg mb-2">Decoded Text:</h3>
                  <Input.TextArea
                    rows={10}
                    value={decodedText}
                    placeholder='Results goes here...'
                    readOnly
                    className="resize-vertical"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}