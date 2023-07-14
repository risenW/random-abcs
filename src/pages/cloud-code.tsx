import React, { useState } from 'react';
import BaseLayout from '@/components/Layout';
import { Card, Input, Button } from 'antd';

export default function CloudCode() {
  const [cloudCode, setCloudCode] = useState('');
  const [output, setOutput] = useState('');

  const executeCloudCode = () => {
    setOutput(`Executing cloud code: ${cloudCode}`);
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCloudCode(e.target.value);
  };

  return (
    <BaseLayout title="Cloud Code">
      <div className="">
        <h1 className="text-2xl mb-4 text-center">Cloud Code</h1>
        <hr className="mb-4" />
        <Card title="Cloud Code" className="cursor-pointer">
          <Input.TextArea rows={4} value={cloudCode} onChange={handleInputChange} />
          <Button type="primary" onClick={executeCloudCode}>
            Execute
          </Button>
        </Card>
        {output && (
          <Card title="Output" className="cursor-pointer mt-4">
            <Input.TextArea rows={4} value={output} disabled />
          </Card>
        )}
      </div>
    </BaseLayout>
  );
}
