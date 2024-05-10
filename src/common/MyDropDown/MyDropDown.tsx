import "./MyDropDown.css";
import { useState } from "react";
import { HeaderLink } from "../HeaderLink/HeaderLink";
import { useAuthStore } from "../../store/credentials";
import { LogoutLink } from "../LogoutLink/LogoutLink";
import { useUserInfoStore } from "../../store/userData";

export const MyDropDown = () => {
  const profilePhoto = useAuthStore((state) => state.profilePhoto);
  const firstName = useAuthStore((state) => state.firstName);
  const children = useAuthStore((state) => state.children);
  const courses = useAuthStore((state) => state.courses);
  const roles = useAuthStore((state) => state.roles);
  const setUserCourseId = useUserInfoStore((state) => state.setUserCourseId);
  const setUserStageId = useUserInfoStore((state) => state.setUserStageId);
  const deleteCourseStage = useUserInfoStore((state) => state.deleteCourseStage);
  const [activeUser, setActiveUser] = useState(1000);
  const [contUser] = useState(0);
  const [myDropdown, setMyDropdown] = useState(false);

  const toggleDropDown = () => {
    setMyDropdown(!myDropdown);
  };

  const selectChild = (index: number) => {
    setActiveUser(index);
    if (setUserCourseId && setUserStageId) {
      setUserCourseId(courses[index].id);
      setUserStageId(courses[index].stageId);
    }
  };

  const selectParent = () => {
    setActiveUser(contUser);
    deleteCourseStage();
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
            <div
              key={`child${index}`}
              className={`headerLinkDesign ${activeUser === index ? "active" : ""}`}
              onClick={() => selectChild(index)}
            >
              {child.firstName} {child.lastName} {child.secondLastName}
            </div>
          ),
          )}
        {roles.includes("parent") && roles.length > 1 && (
          <>
            <div
              className={`headerLinkDesign ${activeUser === contUser ? "active" : ""}`}
              onClick={() => selectParent()}
            >
              Perfil propio de {firstName}
            </div>
          </>
        )}
        <HeaderLink title="Perfil" destination="/profile" />
        <LogoutLink />
      </div>
    </div>
  );
};
