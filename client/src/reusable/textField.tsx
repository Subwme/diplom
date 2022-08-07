import React from "react";

interface ITextFieldProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  classNamme: string;
  errors?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({
  label,
  type,
  name,
  value,
  classNamme,
  errors,
  onChange,
}: ITextFieldProps) => {
  console.log(errors);

  return (
    <div className="auth-area">
      <label className="auth-label" htmlFor={name}>
        {label}
      </label>
      <input
        className={classNamme}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      <p className="auth-text-error">{errors ? errors : false}</p>
    </div>
  );
};
export default TextField;
