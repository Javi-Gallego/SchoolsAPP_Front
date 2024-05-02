import { MyCard } from "../../common/MyCard/MyCard";
import { SVGCalendar } from "../../common/SVGCalendar/SVGCalendar";
import { SVGCourses } from "../../common/SVGCourses/SVGCourses";
import { SVGMessages } from "../../common/SVGMessages/SVGMessages";
import { SVGStages } from "../../common/SVGStages/SVGStages";
import { SVGSubjects } from "../../common/SVGSubjects/SVGSubjects";
import "./Home.css";

export const Home: React.FC = () => {
  return (
    <>
      <div className="homeDesign">
        <MyCard image={<SVGStages color="var(--secondary-color)" />} title="Etapas" url="/stages" />
        <MyCard image={<SVGCourses color="var(--secondary-color)" />} title="Cursos" url="/stages"/>
        <MyCard image={<SVGSubjects color="var(--secondary-color)" />} title="Asignaturas" url="/stages"/>
        <MyCard image={<SVGMessages color="var(--secondary-color)" />} title="Mensajes" url="/stages"/>
        <MyCard image={<SVGCalendar color="var(--secondary-color)" />} title="Calendario" url="/stages"/>
        <MyCard image={<SVGStages color="var(--secondary-color)" />} title="Etapas" url="/stages"/>
        <MyCard image={<SVGStages color="var(--secondary-color)" />} title="Etapas" url="/stages"/>
        <MyCard image={<SVGStages color="var(--secondary-color)" />} title="Etapas" url="/stages"/>
        <div className="logoHome">
          <div className="title">APP School</div>
          
        </div>
      </div>
    </>
  );
};
