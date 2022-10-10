interface IButtonProps {
  className: string;
  type: "submit" | "button";
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const MyButton = ({ className, type, text, onClick }: IButtonProps) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {text}
    </button>
  );
};
