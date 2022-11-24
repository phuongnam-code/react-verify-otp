import React, { FC, Fragment, ReactNode, useMemo, useRef, createRef, forwardRef, useImperativeHandle } from 'react';
import { REGEX, KEYBOARD_CODE } from '@/constants/common.const';
import styles from './optInputStyle.module.css';
import { classNames } from '@/utils';

type OtpInputProps = {
  ref?: any;
  otpValue: string;
  numberInputs?: number;
  placeholder?: string;
  styleOtpWrapper?: string;
  styleOtpInput?: string;
  autoFocus?: boolean;
  isError?: boolean;
  isDisabled?: boolean;
  isInputSecure?: boolean;
  isInputNumber?: boolean;
  separator?: ReactNode;
  onChange: (value: string) => void;
  onBlur?: () => void; // example handle call AJAX, logic ...
};

const { BACKSPACE_CODE, ARROW_LEFT_CODE, ARROW_UP_CODE, ARROW_RIGHT_CODE, ARROW_DOWN_CODE, SPACE_CODE } = KEYBOARD_CODE;

const index: FC<OtpInputProps> = forwardRef((props, ref) => {
  const {
    otpValue = '',
    numberInputs = 4,
    placeholder = '',
    styleOtpWrapper = '',
    styleOtpInput = '',
    autoFocus = false,
    isError = false,
    isDisabled = false,
    isInputSecure = false,
    isInputNumber = false,
    separator = null,
    onChange,
    onBlur,
  } = props;

  const inputsRef = useRef<any>(Array.from({ length: numberInputs }, () => createRef()));

  const isValidValue = (value: string) => REGEX[isInputNumber ? 'DIGIT_REGEX' : 'ALPHANUMERIC_REGEX'].test(value);

  const getPlaceholderValue = (index: number) => {
    if (placeholder.length < numberInputs) {
      console.error('Length of the placeholder should be equal to the number of inputs.');
      return '';
    }
    return placeholder[index];
  };

  // get ref input
  const getInputOtpRef = (index: number) => {
    if (!!!index) return null;
    return inputsRef.current[index].current;
  };

  const clearOtp = () => {
    onChange('');
  };

  const getOtpValue = () => {
    return inputOtpValues.join('');
  };

  const replaceAt = (index: number, replaceStr: string) => {
    const initString = otpValue || ' '.repeat(numberInputs);
    return initString.substring(0, index) + replaceStr + initString.substring(index + 1);
  };

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { target } = event;
    let valueChange: string = target.value;
    const isValid: boolean = isValidValue(valueChange);

    if (!isValid && valueChange !== '') return;

    valueChange = isValid ? valueChange : ' ';
    const newValue = replaceAt(index, valueChange);
    onChange(replaceAt(index, valueChange));

    if (!isValid) return;

    if (newValue.length === numberInputs) {
      target.blur();
      onBlur?.();
    }

    focusToNextInput(target);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { code, target } = event;
    const value = target.value;

    // keep the selection range position if the value doesn't change
    target.select();

    if (code === ARROW_LEFT_CODE || code === ARROW_UP_CODE) {
      event.preventDefault();
      return focusToPrevInput(target);
    }

    if (code === ARROW_RIGHT_CODE || code === ARROW_DOWN_CODE) {
      event.preventDefault();
      return focusToNextInput(target);
    }

    if (code === SPACE_CODE) {
      event.preventDefault();
    }

    if (code !== BACKSPACE_CODE || value !== '') {
      return;
    }

    focusToPrevInput(target);
  };

  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const { target } = event;
    target.select();
  };

  const handleOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    event.preventDefault();

    const pastedData = event.clipboardData.getData('text/plain');
    onChange(pastedData.slice(0, numberInputs));
  };

  const inputOtpValues = useMemo(() => {
    if (!!!otpValue) return new Array(numberInputs).fill('');
    return otpValue.split('');
  }, [otpValue]);

  useImperativeHandle(ref, () => ({
    clearOtp,
    getInputOtpRef,
    getOtpValue,
  }));

  return (
    <div className={classNames(styles['otp-wrapper'], styleOtpWrapper)}>
      {inputOtpValues.map((otp, index) => (
        <Fragment key={index}>
          <input
            id={`otp-input-field-` + index}
            ref={inputsRef.current[index]}
            autoComplete="off"
            type={isInputSecure ? 'password' : 'text'}
            autoFocus={autoFocus && index === 0}
            value={otp === ' ' ? '' : otp}
            disabled={isDisabled}
            maxLength={1}
            className={classNames(styles['otp-input-field'], isError ? styles['otp-input-field-error'] : '', styleOtpInput)}
            placeholder={placeholder && getPlaceholderValue(index)}
            onChange={(event) => handleOnChange(event, index)}
            onKeyDown={handleOnKeyDown}
            onFocus={handleOnFocus}
            onPaste={handleOnPaste}
          />
          {index !== inputOtpValues.length - 1 && separator}
        </Fragment>
      ))}
    </div>
  );
});

export default index;
