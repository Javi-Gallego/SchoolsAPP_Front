import { DataFetched, LoginData, TokenFetched } from "../interfaces/interfaces";

const rootUrl = "http://localhost:4000/api";  

export const LogUser = async (credentials: LoginData): Promise<TokenFetched> => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      };
      
      try {
        const response: any = await fetch(`${rootUrl}/auth/login`, options);
    
        const data: TokenFetched = await response.json();
    
        if(!data.success){
          throw new Error(data.message)
        }
    
        return data;
      } catch (error: unknown) {
        let answer: TokenFetched = {
          message: "",
          token: "",
          success: false,
        };
    
        return answer;
      }
};

export const RegisterUser = async (credentials: any, token: string): Promise<DataFetched> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(credentials),
  };
  
  try {
    console.log("token", token)
    console.log(options.body)
    const response: any = await fetch(`${rootUrl}/auth/register`, options);

    const data: DataFetched = await response.json();

    if(!data.success){
      throw new Error(data.message)
    }

    return data;
  } catch (error: unknown) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};