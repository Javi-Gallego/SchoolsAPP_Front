import { Course, DataFetched, GetStage, LoginData, SetCourse, SetCourseSubject, SetSubject, TokenFetched, setStage } from "../interfaces/interfaces";

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

export const getUsers = async (token:string, query: string): Promise<DataFetched> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}/users${query}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const getStages = async (token:string, school: number): Promise<DataFetched> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}/stages/${school}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const createStage = async (token:string, stage: setStage): Promise<DataFetched> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(stage),
  };

  try {
    const response = await fetch(`${rootUrl}/stages`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const deleteStage = async (token:string, stage: number): Promise<DataFetched> => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}/stages/${stage}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const getCourses = async (token:string,): Promise<DataFetched> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}/courses/`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const createCourse = async (token:string, course: SetCourse): Promise<DataFetched> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  };

  try {
    const response = await fetch(`${rootUrl}/courses`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const updateCourse = async (token:string, course: Course): Promise<DataFetched> => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  };

  try {
    const response = await fetch(`${rootUrl}/courses/${course.id}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const deleteCourse = async (token:string, course: number): Promise<DataFetched> => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}/courses/${course}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const getSubjects = async (token:string, school: number): Promise<DataFetched> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}/subjects/${school}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const createSubject = async (token:string, subject: SetSubject): Promise<DataFetched> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subject),
  };

  try {
    const response = await fetch(`${rootUrl}/subjects`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const deleteSubject = async (token:string, subject: number): Promise<DataFetched> => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}/subjects/${subject}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const getCourseSubjects = async (token:string, course: number): Promise<DataFetched> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}/coursesubjects/${course}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const createCourseSubject = async (token:string, courseSubject: any): Promise<DataFetched> => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseSubject),
  };

  try {
    const response = await fetch(`${rootUrl}/coursesubjects`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const deleteCourseSubject = async (token:string, courseSubject: SetCourseSubject): Promise<DataFetched> => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(courseSubject),
  };

  try {
    console.log(`${rootUrl}/coursesubjects/${courseSubject}`)
    const response = await fetch(`${rootUrl}/coursesubjects/${courseSubject}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};

export const getCourseStudents = async (token:string, course: number): Promise<DataFetched> => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${rootUrl}/courseusers/${course}`, options);

    const data = await response.json();

    return data;
  } catch (error) {
    let answer: DataFetched = {
      message: "",
      data: [""],
      success: false,
    };

    return answer;
  }
};