import "./LogoutLink.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/credentials";
import { useUserInfoStore } from "../../store/userData";

export const LogoutLink = () => {
  const logout = useAuthStore((state) => state.logout);
  const resetUser = useUserInfoStore((state) => state.resetUser);
  const navigate = useNavigate();

  const logoutMe = () => {
    logout();
    resetUser();
    navigate("/");
  };

  return (
    <div className="logoutDesign" onClick={logoutMe}>
      Logout
    </div>
  );
};
