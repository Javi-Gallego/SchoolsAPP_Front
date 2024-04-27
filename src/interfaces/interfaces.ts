export interface HeaderLinkProps {
  title: string;
  destination: string;
}

export interface DataFetched {
  message: string,
  data: any[],
  success: boolean
}

export interface TokenFetched {
  message: string,
  token: string,
  success: boolean
}

export interface LoginData {
  email: string,
  password: string
}

export interface MyInputProps {
  type: string,
  name: string,
  placeholder: string,
  value: string | undefined,
  disabled: boolean,
  onChangeFunction: (value: React.ChangeEvent<HTMLInputElement>) => void,
  className: string,
}