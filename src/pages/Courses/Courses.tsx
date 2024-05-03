import { useEffect, useState } from "react";
import "./Courses.css";
import {
  createCourse,
  createStage,
  deleteCourse,
  deleteStage,
  getCourses,
  getStages,
  getUsers,
} from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import {
  Course,
  SetCourse,
  Stage,
  setStage,
} from "../../interfaces/interfaces";
import { SVGAdd } from "../../common/SVGAdd/SVGAdd";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { SVGTrash } from "../../common/SVGTrash/SVGTrash";
import { NativeSelect } from "@mantine/core";
import { Modal } from "../../common/Modal/Modal";

export const Courses: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const schoolId = useAuthStore((state) => state.schoolId);
  const [isOpen, setIsOpen] = useState(false);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [stages, setStages] = useState<Stage[]>([]);
  const [stagesNames, setStagesNames] = useState<string[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [teachersNames, setTeachersNames] = useState<string[]>([]);
  const [stageType, setStageType] = useState<string>("");
  const [tutorSelected, setTutorSelected] = useState<string>("");
  const [newCourse, setNewCourse] = useState<SetCourse>({
    name: "",
    stageId: 0,
    year: "",
    tutorId: 0,
  });

  useEffect(() => {
    if (!firstFetch) {
      fetchStages();
      fetchCourses();
      fetchTeachers();
      setFirstFetch(true);
    }
  }, []);

  useEffect(() => {
    updateStagesNames();
  }, [stages]);

  useEffect(() => {
    updateTeachersNames();
  }, [teachers]);

  useEffect(() => {
    let stageId = stages.find((stage) => stage.name === stageType)?.id;
    if (stageId) {
      setNewCourse((prevState) => ({
        ...prevState,
        stageId: stageId,
      }));
    }
  }, [stageType]);

  useEffect(() => {

    let foundTeacher = teachers.find((teacher) => {
        let fullName = `${teacher.firstName} ${teacher.lastName} ${teacher.secondLastName}`;
        return fullName === tutorSelected;
      });

    if (foundTeacher) {
      setNewCourse((prevState) => ({
        ...prevState,
        tutorId: foundTeacher.id,
      }));
    }
  }, [tutorSelected]);

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

  const fetchTeachers = async () => {
    try {
      let query = "?schoolId=1&roleName=teacher";
      const response = await getUsers(token, query);
      setTeachers(response.data);
    } catch (error) {}
  };

  const updateStagesNames = () => {
    const names = stages.map((stage) => stage.name);
    setStagesNames(names);
  };

  const updateTeachersNames = () => {
    if (teachers.length === 0) return;
    const names = teachers.map((teacher) => (teacher.firstName + " " + teacher.lastName + " " + teacher.secondLastName));
    setTeachersNames(names);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewCourse((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendCourse = async (): Promise<void> => {
    try {
      await createCourse(token, newCourse);
      fetchCourses();
      toggleModal();
    } catch (error) {}
  };

  const eraseCourse = async (courseid: number): Promise<void> => {
    try {
      const stageId = courseid;
      await deleteCourse(token, stageId);
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="coursesDesign">
        {!firstFetch ? (
          <div>"Loading..."</div>
        ) : stages.length > 0 ? (
          stages.map((stage, stageindex) => {
            return (
              <div className="coursesContainer" key={`stage${stageindex}`}>
                <div className="stageCard">
                  <div className="courseTitle">{stage.name}</div>
                </div>
                {courses.length > 0 ? (
                  courses
                    .filter((course) => course.stageId === stage.id)
                    .map((course, courseindex) => {
                      return (
                        <div
                          key={`course${stageindex}${courseindex}`}
                          className="courseCard"
                        >
                          <div className="courseTitle">{course.name}</div>
                          <div
                            className="trash"
                            onClick={() => eraseCourse(course.id)}
                          >
                            <SVGTrash color="var(--tertiary-color)" />
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div>"No courses found"</div>
                )}
              </div>
            );
          })
        ) : (
          <div>"No courses found"</div>
        )}
        <div className="addCourse" onClick={toggleModal}>
          <SVGAdd color="var(--tertiary-color)" />
        </div>
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <div className="titleCourseModal">Añadir nuevo curso al colegio</div>
          <div className="stageCourseModal">
            <div className="textCourseModal">
              ¿A qué etapa escolar pertenece?
            </div>
            <NativeSelect
              value={stageType}
              style={{ margin: "1em" }}
              onChange={(event) => setStageType(event.currentTarget.value)}
              data={stagesNames}
            />
          </div>
          <div className="yearCourseModal">
            <div>¿A qué año de la etapa pertenece?</div>
            <MyInput
              type={"year"}
              name={"year"}
              value={newCourse.year || ""}
              placeholder={"Año"}
              disabled={false}
              onChangeFunction={inputHandler}
              className={"littleInputDesign"}
            />
          </div>
          <div className="stageCourseModal">
            <div className="textCourseModal">
              Selecciona un tutor
            </div>
            <NativeSelect
              value={tutorSelected}
              style={{ margin: "1em" }}
              onChange={(event) => setTutorSelected(event.currentTarget.value)}
              data={teachersNames}
            />
          </div>
          <MyInput
            type={"name"}
            name={"name"}
            value={newCourse.name || ""}
            placeholder={"Nombre del curso"}
            disabled={false}
            onChangeFunction={inputHandler}
            className={"modalInputDesign marginTopBottom"}
          />
          <MyButton
            text="Añadir curso"
            onClickFunction={sendCourse}
            className="modalButtonDesign marginTopBottom"
          />
        </Modal>
      </div>
    </>
  );
};
