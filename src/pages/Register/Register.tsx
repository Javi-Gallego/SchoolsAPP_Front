import "./Register.css";
import { useState } from "react";
import { MyInput } from "../../common/MyInput/MyInput";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/functions";
import { DateInput } from '@mantine/dates';
import { NativeSelect } from '@mantine/core';
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<Date | null>(null);
  const [userType, setUserType] = useState<string | undefined>(undefined);
  const [msgError, setMsgError] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    secondLastName: "",
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    secondLastNameError: "",
    emailError: "",
    passwordError: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((fields) => ({
      ...fields,
      [e.target.name]: e.target.value,
    }));

    checkError(e);
  };

  const checkError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const error = validate(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  return (
    <div className="registerDesign">
      <div className="registerTitle">¿Qué tipo de usuario quieres registrar?</div>
      <NativeSelect
        value={userType}
        onChange={(event) => setUserType(event.currentTarget.value)}
        data={['Estudiante', 'Padre', 'Profesor', 'Administrador']}
      />
      <MyInput type="text"
        name="firstName"
        placeholder="Nombre"
        value={userData.firstName || ""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={`authInputDesign ${
          userError.firstNameError !== "" ? "authInputDesignError" : ""
        }`}
      />
      <div className="fieldEr">{userError.firstNameError}</div>

      <MyInput type="text"
        name="lastName"
        placeholder="Primer apellido"
        value={userData.lastName || ""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={`authInputDesign ${
          userError.lastNameError !== "" ? "authInputDesignError" : ""
        }`}
      />
        <div className="fieldEr">{userError.lastNameError}</div>

      <MyInput type="text"
        name="secondLastName"
        placeholder="Segundo apellido"
        value={userData.secondLastName || ""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={`authInputDesign ${
          userError.secondLastNameError !== "" ? "authInputDesignError" : ""
        }`}
      />
        <div className="fieldEr">{userError.secondLastNameError}</div>
        <DateInput locale="es" clearable label="Fecha nacimiento" placeholder="Fecha nacimiento" value={value} onChange={setValue} />
        {/* <DatePicker allowDeselect value={value} onChange={setValue} /> */}
    </div>
  );
};
