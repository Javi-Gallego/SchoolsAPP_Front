import "./Event.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/credentials";
import { useUserInfoStore } from "../../store/userData";
import { Course, MyEvent, Stage, setEvent } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { createEvent, getCourses, getEvents, getStages, } from "../../services/ApiCalls";
import { SVGAdd } from "../../common/SVGAdd/SVGAdd";
import { Modal } from "../../common/Modal/Modal";
import { NativeSelect } from "@mantine/core";
import { MyInput } from "../../common/MyInput/MyInput";
import { MyButton } from "../../common/MyButton/MyButton";
import { DateInput } from "@mantine/dates";

export const Events: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const schoolId = useAuthStore((state) => state.schoolId);
  const roleName = useUserInfoStore((state) => state.roleName);
  const userId = useUserInfoStore((state) => state.id);
  const navigate = useNavigate();
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [stages, setStages] = useState<Stage[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [eventType, setEventType] = useState<string>("");
  const [stageType, setStageType] = useState<string>("");
  const [courseType, setCourseType] = useState<string>("");
  const [startValue, setStartValue] = useState<Date>(new Date());
  const [endValue, setEndValue] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<setEvent>({
    title: "",
    start: new Date(),
    end: new Date(),
    description: "",
    publisherId: userId,
    stageId: 0,
    courseId: 0,
    schoolId: schoolId,
    backgroundColor: "",
  });

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
    if (roleName === "parent" || roleName === "student") {
      navigate("/home");
    }
    if (!firstFetch) {
      fetchEvents();
      fetchStages();
      fetchCourses();
      setFirstFetch(true);
    }
  }, []);

  useEffect(() => {
    let newbackgroundColor = "";
    switch (eventType) {
      case "Examen":
        newbackgroundColor = "rgb(105, 35, 35)";
        break;
      case "Trabajo":
        newbackgroundColor = "rgb(37, 105, 35)";
        break;
      case "Reunión":
        newbackgroundColor = "rgb(35, 60, 105)";
        break;
      case "Excursión":
        newbackgroundColor = "rgb(158, 157, 107)";
        break;
      case "Fiesta":
        newbackgroundColor = "rgb(248, 149, 56)";
        break;
      case "Vacaciones":
        newbackgroundColor = "rgb(138, 83, 143)";
        break;
    }
    setNewEvent((prevState) => ({
      ...prevState,
      backgroundColor: newbackgroundColor,
    }));
  }, [eventType]);

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
      let query = `?schoolId=${schoolId}&limitDate=true`;

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
          stage: event.stageId === null ? "Todas las etapas" : event.stage.name,
          course:
            event.courseId === null ? "Todos los cursos" : event.course.name,
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

  const eventHandler = (data: any, fieldName: string) => {
    let selectedArray: any[] = [];
    let newValue: any;
    switch (fieldName) {
      case "courseId":
        setCourseType(data);
        selectedArray = courses;
        break;
      case "stageId":
        setStageType(data);
        selectedArray = stages;
        break;
      case "title":
        setEventType(data);
        break;
    }
    if (fieldName === "courseId" || fieldName === "stageId") {
      const selectedItem = selectedArray.find((item) => item.name === data);
      newValue = selectedItem ? selectedItem.id : null;
    } else {
      newValue = data;
    }
    setNewEvent((prevState) => ({
      ...prevState,
      [fieldName]: newValue,
    }));
  };

  const startDateHandler = (value: Date | null) => {
    eventHandler(value, "start");
    eventHandler(value, "end");
  };

  const sendEvent = async () => {
    try {
      if (
        eventType === "" ||
        stageType === "" ||
        courseType === "" ||
        newEvent.description === "" ||
        newEvent.start === new Date() ||
        newEvent.end === new Date()
      ) {
        return;
      }
      const event = await createEvent(token, newEvent);
      fetchEvents();
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="eventsDesign">
        <div className="eventCard">
          <div className="eventTitle">Título</div>
          <div className="eventDate">Inicio</div>
          <div className="eventDate">Fin</div>
          <div className="eventDescription">Mensaje</div>
          <div className="eventPublisher">Publicado por</div>
          <div className="eventStage">Etapa</div>
          <div className="eventCourse">Curso</div>
        </div>
        {!firstFetch ? (
          <div>Loading...</div>
        ) : events.length === 0 ? (
          <div>No hay eventos</div>
        ) : (
          events.map((event, index) => (
            <div key={index} className="eventCard">
              <div className="eventTitle">{event.title}</div>
              <div className="eventDate">{event.start}</div>
              <div className="eventDate">{event.end}</div>
              <div className="eventDescription">
                {event.extendedProps.description}
              </div>
              <div className="eventPublisher">
                {event.extendedProps.publisher}
              </div>
              <div className="eventStage">{event.extendedProps.stage}</div>
              <div className="eventCourse">{event.extendedProps.course}</div>
            </div>
          ))
        )}
        <div className="addEvent" onClick={toggleModal}>
          <SVGAdd color="var(--tertiary-color)" />
        </div>
      </div>
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
        <div className="titleCourseModal">Añadir nuevo evento</div>
        <div className="stageCourseModal">
          <div className="eventTextModal">Selecciona tipo de evento</div>
          <NativeSelect
            name="title"
            value={eventType}
            style={{ margin: "1em" }}
            onChange={(event) =>
              eventHandler(event.currentTarget.value, event.currentTarget.name)
            }
            data={["", "Examen", "Trabajo", "Reunión", "Excursión", "Fiesta", "Vacaciones"]}
          />
        </div>
        <div className="stageCourseModal">
          <div className="eventTextModal">Selecciona una etapa</div>
          <NativeSelect
            name="stageId"
            value={stageType}
            style={{ margin: "1em" }}
            onChange={(event) =>
              eventHandler(event.currentTarget.value, event.currentTarget.name)
            }
            data={["Elige una etapa", ...stages.map((stage) => stage.name)]}
          />
        </div>
        <div className="stageCourseModal">
          <div className="eventTextModal">Selecciona una clase</div>
          <NativeSelect
            name="courseId"
            value={courseType}
            style={{ margin: "1em" }}
            onChange={(event) =>
              eventHandler(event.currentTarget.value, event.currentTarget.name)
            }
            data={["Elige una clase", ...courses.map((course) => course.name)]}
          />
        </div>
        <div className="stageCourseModal">
          <div className="eventTextModal">Inicio Evento</div>
          <DateInput
            style={{ marginBottom: "0.5em" }}
            locale="es"
            clearable
            name="start"
            placeholder="Inicio evento"
            value={startValue}
            onChange={startDateHandler}
          />
        </div>
        <div className="yearCourseModal">
          <div>Descripción del evento</div>
        </div>
        <div className="eventDescriptionModal">
          <MyInput
            type={"description"}
            name={"description"}
            value={newEvent.description || ""}
            placeholder={"Descripción"}
            disabled={false}
            onChangeFunction={(event) =>
              eventHandler(event.currentTarget.value, event.currentTarget.name)
            }
            className={"modalInputDesign"}
          />
        </div>
        <MyButton
          text="Añadir evento"
          onClickFunction={sendEvent}
          className="button modalButtonDesign marginTopBottom"
        />
      </Modal>
    </>
  );
};
