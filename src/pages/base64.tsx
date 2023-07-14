import React, { useState } from 'react';
import Link from 'next/link';
import BaseLayout from '@/components/Layout';
import { Card, Input, Button } from 'antd';

export default function Base64() {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleEncode = () => {
    const encoded = btoa(inputText);
    setEncodedText(encoded);
  };

  const handleDecode = () => {
    const decoded = atob(inputText);
    setDecodedText(decoded);
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputText(e.target.value);
  };

  return (
    <BaseLayout title="Base64 Encoder/Decoder">
      <div className="">
        <h1 className="text-2xl mb-4 text-center">Base64 Encoder/Decoder</h1>
        <hr className="mb-4" />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card title="Encode" className="cursor-pointer">
            <Input.TextArea rows={4} value={inputText} onChange={handleInputChange} />
            <Button type="primary" onClick={handleEncode}>
              Encode
            </Button>
            <Input.TextArea rows={4} value={encodedText} disabled />
          </Card>

          <Card title="Decode" className="cursor-pointer">
            <Input.TextArea rows={4} value={inputText} onChange={handleInputChange} />
            <Button type="primary" onClick={handleDecode}>
              Decode
            </Button>
            <Input.TextArea rows={4} value={decodedText} disabled />
          </Card>
        </div>
      </div>
    </BaseLayout>
  );
}
