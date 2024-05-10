import "./MyDropDown.css";
import { useState } from "react";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import { useAuthStore } from "../../store/credentials";
import { LogoutLink } from "../LogoutLink/LogoutLink";
import { useUserInfoStore } from "../../store/userData";

export const MyDropDown = () => {
  const profilePhoto = useAuthStore((state) => state.profilePhoto);
  const children = useAuthStore((state) => state.children);
  const courses = useAuthStore((state) => state.courses);
  const setUserCourseId = useUserInfoStore((state) => state.setUserCourseId);
  const setUserStageId = useUserInfoStore((state) => state.setUserStageId);
  const [myDropdown, setMyDropdown] = useState(false);

  const toggleDropDown = () => {
    setMyDropdown(!myDropdown);
  };
  
  const selectChild = (child: any, index: number) => {
    if(setUserCourseId && setUserStageId){
      setUserCourseId(courses[index].id);
      setUserStageId(courses[index].stageId);
    }
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
        {children.length > 0 &&
          children.map((child, index) => (
            <div key={`child${index}`} className="childList" onClick={() => selectChild(child, index)}>
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
