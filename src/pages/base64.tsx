import React, { useState } from 'react';
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

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputText(e.target.value);
  };

  const handleSourceCharacterSetChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSourceCharacterSet(e.target.value);
  };

  const handleDecodeEachLineChange = () => {
    setDecodeEachLine((prevValue) => !prevValue);
  };

  return (
    <BaseLayout title="Base Tool">
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>
        Base64 Encoder/Decoder
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <textarea
            style={{ width: '100%', minHeight: '100px', padding: '10px', resize: 'vertical' }}
            placeholder="Enter your text..."
            value={inputText}
            onChange={handleInputChange}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label htmlFor="sourceCharacterSet">Source character set:</label>
            <select
              id="sourceCharacterSet"
              value={sourceCharacterSet}
              onChange={handleSourceCharacterSetChange}
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
              {/* Add more character sets here */}
            </select>
            <label htmlFor="decodeEachLine">
              <input
                id="decodeEachLine"
                type="checkbox"
                checked={decodeEachLine}
                onChange={handleDecodeEachLineChange}
              />
              Decode each line separately
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={handleEncode}
            >
              Encode
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={handleDecode}
            >
              Decode
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '10px' }}>Encoded Text:</h3>
            <textarea
              style={{ width: '100%', minHeight: '100px', padding: '10px', resize: 'vertical' }}
              value={encodedText}
              readOnly
            />
          </div>
          <div style={{ flex: 1, marginLeft: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>Decoded Text:</h3>
            <textarea
              style={{ width: '100%', minHeight: '100px', padding: '10px', resize: 'vertical' }}
              value={decodedText}
              readOnly
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h3>Decode files from Base64 format</h3>
        <input type="file" accept="image/*, .pdf, .doc, .docx" />
        <p>The maximum file size is 192MB.</p>
        <p>Do not execute decoded files originated from untrusted sources.</p>
        <label htmlFor="decodeEachLineFiles">
          <input
            id="decodeEachLineFiles"
            type="checkbox"
            checked={decodeEachLine}
            onChange={handleDecodeEachLineChange}
          />
          Decode each line separately (useful for when you have multiple entries)
        </label>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          DECODE
        </button>
      </div>
    </div>
    </BaseLayout>
  );
}
