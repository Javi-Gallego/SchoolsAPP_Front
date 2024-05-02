import { useEffect, useState } from "react";
import "./Stages.css";
import { createStage, deleteStage, getStages } from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import { Stage, setStage } from "../../interfaces/interfaces";
import { SVGAdd } from "../../common/SVGAdd/SVGAdd";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { SVGTrash } from "../../common/SVGTrash/SVGTrash";

export const Stages: React.FC = () => {
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
    setStageName(((prevState) => ({
      ...prevState,
      name: e.target.value,
    })));
  };

  const sendStage = async (): Promise<void> => {
    try {
      await createStage(token, stageName);
      fetchStages();
    } catch (error) {
      
    }
  };

  const eraseStage = async (index: number): Promise<void> => {
    try {
      const stageId = (index + 1);
      await deleteStage(token, stageId);
      fetchStages();
    } catch (error) {
      
    }
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
                <div className="trash" onClick={() => eraseStage(index)}>
                  <SVGTrash color="var(--tertiary-color)" />
                </div>
              </div>
            );
          })
        ) : (
          <div>"No stages found"</div>
        )}
        <div className="addStage" onClick={toggleAddStage}>
          <SVGAdd color="var(--tertiary-color)" />
        </div>
        {addStage && (
          <div className="addStage">
            <MyInput
              type={"name"}
              name={"stageName"}
              value={stageName.name || ""}
              placeholder={""}
              disabled={false}
              onChangeFunction={inputHandler}
              className={"loginInputDesign marginTopBottom"}
            />
            <MyButton
              text="Login"
              onClickFunction={sendStage}
              className="loginButtonDesign marginTopBottom"
            />
          </div>
        )}
      </div>
    </>
  );
};
