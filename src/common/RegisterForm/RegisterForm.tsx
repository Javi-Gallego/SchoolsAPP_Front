import "./RegisterForm.css";
import { DateInput } from "@mantine/dates";
import { MyInput } from "../MyInput/MyInput";
import { useEffect, useState } from "react";
import { validate } from "../../utils/functions";
import { RegisterFormProps } from "../../interfaces/interfaces";
import { useAuthStore } from "../../store/credentials";

export const RegisterForm: React.FC <RegisterFormProps>= ({ title, onChange, roleId }) => {
  const [value, setValue] = useState<Date>(new Date());
  const [msgError, setMsgError] = useState("");
  const { schoolId } = useAuthStore();

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
    roleId: roleId,
  });

  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    secondLastNameError: "",
    emailError: "",
    passwordError: "",
    phoneError: "",
    addressError: "",
  });

  useEffect(() => {
    setUserData((fields) => ({
        ...fields,
        birthdate: value,
      }));
      onChange(userData);
  }, [value]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    setUserData((fields) => ({
      ...fields,
      [e.target.name]: newValue,
    }));

    checkError(e);
  };

  const checkError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const error = validate(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));

    onChange(userData);
    return userData;
  };

  const handleDateChange = (dateValue: Date | null) => {
    console.log("dateValue", dateValue)
    if (dateValue) {
      setValue(dateValue);
    } else {
      setValue(new Date());
    }
  };

  return (
    <>
      <div className="registerTitleForm">{title}</div>
      <MyInput
        type="text"
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
      <MyInput
        type="text"
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
      <MyInput
        type="text"
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
      <MyInput
        type="text"
        name="address"
        placeholder="Dirección"
        value={userData.address || ""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={`authInputDesign ${
          userError.addressError !== "" ? "authInputDesignError" : ""
        }`}
      />
      <div className="fieldEr">{userError.addressError}</div>
      <MyInput
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={userData.phone || ""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={`authInputDesign ${
          userError.phoneError !== "" ? "authInputDesignError" : ""
        }`}
      />
      <div className="fieldEr">{userError.phoneError}</div>
      <MyInput
        type="email"
        name="email"
        placeholder="email"
        value={userData.email || ""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={`authInputDesign ${
          userError.emailError !== "" ? "authInputDesignError" : ""
        }`}
      />
      <div className="fieldEr">{userError.emailError}</div>
      <MyInput
        type="password"
        name="password"
        placeholder="password"
        value={userData.password || ""}
        disabled={false}
        onChangeFunction={inputHandler}
        className={`authInputDesign ${
          userError.passwordError !== "" ? "authInputDesignError" : ""
        }`}
      />
      <div className="fieldEr">{userError.passwordError}</div>
      <DateInput
        style={{ marginBottom: '0.5em' }}
        locale="es"
        clearable
        name="birthdate"
        label="Fecha nacimiento"
        placeholder="Fecha nacimiento"
        value={value}
        // onChange={setValue}
        // onChange={inputHandler}
        onChange={handleDateChange}
      />
    </>
  );
};
