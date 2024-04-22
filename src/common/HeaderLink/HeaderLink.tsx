import "./HeaderLink.css";
import { useNavigate } from "react-router-dom";

export const HeaderLink = ({ title, destination }: HeaderLinkProps) => {
  const navigate = useNavigate();

  return (
    <div
      data-name={title}
      className="headerLinkDesign"
      onClick={() => navigate(destination)}
    >
      {title}
    </div>
  );
};
