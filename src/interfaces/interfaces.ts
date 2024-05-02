import { ReactNode } from "react";
import { Child } from "../store/credentials";

export interface HeaderLinkProps {
  title: string;
  destination: string;
}

export interface DataFetched {
  message: string;
  data: any[];
  success: boolean;
}

export interface TokenFetched {
  message: string;
  token: string;
  success: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface GetStage {
  schoolId: number;
}

export interface Stage {
  id: number;
  name: string;
  schoolId: number;
}

export interface setStage {
  name: string;
  schoolId: number;
}

export interface MyInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string | undefined;
  disabled: boolean;
  onChangeFunction: (value: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

export interface MyButtonProps {
  text: string;
  onClickFunction: (value: React.MouseEvent<HTMLInputElement>) => void;
  className: string;
}

export interface MyCardProps {
  image: ReactNode;
  title: string;
  url: string;
}

export interface userRegister {
  firstName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  birthdate: Date;
  schoolId: number;
}

export interface RegisterFormProps {
  title: string;
  onChange: (value: userRegister) => void;
  roleId: number;
}

export interface decoded {
  token: string;
  firstName: string;
  profilePhoto: string;
  schoolId: number;
  roles: string[];
  schoolLogo: string;
  children: Child[];
}
