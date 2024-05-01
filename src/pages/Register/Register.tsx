import "./Register.css";
import { useEffect, useState } from "react";
import { MyInput } from "../../common/MyInput/MyInput";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/functions";
import { DateInput } from '@mantine/dates';
import { NativeSelect } from '@mantine/core';
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import { RegisterForm } from "../../common/RegisterForm/RegisterForm";
import { MyButton } from "../../common/MyButton/MyButton";
import { RegisterUser } from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<Date | null>(null);
  const [userType, setUserType] = useState<string>("");
  const [msgError, setMsgError] = useState("");
  const { schoolId } = useAuthStore();
  const { token } = useAuthStore();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    secondLastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    birthdate: new Date(),
    schoolId: schoolId,
    roleId: 0,
  });

  const [userData2, setUserData2] = useState({
    firstName: "",
    lastName: "",
    secondLastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    birthdate: new Date(),
    schoolId: schoolId,
    roleId: 0,
  });

  const [userData3, setUserData3] = useState({
    firstName: "",
    lastName: "",
    secondLastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    birthdate: new Date(),
    schoolId: schoolId,
    roleId: 0,
  });

  useEffect(() => {
    let newRol: number;
    if (userType === "Administrador") {
      newRol = 2;
    } else if (userType === "Personal") {
      newRol = 3;
    } else if (userType === "Profesor") {
      newRol = 4;
    } else if (userType === "Estudiante") {
      newRol = 5;
    } else if (userType === "Padre") {
      newRol = 6;
    } else {
      newRol = 0;
    }
    console.log("Rol", newRol);

    setUserData((fields) => ({
          ...fields,
          roleId: newRol,
        }));
  }, [userType]);

  useEffect(() => {
    console.log("actualizacion", userData)
  }, [userData, userData2, userData3]);

  // const [userError, setUserError] = useState({
  //   firstNameError: "",
  //   lastNameError: "",
  //   secondLastNameError: "",
  //   emailError: "",
  //   passwordError: "",
  // });

  // const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserData((fields) => ({
  //     ...fields,
  //     [e.target.name]: e.target.value,
  //   }));

  //   checkError(e);
  // };

  // const checkError = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const error = validate(e.target.name, e.target.value);

  //   setUserError((prevState) => ({
  //     ...prevState,
  //     [e.target.name + "Error"]: error,
  //   }));
  // };

  const handleFormChange = (index: number, data: any) => {
    // console.log("Cambiando formulario", index, data);
    // setUserData(data);
    if (index === 0) {
      setUserData(data);
    }
    if (index === 1) {
      setUserData2(data);
    }
    if (index === 2) {
      setUserData3(data);
    }
  };
  const handleRegister = async () => {
    console.log("Registrando", userData);
    await RegisterUser({ userData }, token);
  };

  return (
    <div className="registerDesign">
      <div className="registerOptions">
        <div className="registerTitle">¿Qué tipo de usuario quieres registrar?</div>
        <NativeSelect
          value={userType}
          style={{ margin: "1em" }}
          onChange={(event) => setUserType(event.currentTarget.value)}
          data={["", "Estudiante", "Padre", "Profesor", "Personal", "Administrador"]}
        />
      </div>
      {/* <MyInput type="text"
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
        <DateInput locale="es" clearable label="Fecha nacimiento" placeholder="Fecha nacimiento" value={value} onChange={setValue} /> */}
        {userType === "Estudiante" && (
          <div className="registroEstudiante">
          <div className="individualRegister">
            <RegisterForm title="Estudiante" onChange={(data) => handleFormChange(0, data)} roleId={5} />
          </div>
          <div className="individualRegister">
            <RegisterForm title="Tutor 1" onChange={(data) => handleFormChange(1, data)} roleId={6} />
          </div>
          <div className="individualRegister">
            <RegisterForm title="Tutor 2" onChange={(data) => handleFormChange(2, data)} roleId={6} />
          </div>
        </div>
        )}
        {userType === "Administrador" && (
          <div className="registroEstudiante">
          <div className="individualRegister">
            <RegisterForm title="Administrador" onChange={(data) => handleFormChange(0, data)} roleId={2} />
          </div>
        </div>
        )}
        {userType === "Profesor" && (
          <div className="registroEstudiante">
          <div className="individualRegister">
            <RegisterForm title="Profesor" onChange={(data) => handleFormChange(0, data)} roleId={4} />
          </div>
        </div>
        )}
        {userType === "Personal" && (
          <div className="registroEstudiante">
          <div className="individualRegister">
            <RegisterForm title="Personal" onChange={(data) => handleFormChange(0, data)} roleId={3} />
          </div>
        </div>
        )}
        <MyButton text="Registrar" onClickFunction={handleRegister} className="authButtonDesign" />
    </div>
  );
};
