import { MyButtonProps } from "../../interfaces/interfaces";
import "./MyButton.css";

export const MyButton: React.FC<MyButtonProps> = ({ text, onClickFunction, className }) => {
  return (
    <div onClick={onClickFunction} className={className}>
      {text}
    </div>
  );
};
