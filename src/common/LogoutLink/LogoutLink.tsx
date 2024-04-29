import "./LogoutLink.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/credentials";

export const LogoutLink = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const logoutMe = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="logoutDesign" onClick={logoutMe}>
      Logout
    </div>
  );
};
