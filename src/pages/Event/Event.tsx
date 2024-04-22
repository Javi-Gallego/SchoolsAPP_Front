import FullCalendar from "@fullcalendar/react";
import "./Event.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";

export default function Event() {
  const events = [
    {
      title: "prueba 1",
      start: "2024-04-01",
      end: "2024-04-03",
      message: "Excursión teatro2",
      backgroundColor: "blue",
    },
    {
      title: "prueba 2",
      start: "2024-04-05",
      end: "2024-04-05",
      message: "Excursión teatro2",
      backgroundColor: "blue",
    },
    {
      title: "prueba 3",
      date: "2024-04-07",
      end: "2024-04-010",
      message: "Fiesta privamera",
      backgroundColor: "green",
    },
    {
      title: "prueba 4",
      date: "2024-04-12",
      start: "2024-04-12",
      end: "2024-04-014",
      message: "Fiesta privamera",
      backgroundColor: "green",
    },
    {
      title: "mismo 1",
      date: "2024-04-20",
      message: "Excursión teatro",
      backgroundColor: "blue",
    },
    {
      title: "mismo 2",
      date: "2024-04-20",
      message: "Examen de matemáticas Tema 4",
      backgroundColor: "red",
    },
  ];

  const handleDateClick = (arg: DateClickArg) => {
    const event = events.find((event) => event.start === arg.dateStr);
    if (event) {
      alert(`Evento: ${event.message}`);
    } else {
      return Promise.resolve();
    }
  };

  return (
    <>
      <div className="container-calendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev",
            center: "title",
            end: "today, next",
          }}
          weekends={true}
          events={events}
          dateClick={handleDateClick}
          height="auto"
          eventBackgroundColor="red"
        />
      </div>
    </>
  );
}
