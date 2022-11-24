# react-verify-otp

Description: react-verify-otp a fully customizable, one-time password input component for the web built with React.

![see here](https://raw.githubusercontent.com/phuongnam-code/shared/master/image/any-jpg-png-etc/react-verify-otp.PNG)

[Demo](https://react-verify-otp.vercel.app/)

## Installation

#### To install the latest stable version:

```
npm install react-verify-otp
```
```
yarn add react-verify-otp
```
```
pnpm install react-verify-otp
```

## Basic Use

```jsx
import { useState, useRef } from 'react';
import OtpInput from 'react-verify-otp';

const App = () => {
  const otpRef = useRef(null);
  const [otp, setOtp] = useState('');

  const handleChangeOtp = (otp) => {
    setOtp(otp)
  };

  // use "otpRef?.current?.[method_name];"
  // example: otpRef?.current?.clearOtp();
  // used to call some methods defined in this library

  return (
    <OtpInput
      ref={otpRef}
      otpValue={otp}
      onChange={handleChangeOtp}
      separator={'♦'}
    />
  );
};

export default App
```

## API

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>otpValue</td>
    <td>string</td>
    <td><strong>true</strong></td>
    <td>''</td>
    <td>The value of the OTP.</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>function</td>
    <td><strong>true</strong></td>
    <td>-</td>
    <td>Method change OTP code.</td>
  </tr>
  <tr>
    <td>numberInputs</td>
    <td>number</td>
    <td>false</td>
    <td>4</td>
    <td>Number of OTP inputs to be rendered.</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>string</td>
    <td>false</td>
    <td>''</td>
    <td>Suggest value of each input. The length of this string should be equal to <code>numberInputs</code>.
    </td>
  </tr>
  <tr>
    <td>separator</td>
    <td>any</td>
    <td>false</td>
    <td>null</td>
    <td>Provide a custom separator between inputs by passing a component, string, number or symbols etc.
    For example:
      <code>&lt;&gt;♦&lt;/&gt;</code>,
      <code>&lt;span&gt;♦&lt;/span&gt;</code>
    etc.
    </td>
  </tr>
  <tr>
    <td>autoFocus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Autofocus input on initial page load.</td>
  </tr>
  <tr>
    <td>isDisabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Disables all the inputs.</td>
  </tr>
  <tr>
    <td>isError</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Indicates there is an error in the inputs.</td>
  </tr>
  <tr>
    <td>isInputNumber</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Only numbers enter.</td>
  </tr>
  <tr>
    <td>isInputSecure</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Masks input characters.</td>
  </tr>
  <tr>
    <td>styleOtpWrapper</td>
    <td>string</td>
    <td>false</td>
    <td>none</td>
    <td>Style passed to container of inputs.</td>
  </tr>
  <tr>
    <td>styleOtpInput</td>
    <td>string</td>
    <td>false</td>
    <td>none</td>
    <td>Style passed to each input.</td>
  </tr>
</table>

## Use ref

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>ref</td>
    <td>any</td>
    <td>false</td>
    <td>null</td>
    <td>Used to access available methods.</td>
  </tr>
  <tr>
    <td>clearOtp</td>
    <td>function</td>
    <td>-</td>
    <td>-</td>
    <td>Clear the value OTP present.</td>
  </tr>
  <tr>
    <td>getInputOtpRef</td>
    <td>function</td>
    <td>-</td>
    <td>-</td>
    <td>Access to each inputs.</td>
  </tr>
  <tr>
    <td>getOtpValue</td>
    <td>function</td>
    <td>-</td>
    <td>-</td>
    <td>Get the value of the OTP.</td>
  </tr>
</table>

## Changelog
### v1:
* **v1.0.0** - The first, create and build project push to github, fix deploy to vercel, publish to npm package management.
* **v1.1.0** - Add description to package.json, show info to npm package management (keywords, author, license, homepage, repository).
* **v1.1.1** - Fix error import package when use reality (but do not success :(().
* **v1.1.2** - I'm trying fix error import package when use reality.
