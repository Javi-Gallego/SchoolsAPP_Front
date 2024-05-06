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
export interface Course {
  id: number;
  name: string;
  stageId: number;
  year: string;
  tutorId: number;
}

export interface SetCourse {
  name: string;
  stageId: number;
  year: string;
  tutorId?: number;
}

export interface SetCourseSubject {
  courseId: number;
  subjectId: number;
}

export interface Subject {
  id: number;
  name: string;
  schoolId: number;
}

export interface SetSubject {
  name: string;
  schoolId: number;
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
  roleId: number;
}

export interface RegisterFormProps {
  title: string;
  // onChange: (value: userRegister) => void;
  onChange: (name: string, value: string) => void;
  roleId: number;
  user: userRegister;
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

export interface Event {
  title: string;
  start: Date;
  end: Date;
  backgroundColor: string;
  description: string;
}

export interface setEvent {
  title: string;
  start: Date;
  end: Date;
  description: string;
  publisherId: number;
  stageId: number;
  courseId: number;
  schoolId: number;
  backgroundColor: string;
}

export interface MyEvent {
  title: string;
  start: string;
  end: string;
  extendedProps: {
    description: string;
    publisher: string;
    stage: string;
    course: string;
  };
  backgroundColor: string;
}
