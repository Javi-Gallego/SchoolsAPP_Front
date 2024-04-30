import { useEffect, useState } from "react";
import "./Login.css";
import { LoginData, decoded } from "../../interfaces/interfaces";
import { LogUser } from "../../services/ApiCalls";
import { MyInput } from "../../common/MyInput/MyInput";
import { decodeToken } from "react-jwt";
import { useAuthStore } from "../../store/credentials";
import { useUserInfoStore } from "../../store/userData";
import { MyButton } from "../../common/MyButton/MyButton";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const rootURL = "http://localhost:4000";
  const { setToken } = useAuthStore();
  const { setId } = useAuthStore();
  const { setFirstName } = useAuthStore();
  const { setProfilePhoto } = useAuthStore();
  const { setSchoolId } = useAuthStore();
  const { setRoles } = useAuthStore();
  const { setSchoolLogo } = useAuthStore();
  const { setChildren } = useAuthStore();
  const { token } = useAuthStore();
  const { setUserId } = useUserInfoStore();
  const { setUserFirstName } = useUserInfoStore();
  const { setUserRoleName } = useUserInfoStore();
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
  
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const logMe = async (): Promise<void> => {
    const fetched = await LogUser(credentials);

    const decoded = decodeToken(fetched.token);
    console.log(decoded);
    setToken(fetched.token);
    
    // if (
    //   typeof decoded === "object" &&
    //   decoded !== null &&
    //   "firstName" in decoded &&
    //   typeof decoded.firstName === "string"
    // ) {
    //   setFirstName(decoded.firstName);
    // }
    // if (
    //   typeof decoded === "object" &&
    //   decoded !== null &&
    //   "profilePhoto" in decoded &&
    //   typeof decoded.profilePhoto === "string"
    // ) {
    //   setProfilePhoto(`http://localhost:4000${decoded.profilePhoto}`);
    // }
    // if (
    //   typeof decoded === "object" &&
    //   decoded !== null &&
    //   "schoolId" in decoded &&
    //   typeof decoded.schoolId === "number"
    // ) {
    //   setSchoolId(decoded.schoolId);
    // }
    // if (
    //   typeof decoded === "object" &&
    //   decoded !== null &&
    //   "roles" in decoded &&
    //   Array.isArray(decoded.roles)
    // ) {
    //   setRoles(decoded.roles);
    // }
    // if (
    //   typeof decoded === "object" &&
    //   decoded !== null &&
    //   "schoolLogo" in decoded &&
    //   typeof decoded.schoolLogo === "string"
    // ) {
    //   setSchoolLogo(`http://localhost:4000${decoded.schoolLogo}`);
    // }
    // if (
    //   typeof decoded === "object" &&
    //   decoded !== null &&
    //   "children" in decoded &&
    //   Array.isArray(decoded.children)
    // ) {
    //   setChildren(decoded.children);
    // }
    
    if(typeof decoded === "object" &&
    decoded !== null){
      if (
        "userId" in decoded &&
        typeof decoded.userId === "number"
      ) {
        setId(decoded.userId);
      }
      if (
        "firstName" in decoded &&
        typeof decoded.firstName === "string"
      ) {
        setFirstName(decoded.firstName);
      }
      if (
        "profilePhoto" in decoded &&
        typeof decoded.profilePhoto === "string"
      ) {
        setProfilePhoto(`${rootURL}${decoded.profilePhoto}`);
      }
      if (
        "schoolId" in decoded &&
        typeof decoded.schoolId === "number"
      ) {
        setSchoolId(decoded.schoolId);
      }
      if (
        "roles" in decoded &&
        Array.isArray(decoded.roles)
      ) {
        setRoles(decoded.roles);
        if(decoded.roles.every((role) => typeof role === 'string')){
          if (decoded.roles.includes("super_admin") ||
            decoded.roles.includes("admin") ||
            decoded.roles.includes("teacher") ||
            decoded.roles.includes("personal")) {
              if (
                "userId" in decoded &&
                typeof decoded.userId === "number"
              ) {
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
              typeof decoded.firstName === "string") {
                setUserId(decoded.userId);
                setUserFirstName(decoded.firstName);
                setUserRoleName("student");
          }  
          else if(
              decoded.roles.includes("parent") &&
              "children" in decoded &&
              Array.isArray(decoded.children)){
                setUserId(decoded.children[0].id);
                setUserFirstName(decoded.children[0].firstName);
                setUserRoleName("parent");
          }
        }
      }
      if (
        "schoolLogo" in decoded &&
        typeof decoded.schoolLogo === "string"
      ) {
        setSchoolLogo(`${rootURL}${decoded.schoolLogo}`);
      }
      if (
        "children" in decoded &&
        Array.isArray(decoded.children)
      ) {
        setChildren(decoded.children);
      }
    }

    if(token !== ""){
      navigate("/home");
    }

  };

  return (
    <div className="loginDesign">
      <MyInput
        type={"email"}
        name={"email"}
        value={credentials.email || ""}
        placeholder={""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={"authInputDesign marginTopBottom"}
      />
      <MyInput
        type={"password"}
        name={"password"}
        value={credentials.password || ""}
        placeholder={""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={"authInputDesign marginTopBottom"}
      />
      <MyButton
        text="Login"
        onClickFunction={logMe}
        className="authButtonDesign marginTopBottom"
      />
    </div>
  );
};
