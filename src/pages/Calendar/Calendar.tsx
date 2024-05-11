import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventClickArg } from "@fullcalendar/core";
import { useEffect, useState } from "react";
import { Course, MyEvent, Stage } from "../../interfaces/interfaces";
import { Modal } from "../../common/Modal/Modal";
import { getCourses, getEvents, getStages } from "../../services/ApiCalls";
import { useAuthStore } from "../../store/credentials";
import { NativeSelect } from "@mantine/core";
import { useUserInfoStore } from "../../store/userData";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../../utils/functions";

export const Calendar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.token);
  const schoolId = useAuthStore((state) => state.schoolId);
  const roleName = useUserInfoStore((state) => state.roleName);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<MyEvent | null>(null);
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [stages, setStages] = useState<Stage[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [stageType, setStageType] = useState<string>("");
  const [courseType, setCourseType] = useState<string>("");

  useEffect(() => {
    if(!token || isTokenExpired(token)){
      logout();
      navigate("/");
    }
    if (!firstFetch) {
      fetchEvents();
      fetchStages();
      fetchCourses();
      setFirstFetch(true);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [stageType, courseType]);

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

  const fetchEvents = async () => {
    try {
      let query = `?schoolId=${schoolId}&limitDate=false`;

      const stage = stages.find((stage) => stage.name === stageType);
      const stageId = stage ? stage.id : null;
      if (stageId) {
        query += `&stageId=${stageId}`;
      }

      const course = courses.find((course) => course.name === courseType);
      const courseId = course ? course.id : null;
      if (courseId) {
        query += `&courseId=${courseId}`;
      }

      const newEvents = await getEvents(token, query);

      const filteredEvents = newEvents.data.map((event) => ({
        title: event.title,
        start: new Date(event.start).toISOString().slice(0, 10),
        end: new Date(event.end).toISOString().slice(0, 10),
        extendedProps: {
          description: event.description,
          publisher: event.publisher.firstName + " " + event.publisher.lastName,
          stage:
            event.stageId === null && event.stage
              ? event.stage.name
              : "Todas las etapas",
          course:
            event.courseId === null && event.course
              ? event.course.name
              : "Todos los cursos",
        },
        backgroundColor: event.backgroundColor,
      }));
      setEvents(filteredEvents);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event as unknown as MyEvent;
    setEventInfo(event);
    toggleModal();
  };

  return (
    <div className="calendarDesign">
      {roleName === "teacher" ||
      roleName === "admin" ||
      roleName === "super_admin" ||
      roleName === "personal" ? (
        <div className="calendarFilters">
          <div className="filterRow">
            <div className="filterSelect">
              <NativeSelect
                value={stageType}
                style={{ margin: "1em" }}
                onChange={(event) => setStageType(event.currentTarget.value)}
                data={["Elige una etapa", ...stages.map((stage) => stage.name)]}
              />
            </div>
            <div className="filterSelect">
              <NativeSelect
                value={courseType}
                style={{ margin: "1em" }}
                onChange={(event) => setCourseType(event.currentTarget.value)}
                data={[
                  "Elige una clase",
                  ...courses.map((course) => course.name),
                ]}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="containerCalendar">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          contentHeight="74vh"
          firstDay={1}
          aspectRatio={2}
        />
        </div>
        <Modal isOpen={isOpen} toggleModal={toggleModal}>
          <div className="showEventCalendar">
            {eventInfo && (
              <div className="eventCalendar">
                <div className="calendarEventTitle">
                  {eventInfo.title}
                  {": "}
                </div>
                <div className="calendarEventCard">
                  {eventInfo.extendedProps.description}
                </div>
                <div className="calendarEventTitle">Etapa:</div>
                <div className="calendarEventCard">{eventInfo.extendedProps.stage}</div>
                <div className="calendarEventTitle">Curso:</div>
                <div className="calendarEventCard">
                  {eventInfo.extendedProps.course}
                </div>
                <div className="calendarEventTitle">Publicado por:</div>
                <div className="calendarEventCard">
                  {eventInfo.extendedProps.publisher}
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>

  );
};
