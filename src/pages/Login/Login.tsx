import { useEffect, useState } from "react";
import "./Login.css";
import { LoginData } from "../../interfaces/interfaces";
import { LogUser } from "../../services/ApiCalls";
import { MyInput } from "../../common/MyInput/MyInput";
import { decodeToken } from "react-jwt";
import { useAuthStore } from "../../store/credentials";
import { MyButton } from "../../common/MyButton/MyButton";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const { setToken } = useAuthStore();
  const { setFirstName } = useAuthStore();
  const { setProfilePhoto } = useAuthStore();
  const { setSchoolId } = useAuthStore();
  const { setRoles } = useAuthStore();
  const { setSchoolLogo } = useAuthStore();
  const { token } = useAuthStore();
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

    setToken(fetched.token);
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "firstName" in decoded &&
      typeof decoded.firstName === "string"
    ) {
      setFirstName(decoded.firstName);
    }
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "profilePhoto" in decoded &&
      typeof decoded.profilePhoto === "string"
    ) {
      setProfilePhoto(`http://localhost:4000${decoded.profilePhoto}`);
    }
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "schoolId" in decoded &&
      typeof decoded.schoolId === "number"
    ) {
      setSchoolId(decoded.schoolId);
    }
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "roles" in decoded &&
      Array.isArray(decoded.roles)
    ) {
      setRoles(decoded.roles);
    }
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "schoolLogo" in decoded &&
      typeof decoded.schoolLogo === "string"
    ) {
      setSchoolLogo(`http://localhost:4000${decoded.schoolLogo}`);
    }

    navigate("/home");

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
