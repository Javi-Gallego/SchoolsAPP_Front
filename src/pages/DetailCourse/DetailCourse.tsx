import { useNavigate } from "react-router-dom";
import { useDetailCourseStore } from "../../store/detailCourse";
import "./DetailCourse.css";
import { SVGReturn } from "../../common/SVGReturn/SVGReturn";
import { MyButton } from "../../common/MyButton/MyButton";
import { Modal } from "../../common/Modal/Modal";
import { useEffect, useState } from "react";
import { NativeSelect } from "@mantine/core";
import {
  createCourseSubject,
  deleteCourseSubject,
  getCourseStudents,
  getCourseSubjects,
  getSubjects,
  getUsers,
  updateCourse,
} from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import { SVGTrash } from "../../common/SVGTrash/SVGTrash";
import { Course } from "../../interfaces/interfaces";
import { MyInput } from "../../common/MyInput/MyInput";

export const DetailCourse: React.FC = () => {
  const courseId = useDetailCourseStore((state) => state.id);
  const courseName = useDetailCourseStore((state) => state.courseName);
  const courseYear = useDetailCourseStore((state) => state.year);
  const courseTutor = useDetailCourseStore((state) => state.tutorId);
  const stageId = useDetailCourseStore((state) => state.stageId);
  const stageName = useDetailCourseStore((state) => state.stageName);
  const schoolId = useAuthStore((state) => state.schoolId);
  const token = useAuthStore((state) => state.token);
  const setTutorId = useDetailCourseStore((state) => state.setTutorId);
  const navigate = useNavigate();
  const [firstFetch, setFirstFetch] = useState(false);
  const [courseSubjects, setCourseSubjects] = useState<string[]>([]);
  const [allTeachers, setAllTeachers] = useState<any[]>([]);
  const [allTeachersNames, setAllTeachersNames] = useState<string[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [newTutor, setNewTutor] = useState<any>(0);
  const [allSubjects, setAllSubjects] = useState<any[]>([]);
  const [allSubjectsNames, setAllSubjectsNames] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [allCourseStudents, setAllCourseStudents] = useState<any[]>([]);
  const [isOpenTutor, setIsOpenTutor] = useState(false);
  const [isOpenSubject, setIsOpenSubject] = useState(false);
  const [courseTutorName, setCourseTutorName] = useState<string>("");
  const allSubjectsNamesWithPlaceholder = [
    "Elige una asignatura",
    ...allSubjectsNames,
  ];
  const allTeachersNamesWithPlaceholder = [
    "Elige un tutor",
    ...allTeachersNames,
  ];
  const [courseStudents, setCourseStudents] = useState<any[]>([]);
  const [updatedCourse, setUpdatedCourse] = useState<Course>({
    id: courseId,
    name: courseName,
    stageId: stageId,
    year: courseYear,
    tutorId: courseTutor,
  });

  useEffect(() => {
    if (!firstFetch) {
      fetchCourseSubjects();
      fetchSchoolSubjects();
      fetchTeachers();
      fetchCourseStudents();
      setFirstFetch(true);
    }
  }, []);

  useEffect(() => {
    let teacherIndex = allTeachersNames.indexOf(selectedTeacher);
    if (teacherIndex === -1) {
      return;
    }
    setUpdatedCourse({
      id: courseId,
      name: courseName,
      stageId: stageId,
      year: courseYear,
      tutorId: allTeachers[teacherIndex].id,
    });
  }, [selectedTeacher]);

  useEffect(() => {}, [courseTutorName]);

  const toggleModalTutor = () => {
    setIsOpenTutor(!isOpenTutor);
  };

  const toggleModalSubject = () => {
    setIsOpenSubject(!isOpenSubject);
  };

  const fetchCourseSubjects = async () => {
    try {
      const newCourseSubjects = await getCourseSubjects(token, courseId);

      setCourseSubjects(newCourseSubjects.data);
    } catch (error) {
      console.log("Error fetching course subjects");
    }
  };

  const fetchSchoolSubjects = async () => {
    try {
      const allSubjects = await getSubjects(token, schoolId);
      setAllSubjects(allSubjects.data);
      if (allSubjects.data.length === 0) return;
      const names = allSubjects.data.map((subject) => subject.name);
      setAllSubjectsNames(names);
    } catch (error) {
      console.log("Error fetching school subjects");
    }
  };

  const fetchTeachers = async () => {
    try {
      const query = `?schoolId=${schoolId}&roleName=teacher`;
      const allTeachers = await getUsers(token, query);
      const tutorTeacher = allTeachers.data.find(
        (teacher) => teacher.id === courseTutor
      );
      if (tutorTeacher != null) {
        setCourseTutorName(
          tutorTeacher.firstName +
            " " +
            tutorTeacher.lastName +
            " " +
            tutorTeacher.secondLastName
        );
      }
      setAllTeachers(allTeachers.data);
      if (allTeachers.data.length === 0) return;
      const names = allTeachers.data.map(
        (teacher) =>
          teacher.firstName +
          " " +
          teacher.lastName +
          " " +
          teacher.secondLastName
      );
      setAllTeachersNames(names);
    } catch (error) {
      console.log("Error fetching teachers");
    }
  };

  const fetchCourseStudents = async () => {
    try {
      const newStudents = await getCourseStudents(token, courseId);
      setCourseStudents(newStudents.data);
    } catch (error) {
      console.log("Error fetching course students");
    }
  };

  const eraseCourse = async (subjectName: string) => {
    try {
      const subjectToErase = allSubjects.find(
        (subject) => subject.name === subjectName
      );
      if (!subjectToErase) return;
      console.log("subjectToErase: ", subjectToErase);
      const courseSubjectToErase = {
        courseId: courseId,
        subjectId: subjectToErase.id,
      };
      const response = await deleteCourseSubject(token, courseSubjectToErase);
      fetchCourseSubjects();
    } catch (error) {
      console.log("Error erasing course");
    }
  };
  const sendTutor = async () => {
    try {
      const newTutor = await updateCourse(token, updatedCourse);
      setTutorId(updatedCourse.tutorId);
      if (newTutor != null) {
        setCourseTutorName(selectedTeacher);
      }
      setIsOpenTutor(!isOpenTutor);
    } catch (error) {
      console.log("Error sending tutor");
    }
  };

  const sendSubject = async () => {
    try {
      const newSubject = allSubjects.find(
        (subject) => subject.name === selectedSubject
      );
      const newCourseSubject = {
        courseId: courseId,
        subjectId: newSubject.id,
      };
      const createdCS = await createCourseSubject(token, newCourseSubject);
      fetchCourseSubjects();
      setIsOpenSubject(!isOpenSubject);
    } catch (error) {
      console.log("Error sending subject");
    }
  };

  return (
    <div className="detailCourseDesign">
      <div className="detailName">
        <div className="goBackDetail">
          <div className="goBackLink" onClick={() => navigate(-1)}>
            <SVGReturn color="var(--tertiary-color)" />
          </div>
          Volver
        </div>
        <div>{courseName}</div>
        <div className="goBackDetail"></div>
      </div>
      <div className="detailContent">
        <div className="detailInfo">
          <div className="detailData">
            <div className="detailDataTitle">Etapa:</div>
            <div className="detailDataContent">{stageName}</div>
          </div>
          <div className="detailData">
            <div className="detailDataTitle">Año:</div>
            <div className="detailDataContent">{courseYear}</div>
          </div>
          <div className="detailData">
            <div className="detailDataTitle">Tutor:</div>
            <div className="detailDataContent">
              {courseTutorName != "" ? courseTutorName : "Tutor no asignado"}
            </div>
            <MyButton
              text={courseTutor != null ? "Cambiar tutor" : "Asignar tutor"}
              onClickFunction={toggleModalTutor}
              className="button slimButtonDesign"
            />
            <Modal isOpen={isOpenTutor} toggleModal={toggleModalTutor}>
              <div className="addTutor">
                <NativeSelect
                  value={selectedTeacher || allTeachersNamesWithPlaceholder[0]}
                  style={{ margin: "1em" }}
                  onChange={(event) =>
                    setSelectedTeacher(event.currentTarget.value)
                  }
                  data={allTeachersNamesWithPlaceholder}
                />
                <MyButton
                  text="Asignar tutor"
                  onClickFunction={sendTutor}
                  className="button slimButtonDesign marginTopBottom"
                />
              </div>
            </Modal>
            <div className="detailData">
              <div className="detailDataTitle">Asignaturas:</div>
              <div className="detailDataContent">
                {firstFetch && courseSubjects.length > 0 ? (
                  courseSubjects.map((subject, index) => {
                    return (
                      <div key={`course${index}`} className="courseSubjectCard">
                        <div className="courseSubjectTitle">{subject}</div>
                        <div
                          className="trash"
                          onClick={() => eraseCourse(subject)}
                        >
                          <SVGTrash color="var(--tertiary-color)" />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>"No hay asignaturas asignadas"</div>
                )}
              </div>
              <MyButton
                text="Añadir asignatura"
                onClickFunction={toggleModalSubject}
                className="button slimButtonDesign"
              />
              <Modal isOpen={isOpenSubject} toggleModal={toggleModalSubject}>
                <div className="addSubject">
                  <NativeSelect
                    value={
                      selectedSubject || allSubjectsNamesWithPlaceholder[0]
                    }
                    style={{ margin: "1em" }}
                    onChange={(event) =>
                      setSelectedSubject(event.currentTarget.value)
                    }
                    data={allSubjectsNamesWithPlaceholder}
                  />
                  <MyButton
                    text="Añadir asignatura"
                    onClickFunction={sendSubject}
                    className="button slimButtonDesign marginTopBottom"
                  />
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div className="detailInfo">
          <div className="detailData">
            <div className="detailDataTitle">Alumnos:</div>
            <div className="detailDataContent">
              {firstFetch && courseStudents.length > 0 ? (
                courseStudents.map((student, index) => {
                  return (
                    <div key={`student${index}`} className="courseSubjectCard">
                      <div className="courseSubjectTitle">
                        {student.Student.firstName} {student.Student.lastName}{" "}
                        {student.Student.secondLastName}
                      </div>
                      <div
                        className="trash"
                        onClick={() => eraseCourse(student.Student.id)}
                      >
                        <SVGTrash color="var(--tertiary-color)" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>"No hay alumnos asignadas"</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
