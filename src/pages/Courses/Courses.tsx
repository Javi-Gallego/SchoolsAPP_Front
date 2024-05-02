import { useEffect, useState } from "react";
import "./Courses.css";
import { createCourse, createStage, deleteCourse, deleteStage, getCourses, getStages } from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import { Course, Stage, setStage } from "../../interfaces/interfaces";
import { SVGAdd } from "../../common/SVGAdd/SVGAdd";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { SVGTrash } from "../../common/SVGTrash/SVGTrash";

export const Stages: React.FC = () => {
    const token = useAuthStore((state) => state.token);
    const schoolId = useAuthStore((state) => state.schoolId);
    const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [stages, setStages] = useState<Stage[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [addCourse, setAddCourse] = useState<boolean>(false);
  const [courseName, setCourseName] = useState<setStage>({
    name: "",
    schoolId: schoolId,
  });

  useEffect(() => {
    if (!firstFetch) {
      fetchStages();
      fetchCourses();
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
      const response = await getCourses(token, schoolId);

      setCourses(response.data);
    } catch (error) {}
  };

  const toggleAddCourse = () => {
    setAddCourse(!addCourse);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCourseName(((prevState) => ({
      ...prevState,
      name: e.target.value,
    })));
  };

  const sendCourse = async (): Promise<void> => {
    try {
      await createCourse(token, courseName);
      fetchCourses();
    } catch (error) {
      
    }
  };

  const eraseCourse = async (index: number): Promise<void> => {
    try {
      const stageId = (index + 1);
      await deleteCourse(token, stageId);
      fetchCourses();
    } catch (error) {
      
    }
  };

  return (
    <>
      <div className="coursesDesign">
        {!firstFetch ? (
          <div>"Loading..."</div>
        ) : stages.length > 0 ? (
          stages.map((stage, index) => {
            return (
              <div key={index} className="courseCard">
                <div className="courseTitle">{stage.name}</div>
                <div className="trash" onClick={() => eraseCourse(index)}>
                  <SVGTrash color="var(--tertiary-color)" />
                </div>
              </div>
            );
          })
        ) : (
          <div>"No courses found"</div>
        )}
        <div className="addCourse" onClick={toggleAddCourse}>
          <SVGAdd color="var(--tertiary-color)" />
        </div>
        {addCourse && (
          <div className="addCourse">
            <MyInput
              type={"name"}
              name={"courseName"}
              value={courseName.name || ""}
              placeholder={""}
              disabled={false}
              onChangeFunction={inputHandler}
              className={"loginInputDesign marginTopBottom"}
            />
            <MyButton
              text="Login"
              onClickFunction={sendCourse}
              className="loginButtonDesign marginTopBottom"
            />
          </div>
        )}
      </div>
    </>
  );
};