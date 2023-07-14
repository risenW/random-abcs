import React, { useState } from 'react';
import BaseLayout from '@/components/Layout';
import { Card, Input, Button } from 'antd';

export default function JsonValidator() {
  const [jsonText, setJsonText] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateJson = () => {
    try {
      JSON.parse(jsonText);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setJsonText(e.target.value);
  };

  return (
    <BaseLayout title="JSON Validator">
      <div className="">
        <h1 className="text-2xl mb-4 text-center">JSON Validator</h1>
        <hr className="mb-4" />
        <Card title="JSON" className="cursor-pointer">
          <Input.TextArea rows={4} value={jsonText} onChange={handleInputChange} />
          <Button type="primary" onClick={validateJson}>
            Validate
          </Button>
        </Card>
        <Card title="Result" className="cursor-pointer mt-4">
          <p>{isValid ? 'Valid JSON' : 'Invalid JSON'}</p>
        </Card>
      </div>
    </BaseLayout>
  );
}
