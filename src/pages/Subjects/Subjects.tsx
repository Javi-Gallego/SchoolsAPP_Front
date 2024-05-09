import { useEffect, useState } from "react";
import "./Subjects.css";
import { createSubject, deleteSubject, getSubjects } from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import { SetSubject, Subject } from "../../interfaces/interfaces";
import { SVGAdd } from "../../common/SVGAdd/SVGAdd";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { SVGTrash } from "../../common/SVGTrash/SVGTrash";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "../../store/userData";
import { isTokenExpired } from "../../utils/functions";

export const Subjects: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const roleName = useUserInfoStore((state) => state.roleName);
  const token = useAuthStore((state) => state.token);
  const schoolId = useAuthStore((state) => state.schoolId);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [addSubject, setAddSubject] = useState<boolean>(false);
  const [newSubject, setNewSubject] = useState<SetSubject>({
    name: "",
    schoolId: schoolId,
  });

  useEffect(() => {
    if (token === "" || isTokenExpired(token)) {
      navigate("/");
    }
    if (roleName !== "admin" && roleName !== "super_admin") {
      navigate("/home");
    }
    if (!firstFetch) {
      fetchSubjects();
      setFirstFetch(true);
    }
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await getSubjects(token, schoolId);

      setSubjects(response.data);
    } catch (error) {}
  };

  const toggleAddSubject = () => {
    setAddSubject(!addSubject);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewSubject((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const sendSubject = async (): Promise<void> => {
    try {
      await createSubject(token, newSubject);
      fetchSubjects();
    } catch (error) {}
  };

  const eraseSubject = async (stageid: number): Promise<void> => {
    try {
      const stageId = stageid;
      await deleteSubject(token, stageId);
      fetchSubjects();
    } catch (error) {}
  };

  return (
    <>
      <div className="subjectDesign">
        {!firstFetch ? (
          <div>"Loading..."</div>
        ) : subjects.length > 0 ? (
            subjects.map((subject, index) => {
            return (
              <div key={index} className="subjectCard">
                <div className="subjectTitle">{subject.name}</div>
                <div className="trash" onClick={() => eraseSubject(subject.id)}>
                  <SVGTrash color="var(--tertiary-color)" />
                </div>
              </div>
            );
          })
        ) : (
          <div>"No stages found"</div>
        )}
        <div className="addButton" onClick={toggleAddSubject}>
          <SVGAdd color="var(--tertiary-color)" />
        </div>
        {addSubject && (
          <div className="addSubject">
            <MyInput
              type={"name"}
              name={"subjectName"}
              value={newSubject.name || ""}
              placeholder={"Nombre de la nueva asignatura"}
              disabled={false}
              onChangeFunction={inputHandler}
              className={"loginInputDesign marginTopBottom"}
            />
            <MyButton
              text="Crear asignatura"
              onClickFunction={sendSubject}
              className="button loginButtonDesign marginTopBottom"
            />
          </div>
        )}
      </div>
    </>
  );
};
