import "./MyDropDown.css";
import { useState } from "react";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import { useAuthStore } from "../../store/credentials";
import { LogoutLink } from "../LogoutLink/LogoutLink";

export const MyDropDown = () => {
  const profilePhoto = useAuthStore((state) => state.profilePhoto);
  const [myDropdown, setMyDropdown] = useState(false);

  const toggleDropDown = () => {
    setMyDropdown(!myDropdown);
  };

  return (
    <div className="dropDown" onClick={toggleDropDown}>
      <div className="headerPhotoProfile" onClick={toggleDropDown}>
        <img src={profilePhoto} alt="Profile photo"></img>
      </div>
      <div
        id="myDropdown"
        className={myDropdown ? "dropDownContent show" : "dropDownContent"}
      >
        <HeaderLink title="Perfil" destination="/profile" />
        <HeaderLink title="Mis posts" destination="/ownposts" />
        <HeaderLink title="Búsqueda" destination="/search" />
        <LogoutLink />
      </div>
    </div>
  );
};
