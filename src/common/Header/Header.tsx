import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/credentials";
import { MyDropDown } from "../MyDropDown/MyDropDown";
import "./Header.css";

export function Header() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const schoolLogo = useAuthStore((state) => state.schoolLogo);

  return (
    <div className="headerDesign">
      {token !== "" 
      ? 
        <>
          <div className="sideLogo">
            <MyDropDown /> 
          </div>
          <div className="headerLogo" onClick={() => navigate("/home")}>
            <img src={schoolLogo} alt="Logo"></img>
          </div>
          <div className="sideLogo">
          </div>
        </>
      : 
        <></>
      }
    </div>
  );
}
