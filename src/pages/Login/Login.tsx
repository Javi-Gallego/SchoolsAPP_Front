import { useState } from "react";
import "./Login.css";
import { LoginData } from "../../interfaces/interfaces";
import { LogUser } from "../../services/ApiCalls";
import { MyInput } from "../../common/MyInput/MyInput";
import { decodeToken } from "react-jwt";
import { useAuthStore } from "../../store/credentials";

export const Login: React.FC = () => {
  const { setToken } = useAuthStore();
  const { token } = useAuthStore();
  const [credentials, setCredentials] = useState<LoginData>({
    email: "",
    password: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const logMe = async (): Promise<void> => {
    const fetched = await LogUser(credentials);

    console.log(fetched);
    const decoded = decodeToken(fetched.token);
    console.log(decoded);
console.log("fetched.token: ", fetched.token);
    setToken(fetched.token);
    console.log(token);
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
