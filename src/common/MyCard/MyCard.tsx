import { useNavigate } from "react-router-dom";
import { MyCardProps } from "../../interfaces/interfaces";
import "./MyCard.css";

export const MyCard: React.FC<MyCardProps> = ({
  image,
  title,
  url,
  pendingCount,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(url);
  };

  return (
    <div className="myCardDesign" onClick={handleClick}>
      <div className="imageCard">
        <div className="imageCardDesign">{image}</div>
      </div>
      <div className="titleBar">
        <div className="sideTitleCard"></div>
        <div className="titleCard">
          {title}

        </div>
        <div className="sideTitleCard">
        {pendingCount && pendingCount > 0 && (
            <div className="pendingCountCircle">{pendingCount}</div>
          )}
        </div>
      </div>
    </div>
  );
};
