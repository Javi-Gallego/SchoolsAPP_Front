import "./RegisterForm.css";
import { DateInput } from "@mantine/dates";
import { MyInput } from "../MyInput/MyInput";
import { useEffect, useState } from "react";
import { validate } from "../../utils/functions";
import { RegisterFormProps } from "../../interfaces/interfaces";
import { useAuthStore } from "../../store/credentials";
import { NativeSelect, Switch } from "@mantine/core";
import { getUsers } from "../../services/ApiCalls";

export const RegisterForm: React.FC<RegisterFormProps> = ({
  title,
  onChange,
  roleId,
  user,
  id,
}) => {
  const token = useAuthStore((state) => state.token);
  const [value, setValue] = useState<Date>(new Date());
  const { schoolId } = useAuthStore();
  const [checked, setChecked] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [userFilter, setUserFilter] = useState({
    firstNameFilter: "",
    lastNameFilter: "",
    roleNameFilter: "",
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
    if (
      userFilter.firstNameFilter !== "" ||
      userFilter.lastNameFilter !== "" ||
      userFilter.roleNameFilter !== ""
    ) {
      const searching = setTimeout(() => {
        fetchUsers();
      }, 350);
      return () => clearTimeout(searching);
    } else {
      setUsers([]);
    }
  }, [userFilter]);

  useEffect(() => {
  }, [users]);

  const fetchUsers = async () => {
    try {
      const queryFilter = `?schoolId=${schoolId}&roleName=${userFilter.roleNameFilter}&firstName=${userFilter.firstNameFilter}`;
      const allUsers = await getUsers(token, queryFilter);
      setUsers(allUsers.data);
    } catch (error) {
      console.log("Error fetching users");
    }
  };

  const handleDateChange = (dateValue: Date | null) => {
    if (!dateValue) {
      dateValue = new Date();
    } else {
      setValue(dateValue);
    }
    onChange("birthdate", dateValue.toISOString(), id);
  };

  const eventHandler = (value: string, name: string) => {
    setUserFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value, id);

    checkError(e);
  };

  const checkError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const error = validate(e.target.name, e.target.value);

    setUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const setDetail = (user: any) => {
    onChange("id", user.id.toString(), id);
    setUserName(user.firstName + " " + user.lastName);
    setUserFilter({
      firstNameFilter: "",
      lastNameFilter: "",
      roleNameFilter: "",
    });

  };

  return (
    <>
      <div className="registerTitleForm">{title}</div>
      <div className="registerSwitch">
        {roleId !== 1 && roleId !== 2 && roleId !== 5 && (
          <Switch
            checked={checked}
            label="El usuario ya está registrado"
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
        )}
      </div>
      {checked ? (
        <div className="registerFilters">
        <div className="registerCardName">
          <div className="userRegisteredSelected">Usuario seleccionado:</div>
          <div>{userName}</div>
          </div>
          <div className="registerFilter">
            <NativeSelect
              name="roleNameFilter"
              value={userFilter.roleNameFilter || ""}
              style={{ margin: "1em" }}
              onChange={(event) =>
                eventHandler(
                  event.currentTarget.value,
                  event.currentTarget.name
                )
              }
              data={["", "teacher", "personal", "parent"]}
            />
          </div>
          <div className="registerFilter">
            <MyInput
              type={"text"}
              name={"firstNameFilter"}
              value={userFilter.firstNameFilter || ""}
              placeholder={"Nombre"}
              disabled={false}
              onChangeFunction={(event) =>
                eventHandler(
                  event.currentTarget.value,
                  event.currentTarget.name
                )
              }
              className={"userRegisterInputDesign"}
            />
          </div>
          <div className="registerFilter">
            <MyInput
              type={"text"}
              name={"lastNameFilter"}
              value={userFilter.lastNameFilter || ""}
              placeholder={"Apellido"}
              disabled={false}
              onChangeFunction={(event) =>
                eventHandler(
                  event.currentTarget.value,
                  event.currentTarget.name
                )
              }
              className={"userRegisterInputDesign"}
            />
            {users.length > 0 
          ? (
            users.map((user) => (
              <div
                key={user.id}
                className="registerSearchCard"
                onClick={() => setDetail(user)}
              >
                <div className="registerCardName">
                  {user.firstName} {user.lastName}
                </div>
              </div>
            ))
          ) 
          : (
            <div className="registerCardName">{ userName !== "" ? null : "No users found"}</div>
          )}
          </div>
        </div>
        
      ) : (
        <>
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
        placeholder="Teléfono (no necesario en estudiantes)"
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
        disabled={roleId === 5 ? true : false}
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
        style={{ marginBottom: "0.5em" }}
        locale="es"
        clearable
        name="birthdate"
        label="Fecha nacimiento"
        placeholder="Fecha nacimiento"
        value={value}
        onChange={handleDateChange}
      /></>
      )}
    </>
  );
};
