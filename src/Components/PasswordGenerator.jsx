import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toPng } from 'html-to-image';

const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';
const symbolsList = "!@#$%^&*()?";

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [passwordLength, setPasswordLength] = useState(8);
  const [inputText, setInputText] = useState(''); // নতুন স্টেট যুক্ত করা হলো
  
  const passwordRef = useRef(null);
  useEffect(() => {
    generatePassword();
  }, [passwordLength, lowerCase, upperCase, numbers, symbols]);

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

  const generatePassword = () => {
    let characterList = '';

    if (lowerCase) characterList += lowercaseList;
    if (upperCase) characterList += uppercaseList;
    if (numbers) characterList += numbersList;
    if (symbols) characterList += symbolsList;

    let tempPassword = '';
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      tempPassword += characterList.charAt(characterIndex);
    }

    setPassword(tempPassword);
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <div className='container'>
        <h2 className='title'>Strong Password Generator</h2>
        <div className="password-wrapper">
          <div className="password-area">
            <div className="password">
              <div ref={passwordRef} style={{ padding: '10px', background: 'white', display: 'inline-block', margin: '10px 0' }}>
                {password}
              <br /> <hr />
                {inputText}
         
       
              </div>
            
              <button onClick={copyPassword}>Copy</button>
            </div>
          </div>
        </div>
        <div className="setting">
          <h3>Customize your password</h3>
          <div className="customize">
            <div className="checkbox-field">
              <input type="checkbox" checked={lowerCase} onChange={() => setLowerCase(!lowerCase)} />
              <label>Include LowerCase (a-z)</label>
            </div>
            <div className="checkbox-field">
              <input type="checkbox" checked={upperCase} onChange={() => setUpperCase(!upperCase)} />
              <label>Include UpperCase (A-Z)</label>
            </div>
            <div className="checkbox-field">
              <input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} />
              <label>Include Numbers (0-9)</label>
            </div>
            <div className="checkbox-field">
              <input type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} />
              <label>Include Symbols (!@#$%^&*()?)</label>
            </div>
          </div>
        </div>
        <div className="password-length">
          <h3>Password Length</h3>
          <div className="slider">
            <p className="rangeValue">{passwordLength}</p>
            <div className="range">
              <input type="range" min={6} max={40} value={passwordLength} onChange={(event) => setPasswordLength(event.currentTarget.value)} />
            </div>
          </div>
        </div>
        <div className="input-text-field">

          <input
            type="text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="Why do you want to save  password for ?"
          />
        </div>
        <div className="buttons">
          <button onClick={generatePassword}>Generate Password</button>
          <button onClick={savePasswordAsImage}>Download</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PasswordGenerator;