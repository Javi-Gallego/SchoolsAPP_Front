import { useEffect, useState } from "react";
import "./Stages.css";
import { createStage, deleteStage, getStages } from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import { Stage, setStage } from "../../interfaces/interfaces";
import { SVGAdd } from "../../common/SVGAdd/SVGAdd";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { SVGTrash } from "../../common/SVGTrash/SVGTrash";
import { Modal } from "../../common/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "../../store/userData";

export const Stages: React.FC = () => {
  const navigate = useNavigate();
  const roleName = useUserInfoStore((state) => state.roleName);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [stages, setStages] = useState<Stage[]>([]);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const token = useAuthStore((state) => state.token);
  const schoolId = useAuthStore((state) => state.schoolId);
  const [addStage, setAddStage] = useState<boolean>(false);
  const [stageName, setStageName] = useState<setStage>({
    name: "",
    schoolId: schoolId,
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if(roleName !== "admin" && roleName !== "super_admin"){
      navigate("/home");
    }
    if (!firstFetch) {
      fetchStages();
      setFirstFetch(true);
    }
  }, []);

  const fetchStages = async () => {
    try {
      const response = await getStages(token, schoolId);

      setStages(response.data);
    } catch (error) {}
  };

  const toggleAddStage = () => {
    setAddStage(!addStage);
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStageName((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const sendStage = async (): Promise<void> => {
    try {
      await createStage(token, stageName);
      fetchStages();
    } catch (error) {}
  };

  const eraseStage = async (stageid: number): Promise<void> => {
    try {
      const stageId = stageid;
      await deleteStage(token, stageId);
      fetchStages();
    } catch (error) {}
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="stagesDesign">
        {!firstFetch ? (
          <div>"Loading..."</div>
        ) : stages.length > 0 ? (
          stages.map((stage, index) => {
            return (
              <div key={index} className="stageCard">
                <div className="stageTitle">{stage.name}</div>
                <div className="trash" onClick={() => eraseStage(stage.id)}>
                  <SVGTrash color="var(--tertiary-color)" />
                </div>
              </div>
            );
          })
        ) : (
          <div>"No stages found"</div>
        )}
        <div className="addStage" onClick={toggleModal}>
          <SVGAdd color="var(--tertiary-color)" />
        </div>
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <div className="addStage">
            <MyInput
              type={"name"}
              name={"stageName"}
              value={stageName.name || ""}
              placeholder={"Nombre de la nueva etapa"}
              disabled={false}
              onChangeFunction={inputHandler}
              className={"loginInputDesign marginTopBottom"}
            />
            <MyButton
              text="Crear etapa"
              onClickFunction={sendStage}
              className="button loginButtonDesign marginTopBottom"
            />
          </div>
        </Modal>
      </div>
    </>
  );
};
