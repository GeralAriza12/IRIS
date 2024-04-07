import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useDisclosure, Box, Slide } from "@chakra-ui/react";
import "./Calendar.css";

const Calendar = () => {
  // Función para generar eventos recurrentes
  const generateRecurringEvents = (interval, title, color) => {
    const events = [];
    let currentDate = new Date(); // Comienza con la fecha actual
    currentDate.setDate(30); // Que día del mes será el pago oportuno
    currentDate.setHours(0, 0, 0, 0); // Asegura que la hora es la medianoche

    // Genera eventos para los próximos 12 meses
    for (let i = 0; i < 12; i++) {
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 1);

      events.push({
        title,
        start: currentDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
        color,
      });

      // Avanza al siguiente mes
      currentDate.setMonth(currentDate.getMonth() + interval);
    }

    return events;
  };

  const [events, setEvents] = useState([
    {
      title: "Pago Realizado - Administración",
      start: "2024-04-10",
      end: "2024-04-10",
      color: "green",
    },
    {
      title: "Pago Pendiente - Parqueadero",
      start: "2024-04-15",
      end: "2024-04-15",
      color: "red",
    },
    ...generateRecurringEvents(1, "Pago Oportuno", "orange"),
  ]);

  const handleDateSelect = (selectInfo) => {
    // Aqgregar un nuevo evento o ingresar un nuevo pago ...
    const title = prompt("Ingrese el título del evento");
    const newEvent = {
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      color: "red", // Asumiendo que el nuevo evento es pendiente
    };
    setEvents([...events, newEvent]);
  };

  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, onOpen } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    onOpen();
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />

      <Slide
        onClick={onOpen}
        direction="bottom"
        in={isOpen}
        style={{ zIndex: 10 }}
      >
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="#2c3e50"
          rounded="md"
          shadow="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {selectedEvent ? selectedEvent.title : "No hay evento seleccionado"}
        </Box>
      </Slide>
    </div>
  );
};

export default Calendar;
