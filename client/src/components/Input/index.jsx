import React from "react";
import { CustomInput } from "./input.style";
// export interface Props {
//   value?: String;
//   onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
//   prefix?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
//   suffix?: React.ReactNode | JSX.Element | JSX.Element[] | string | string[];
//   status?: String;
//   showCount?: boolean;
//   maxLength?: number | String;
// }

const Input = (Props) => {
  return <CustomInput {...Props} />;
};

const PaswordInput = (Props) => {
  return <CustomInput.Password {...Props} />;
};

export { Input, PaswordInput };
