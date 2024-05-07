import { useEffect, useState } from "react";
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
import { getMessages } from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import { useUserInfoStore } from "../../store/userData";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const roleName = useUserInfoStore((state) => state.roleName);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [messages, setMessagesArray] = useState<any[]>([]);
  const [pendingMessages, setPendingMessages] = useState<number>(0);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    if (!firstFetch) {
      fetchMessages();
      setFirstFetch(true);
    }
  }, []);

  useEffect(() => {
    const pendingMessages = messages.reduce(
      (acc, message) => acc + message.unseenCount,
      0
    );
    setPendingMessages(pendingMessages);
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await getMessages(token);
      setMessagesArray(response.data);
    } catch (error) {}
  };
  console.log("roleName: ", roleName);
  return (
    <>
      <div className="homeDesign">
        {(roleName === "admin" || roleName === "super_admin") && (
          <>
            <MyCard
              image={<SVGRegister color="var(--secondary-color)" />}
              title="Registro"
              url="/register"
            />
            <MyCard
              image={<SVGUser color="var(--secondary-color)" />}
              title="Usuarios"
              url="/stages"
            />
            <MyCard
              image={<SVGStages color="var(--secondary-color)" />}
              title="Etapas"
              url="/stages"
            />
            <MyCard
              image={<SVGSubjects color="var(--secondary-color)" />}
              title="Asignaturas"
              url="/subjects"
            />
            <MyCard
              image={<SVGCourses color="var(--secondary-color)" />}
              title="Cursos"
              url="/courses"
            />
          </>
        )}
        {(roleName === "admin" ||
          roleName === "super_admin" ||
          roleName === "teacher" ||
          roleName === "student") && (
          <MyCard
            image={<SVGEvents color="var(--secondary-color)" />}
            title="Eventos"
            url="/events"
          />
        )}
        <MyCard
          image={<SVGCalendar color="var(--secondary-color)" />}
          title="Calendario"
          url="/calendar"
        />
        <MyCard
          image={<SVGMessages color="var(--secondary-color)" />}
          title="Mensajes"
          url="/messages"
          pendingCount={pendingMessages > 0 ? pendingMessages : undefined}
        />
        <MyCard
          image={<SVGNotifications color="var(--secondary-color)" />}
          title="Notificaciones"
          url="/stages"
        />
        <div className="logoHome">
          <div className="title">APP School</div>
        </div>
      </div>
    </>
  );
};
