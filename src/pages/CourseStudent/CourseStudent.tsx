import { useEffect, useState } from "react";
import "./CourseStudent.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/credentials";
import { isTokenExpired } from "../../utils/functions";
import { getCourseStudents, getCourses, getStages } from "../../services/ApiCalls";
import { NativeSelect } from "@mantine/core";

export const CourseStudent: React.FC = () => {
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const schoolId = useAuthStore((state) => state.schoolId);
    const [stages, setStages] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [courseStudents, setCourseStudents] = useState<any[]>([]);
    const [courseType, setCourseType] = useState<string>("");
    const [firstFetch, setFirstFetch] = useState<boolean>(false);

    useEffect(() => {
    if (token === "" || isTokenExpired(token)) {
      logout();
      navigate("/");
    }
    if (!firstFetch) {
        fetchStages();
      fetchCourses();
      fetchCourseStudents();
      setFirstFetch(true);
    }
    }, []);

    const fetchStages = async () => {
        try {
          const response = await getStages(token, schoolId);
          setStages(response.data);
        } catch (error) {}
      };
    
      const fetchCourses = async () => {
        try {
          const response = await getCourses(token);
          setCourses(response.data);
        } catch (error) {}
      };

      const fetchCourseStudents = async () => {
        try {
        //   const newStudents = await getCourseStudents(token, courseId);
        //   setCourseStudents(newStudents.data);
        } catch (error) {
          console.log("Error fetching course students");
        }
      };

    return (
        <div className="detailCourseStudent">
            <h1>Gestión de alumnos y cursos</h1>
            
            {!firstFetch 
                ? (<div>"Loading..."</div>) 
                :  courses.length > 0 ? 
                    (
                        <NativeSelect
                        value={courseType}
                        style={{ margin: "1em" }}
                        onChange={(event) => setCourseType(event.currentTarget.value)}
                        data={courses.map((course) => course.name)}
                      />
                    )
                : (<div>Todavía no hay clases en el colegio</div>)
            }
            <div className="courseStudentList">
                {courseStudents.map((courseStudent) => (
                    <div key={courseStudent.id} className="courseStudent">
                        <p>{courseStudent.name}</p>
                        <p>{courseStudent.lastName}</p>
                        <p>{courseStudent.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};