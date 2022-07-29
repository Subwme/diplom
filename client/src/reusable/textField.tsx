import React from "react";

interface ITextFieldProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  classNamme: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({
  label,
  type,
  name,
  value,
  classNamme,
  onChange,
}: ITextFieldProps) => {
  return (
    <div className="auth-area">
      <label className="auth-label" htmlFor={name}>{label}</label>
      <input
        className={classNamme}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default TextField;
