import "./MyDropDown.css";
import { useState } from "react";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import { useAuthStore } from "../../store/credentials";
import { LogoutLink } from "../LogoutLink/LogoutLink";

export const MyDropDown = () => {
  const profilePhoto = useAuthStore((state) => state.profilePhoto);
  const children = useAuthStore((state) => state.children);
  const [myDropdown, setMyDropdown] = useState(false);

  const toggleDropDown = () => {
    setMyDropdown(!myDropdown);
  };
  
  const selectChild = (child: any) => {};

  return (
    <div className="dropDown" onClick={toggleDropDown}>
      <div className="headerPhotoProfile" onClick={toggleDropDown}>
        <img src={profilePhoto} alt="Profile photo"></img>
      </div>
      <div
        id="myDropdown"
        className={myDropdown ? "dropDownContent show" : "dropDownContent"}
      >
        {children.length > 0 &&
          children.map((child, index) => (
            <div key={`child${index}`} onClick={() => selectChild(child)}>
              {child.firstName} {child.lastName} {child.secondLastName}
            </div>
          ))
        }
        <HeaderLink title="Perfil" destination="/profile" />
        <LogoutLink />
      </div>
    </div>
  );
};
