import "./Register.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NativeSelect } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { RegisterForm } from "../../common/RegisterForm/RegisterForm";
import { MyButton } from "../../common/MyButton/MyButton";
import {
  RegisterUser,
  createParentStudentRelation,
} from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import {
  setParentStudent,
  userRegister,
} from "../../interfaces/interfaces";
import { useUserInfoStore } from "../../store/userData";
import { isTokenExpired } from "../../utils/functions";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const roleName = useUserInfoStore((state) => state.roleName);
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
    id: 0,
    firstName: "",
    lastName: "",
    secondLastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    birthdate: new Date(),
    schoolId: schoolId,
    roleId: 6,
  });

  const [userData3, setUserData3] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    secondLastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    birthdate: new Date(),
    schoolId: schoolId,
    roleId: 6,
  });

  useEffect(() => {
    if (token === "" || isTokenExpired(token)) {
      navigate("/");
    }
    if (roleName !== "admin" && roleName !== "super_admin") {
      navigate("/home");
    }
  }, []);

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

    setUserData((fields) => ({
      ...fields,
      roleId: newRol,
    }));
  }, [userType]);

  useEffect(() => {
  }, [userData, userData2, userData3]);

  const inputHandler = (name: string, value: any, id: string) => {
    if (id === "userData") {
      setUserData((fields) => ({
        ...fields,
        [name]: value,
        email:
          userType === "Estudiante"
            ? `${userData.firstName}${userData.lastName}@escolaeldrac.com`
            : name === "email"
            ? value
            : userData.email,
      }));
    } else if (id === "userData2") {
      setUserData2((fields) => ({
        ...fields,
        [name]: value,
      }));
    } else if (id === "userData3") {
      setUserData3((fields) => ({
        ...fields,
        [name]: value,
      }));
    }
  };

  const handleRegister = async () => {
    const regUser = await RegisterUser({ userData }, token);
    if (userType === "Estudiante") {
      let relation1: setParentStudent = {
        parentId: userData2.id,
        studentId: regUser.data.id,
      };
      if (userData2.id !== 0) {
        const regRelation1 = await createParentStudentRelation(
          token,
          relation1
        );
      } else {
        const regUser2: { data: { id: number } } = await RegisterUser(
          { userData: userData2 },
          token
        );
        relation1 = {
          parentId: regUser.data.id,
          studentId: regUser2.data.id,
        };
        const regRelation1 = await createParentStudentRelation(
          token,
          relation1
        );
      }
      let relation2: setParentStudent = {
        parentId: userData3.id,
        studentId: regUser.data.id,
      };
      if (userData3.id !== 0) {
        const regRelation2 = await createParentStudentRelation(
          token,
          relation2
        );
      } else {
        const regUser3: { data: { id: number } } = await RegisterUser(
          { userData: userData3 },
          token
        );
        relation2 = {
          parentId: regUser3.data.id,
          studentId: regUser.data.id,
        };
        const regRelation2 = await createParentStudentRelation(
          token,
          relation2
        );
      }
    }
  };

  return (
    <div className="registerDesign">
      <div className="registerOptions">
        <div className="registerTitle">
          ¿Qué tipo de usuario quieres registrar?
        </div>
        <NativeSelect
          value={userType}
          style={{ margin: "1em" }}
          onChange={(event) => setUserType(event.currentTarget.value)}
          data={[
            "",
            "Estudiante",
            "Profesor",
            "Personal",
            roleName === "super_admin" ? "Administrador" : "",
          ]}
        />
      </div>
      {userType === "Estudiante" && (
        <div className="registroEstudiante">
          <div className="individualRegister">
            <RegisterForm
              title="Estudiante"
              onChange={inputHandler}
              roleId={5}
              user={userData}
              id="userData"
            />
          </div>
          <div className="individualRegister">
            <RegisterForm
              title="Tutor 1"
              onChange={inputHandler}
              roleId={6}
              user={userData2}
              id="userData2"
            />
          </div>
          <div className="individualRegister">
            <RegisterForm
              title="Tutor 2"
              onChange={inputHandler}
              roleId={6}
              user={userData3}
              id="userData3"
            />
          </div>
        </div>
      )}
      {userType === "Administrador" && (
        <div className="registroEstudiante">
          <div className="individualRegister"></div>
        </div>
      )}
      {userType === "Profesor" && (
        <div className="registroEstudiante">
          <div className="individualRegister">
            <RegisterForm
              title="Profesor"
              onChange={inputHandler}
              roleId={4}
              user={userData}
              id="userData"
            />
          </div>
        </div>
      )}
      {userType === "Personal" && (
        <div className="registroEstudiante">
          <div className="individualRegister">
            <RegisterForm
              title="Personal"
              onChange={inputHandler}
              roleId={3}
              user={userData}
              id="userData"
            />
          </div>
        </div>
      )}
      <MyButton
        text="Registrar"
        onClickFunction={handleRegister}
        className="button authButtonDesign"
      />
    </div>
  );
};
