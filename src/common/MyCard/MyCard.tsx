import { useNavigate } from "react-router-dom";
import { MyCardProps } from "../../interfaces/interfaces";
import "./MyCard.css";

export const MyCard: React.FC<MyCardProps> = ({ image, title, url }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <div className="myCardDesign" onClick={handleClick}>
      <div className="imageCard">
        <div className="imageCardDesign">
          {image}
        </div>
      </div>
      <div className="titleCard">
        {title}
      </div>
    </div>
  );
};
