import "./Register.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NativeSelect } from '@mantine/core';
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { RegisterForm } from "../../common/RegisterForm/RegisterForm";
import { MyButton } from "../../common/MyButton/MyButton";
import { RegisterUser } from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import { userRegister } from "../../interfaces/interfaces";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<Date | null>(null);
  const [userType, setUserType] = useState<string>("");
  const [msgError, setMsgError] = useState("");
  const { schoolId } = useAuthStore();
  const { token } = useAuthStore();

  const [userData, setUserData] = useState<userRegister>({
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

  const inputHandler = (name:string, value:any) => {
    console.log
    setUserData((fields) => ({
      ...fields,
      [name]: value,
    }));
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
        {userType === "Estudiante" && (
          <div className="registroEstudiante">
          <div className="individualRegister">
            {/* <RegisterForm title="Estudiante" onChange={(data) => handleFormChange(0, data)} roleId={5} /> */}
          </div>
          <div className="individualRegister">
            {/* <RegisterForm title="Tutor 1" onChange={(data) => handleFormChange(1, data)} roleId={6} /> */}
          </div>
          <div className="individualRegister">
            {/* <RegisterForm title="Tutor 2" onChange={(data) => handleFormChange(2, data)} roleId={6} /> */}
          </div>
        </div>
        )}
        {userType === "Administrador" && (
          <div className="registroEstudiante">
          <div className="individualRegister">
            {/* <RegisterForm title="Administrador" onChange={(data) => handleFormChange(0, data)} roleId={2} /> */}
          </div>
        </div>
        )}
        {userType === "Profesor" && (
          <div className="registroEstudiante">
          <div className="individualRegister">
            {/* <RegisterForm title="Profesor" onChange={(data) => handleFormChange(0, data)} roleId={4} /> */}
            <RegisterForm title="Profesor" onChange={inputHandler} roleId={4} user={userData}/>
          </div>
        </div>
        )}
        {userType === "Personal" && (
          <div className="registroEstudiante">
          <div className="individualRegister">
            {/* <RegisterForm title="Personal" onChange={(data) => handleFormChange(0, data)} roleId={3} /> */}
          </div>
        </div>
        )}
        <MyButton text="Registrar" onClickFunction={handleRegister} className="authButtonDesign" />
    </div>
  );
};
