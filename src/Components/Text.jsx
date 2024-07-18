import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  const savePasswordAsImage = () => {
    if (passwordRef.current === null) {
      return;
    }

    toPng(passwordRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'password.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={generatePassword}>Generate Password</button>
      <div ref={passwordRef} style={{ padding: '10px', background: 'white', display: 'inline-block', margin: '10px 0' }}>
        {password}
      </div>
      <button onClick={savePasswordAsImage}>Save as Image</button>
    </div>
  );
};

export default PasswordGenerator;