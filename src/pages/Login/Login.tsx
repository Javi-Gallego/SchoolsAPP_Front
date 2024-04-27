import { useEffect, useState } from "react";
import "./Login.css";
import { LoginData } from "../../interfaces/interfaces";
import { LogUser } from "../../services/ApiCalls";
import { MyInput } from "../../common/MyInput/MyInput";
import { decodeToken } from "react-jwt";
import { useAuthStore } from "../../store/credentials";
import { useUserInfoStore } from "../../store/userData";

export const Login: React.FC = () => {
  const { setToken } = useAuthStore();
  const { token } = useAuthStore();
  const { setUser } = useUserInfoStore();
  const { firstName } = useUserInfoStore();
  const { profilePhoto } = useUserInfoStore();
  const { schoolId } = useUserInfoStore();

  const [credentials, setCredentials] = useState<LoginData>({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("token 2: ", token);
  }, [token]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const logMe = async (): Promise<void> => {
    const fetched = await LogUser(credentials);

    const decoded = decodeToken(fetched.token);

    // interface Yuser {
    //   firstName: unknown;
    //   profilePhoto: unknown;
    //   schoolId: unknown;
    // }
    // let newUser:Yuser = {
    //   firstName: decoded.firstName,
    //   profilePhoto: decoded.profilePhoto,
    //   schoolId: decoded.schoolId,
    // };
    
    setToken(fetched.token);
    // setUser(newUser);

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
        className={"authInputDesign"}
      />
      <MyInput
        type={"password"}
        name={"password"}
        value={credentials.password || ""}
        placeholder={""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={"authInputDesign"}
      />
      <button onClick={logMe}>LOG ME!</button>
    </div>
  );
};
