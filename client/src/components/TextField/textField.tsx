import React from "react";
import "./TextField.css";

interface ITextFieldProps {
  label: string;
  type: string;
  name: string;
  placeHolder: string;
  value?: string;
  classNamme: string;
  errors?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
  label,
  type,
  name,
  placeHolder,
  value,
  classNamme,
  errors,
  onChange,
}: ITextFieldProps) => {
  return (
    <div className="form__area">
      <label className="form__label" htmlFor={name}>
        {label}
      </label>

      <input
        className={classNamme}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
      />
      <p className="form__text-error">{errors ? errors : false}</p>
    </div>
  );
};
