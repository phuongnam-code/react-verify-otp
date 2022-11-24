import React from 'react';

declare class OtpInput extends React.Component<OtpInputProps> {
  static defaultProps: {
    otpValue: string;
    numberInputs: number;
    isDisabled: boolean;
    isError: boolean;
    autoFocus: boolean;
    onChange: (value: string) => void;
  };
}

interface OtpInputProps {
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
  separator?: React.ReactNode;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export { OtpInputProps };
export default OtpInput;
