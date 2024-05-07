import { MyCard } from "../../common/MyCard/MyCard";
import { SVGCalendar } from "../../common/SVGCalendar/SVGCalendar";
import { SVGCourses } from "../../common/SVGCourses/SVGCourses";
import { SVGEvents } from "../../common/SVGEvents/SVGEvents";
import { SVGMessages } from "../../common/SVGMessages/SVGMessages";
import { SVGNotifications } from "../../common/SVGNotifications/SVGNotifications";
import { SVGRegister } from "../../common/SVGRegister/SVGRegister";
import { SVGStages } from "../../common/SVGStages/SVGStages";
import { SVGSubjects } from "../../common/SVGSubjects/SVGSubjects";
import { SVGUser } from "../../common/SVGUser/SVGUser";
import "./Home.css";

export const Home: React.FC = () => {
  return (
    <>
      <div className="homeDesign">
        <MyCard image={<SVGRegister color="var(--secondary-color)" />} title="Registro" url="/register"/>
        <MyCard image={<SVGUser color="var(--secondary-color)" />} title="Usuarios" url="/stages"/>
        <MyCard image={<SVGStages color="var(--secondary-color)" />} title="Etapas" url="/stages" />
        <MyCard image={<SVGCourses color="var(--secondary-color)" />} title="Cursos" url="/courses"/>
        <MyCard image={<SVGSubjects color="var(--secondary-color)" />} title="Asignaturas" url="/subjects"/>
        <MyCard image={<SVGEvents color="var(--secondary-color)" />} title="Eventos" url="/events"/>
        <MyCard image={<SVGCalendar color="var(--secondary-color)" />} title="Calendario" url="/calendar"/>
        <MyCard image={<SVGMessages color="var(--secondary-color)" />} title="Mensajes" url="/messages"/>
        <MyCard image={<SVGNotifications color="var(--secondary-color)" />} title="Notificaciones" url="/stages"/>
        <div className="logoHome">
          <div className="title">APP School</div>
        </div>
      </div>
    </>
  );
};
