import { useEffect, useState } from "react";
import "./Login.css";
import { LoginData } from "../../interfaces/interfaces";
import { LogUser, getStudentsCourse } from "../../services/ApiCalls";
import { MyInput } from "../../common/MyInput/MyInput";
import { decodeToken } from "react-jwt";
import { useAuthStore } from "../../store/credentials";
import { useUserInfoStore } from "../../store/userData";
import { MyButton } from "../../common/MyButton/MyButton";
import { useNavigate } from "react-router-dom";
import { SVGAcademicCap } from "../../common/SVGAcademicCap/SVGAcademicCap";

export const Login: React.FC = () => {
  const rootURL = "http://localhost:4000";
  // const rootURL = "https://schoolsapp-production.up.railway.app"
  const { setToken } = useAuthStore();
  const { setId } = useAuthStore();
  const { setFirstName } = useAuthStore();
  const { setProfilePhoto } = useAuthStore();
  const { setSchoolId } = useAuthStore();
  const { setRoles } = useAuthStore();
  const { setSchoolLogo } = useAuthStore();
  const { setChildren } = useAuthStore();
  const setUserInfoCourseId = useUserInfoStore((state) => state.setUserCourseId);
  const setUserInfoStageId = useUserInfoStore((state) => state.setUserStageId);
  const setCourses = useAuthStore((state) => state.setCourses);
  const token = useAuthStore((state) => state.token);
  const resetUser = useUserInfoStore((state) => state.resetUser);
  const setUserId = useUserInfoStore((state) => state.setUserId);
  const setUserStageId = useUserInfoStore((state) => state.setUserStageId);
  const setUserCourseId = useUserInfoStore((state) => state.setUserCourseId);
  const setUserFirstName = useUserInfoStore((state) => state.setUserFirstName);
  const setUserRoleName = useUserInfoStore((state) => state.setUserRoleName);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<LoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token !== "") {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (token !== "") {
      navigate("/home");
    }
  }, [token]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const logMe = async (): Promise<void> => {
    resetUser();
    const fetched = await LogUser(credentials);

    const decoded = decodeToken(fetched.token);

    setToken(fetched.token);

    if (typeof decoded === "object" && decoded !== null) {
      if ("userId" in decoded && typeof decoded.userId === "number") {
        setId(decoded.userId);
      }
      if ("firstName" in decoded && typeof decoded.firstName === "string") {
        setFirstName(decoded.firstName);
      }
      if (
        "profilePhoto" in decoded &&
        typeof decoded.profilePhoto === "string"
      ) {
        setProfilePhoto(`${rootURL}${decoded.profilePhoto}`);
      }
      if ("schoolId" in decoded && typeof decoded.schoolId === "number") {
        setSchoolId(decoded.schoolId);
      }
      if ("roles" in decoded && Array.isArray(decoded.roles)) {
        setRoles(decoded.roles);
        if (decoded.roles.every((role) => typeof role === "string")) {
          if (
            decoded.roles.includes("super_admin") ||
            decoded.roles.includes("admin") ||
            decoded.roles.includes("teacher") ||
            decoded.roles.includes("personal")
          ) {
            if ("userId" in decoded && typeof decoded.userId === "number") {
              setUserId(decoded.userId);
            }
            if (
              "firstName" in decoded &&
              typeof decoded.firstName === "string"
            ) {
              setUserFirstName(decoded.firstName);
            }
            if (
              "roles" in decoded &&
              decoded.roles.length > 1 &&
              decoded.roles[0] === "parent"
            ) {
              setUserRoleName(decoded.roles[1]);
            } else {
              setUserRoleName(decoded.roles[0]);
            }
          } else if (
            decoded.roles.includes("student") &&
            "userId" in decoded &&
            typeof decoded.userId === "number" &&
            "firstName" in decoded &&
            typeof decoded.firstName === "string"
          ) {
            setUserId(decoded.userId);
            setUserFirstName(decoded.firstName);
            setUserRoleName("student");
          } else if (
            decoded.roles.includes("parent") &&
            "children" in decoded &&
            Array.isArray(decoded.children) &&
            "courses" in decoded &&
            Array.isArray(decoded.courses)
          ) {
            setUserId(decoded.children[0].id);
            setUserFirstName(decoded.children[0].firstName);
            setUserRoleName("parent");
            setCourses(decoded.courses);
            if (setUserStageId && setUserCourseId) {
              setUserStageId(decoded.courses[0].stageId);
              setUserCourseId(decoded.courses[0].id);
            }
          }
        }
      }
      if ("schoolLogo" in decoded && typeof decoded.schoolLogo === "string") {
        setSchoolLogo(`${rootURL}${decoded.schoolLogo}`);
      }
      if ("children" in decoded && Array.isArray(decoded.children)) {
        setChildren(decoded.children);
        const child = await getStudentsCourse(fetched.token, decoded.children[0].id);
        if(child.data[0].courseId){
          setUserInfoCourseId(child.data[0].courseId);
          setUserInfoStageId(child.data[0].courseU.stageId);
        }
      }
    }
  };

  return (
    <div className="loginDesign">
      <div className="loginLogo">
        <SVGAcademicCap color="var(--tertiary-color)" />
      </div>
      <div className="loginTitle">Schools APP</div>
      <MyInput
        type={"email"}
        name={"email"}
        value={credentials.email || ""}
        placeholder={""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={"loginInputDesign marginTopBottom"}
      />
      <MyInput
        type={"password"}
        name={"password"}
        value={credentials.password || ""}
        placeholder={""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={"loginInputDesign marginTopBottom"}
      />
      <MyButton
        text="Login"
        onClickFunction={logMe}
        className="button loginButtonDesign marginTopBottom"
      />
    </div>
  );
};
