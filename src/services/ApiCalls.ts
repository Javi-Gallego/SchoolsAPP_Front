import { DataFetched, LoginData, TokenFetched } from "../interfaces/interfaces";

export const LogUser = async (credentials: LoginData): Promise<TokenFetched> => {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      };
      
      try {
        const response: any = await fetch(`http://localhost:4000/api/auth/login`, options);
    
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