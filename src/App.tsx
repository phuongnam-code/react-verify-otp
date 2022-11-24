import { useState, useMemo, useRef } from 'react';
import reactLogo from '@/assets/image/SVG/react.svg';
import viteLogo from '@/assets/image/SVG/vite.svg';
import pnpmLogo from '@/assets/image/SVG/pnpm.svg';
import '@/assets/css/App.css';
import OtpInput from '@/components/OtpInput';
import { classNames } from '@/utils';
import Checkbox from '@/components/Checkbox';

const App = () => {
  const otpRef = useRef<any>(null);

  const [otp, setOtp] = useState('');
  const [state, setState] = useState({
    placeholder: false,
    isInputSecure: false,
    autoFocus: true,
    isDisabled: false,
    isError: true,
    isInputNumber: true,
    separator: true,
  });

  const handleChangeOtp = (value: string) => {
    setOtp(value);
  };

  const handleChangeCheckbox = (name: string, checked: boolean) => {
    setState({
      ...state,
      [name]: checked,
    });
  };

  const handleClearOtp = () => {
    otpRef?.current?.clearOtp();
  };

  const message = useMemo(() => {
    if (otp.trim().length === 4) return otp === '1111' ? 'correct' : 'wrong';
    return '';
  }, [otp]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://pnpm.io" target="_blank" rel="noopener">
          <img src={pnpmLogo} className="logo pnpm" alt="PNPM logo" />
        </a>
      </div>

      <h1>Demo react verify OTP</h1>

      <p className="result">
        OTP entered: (<span>{otp}</span>)
      </p>

      <OtpInput
        ref={otpRef}
        otpValue={otp}
        isError={state.isError && otp.trim().length === 4 && otp.trim() !== '1111'}
        isInputSecure={state.isInputSecure}
        placeholder={state.placeholder ? '1111' : ''}
        isInputNumber={state.isInputNumber}
        autoFocus={state.autoFocus}
        separator={state.separator && '♦'}
        isDisabled={state.isDisabled}
        onChange={handleChangeOtp}
      />

      <div className="btn">
        <button type="button" onClick={handleClearOtp}>
          Clear OTP
        </button>
      </div>

      <div className="check">
        <div className="list-checkbox">
          <Checkbox
            label="placeholder"
            checked={state.placeholder}
            onChange={(checked) => handleChangeCheckbox('placeholder', checked)}
          />
          <Checkbox
            label="isInputSecure"
            checked={state.isInputSecure}
            onChange={(checked) => handleChangeCheckbox('isInputSecure', checked)}
          />
          <Checkbox label="autoFocus" checked={state.autoFocus} onChange={(checked) => handleChangeCheckbox('autoFocus', checked)} />
          <Checkbox
            label="isDisabled"
            checked={state.isDisabled}
            onChange={(checked) => handleChangeCheckbox('isDisabled', checked)}
          />
          <Checkbox label="isError" checked={state.isError} onChange={(checked) => handleChangeCheckbox('isError', checked)} />
          <Checkbox
            label="isInputNumber"
            checked={state.isInputNumber}
            onChange={(checked) => handleChangeCheckbox('isInputNumber', checked)}
          />
          <Checkbox label="separator" checked={state.separator} onChange={(checked) => handleChangeCheckbox('separator', checked)} />
        </div>
        <div className="message-text">
          <p>valid OTP is: 1111</p>
          <p>-</p>
          <p>Status: {message ? <span className={classNames(otp.trim() !== '1111' ? 'error' : 'success')}>{message}</span> : '...'}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
