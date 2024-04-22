import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export const Calendar = () => {
    return (
        <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        />
    );
};