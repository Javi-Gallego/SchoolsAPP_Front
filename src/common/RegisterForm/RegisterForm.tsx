import "./RegisterForm.css";
import { DateInput } from "@mantine/dates";
import { MyInput } from "../MyInput/MyInput";
import { useState } from "react";
import { validate } from "../../utils/functions";
import { RegisterFormProps } from "../../interfaces/interfaces";
import { useAuthStore } from "../../store/credentials";

export const RegisterForm: React.FC <RegisterFormProps>= ({ title, onChange, roleId, user}) => {
  const [value, setValue] = useState<Date>(new Date());
  const [msgError, setMsgError] = useState("");
  const { schoolId } = useAuthStore();

  const [userError, setUserError] = useState({
    firstNameError: "",
    lastNameError: "",
    secondLastNameError: "",
    emailError: "",
    passwordError: "",
    phoneError: "",
    addressError: "",
  });

  const handleDateChange = (dateValue: Date | null) => {
    if (!dateValue) {
      dateValue = new Date();
    } else{
      setValue(dateValue);
    }
    onChange("birthdate", dateValue.toISOString());
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);

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
    <>
      <div className="registerTitleForm">{title}</div>
      <MyInput
        type="text"
        name="firstName"
        placeholder="Nombre"
        value={user.firstName || ""}
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
        value={user.lastName || ""}
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
        value={user.secondLastName || ""}
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
        value={user.address || ""}
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
        value={user.phone || ""}
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
        value={user.email || ""}
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
        value={user.password || ""}
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
