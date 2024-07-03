import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useDisclosure, Box, Slide, useColorModeValue } from "@chakra-ui/react";
import "./Calendar.css";

const Calendar = () => {
  const generateRecurringEvents = (interval, title, color) => {
    const events = [];
    let currentDate = new Date();
    currentDate.setDate(30);
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 12; i++) {
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 1);

      events.push({
        title,
        start: currentDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
        color,
      });

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
    const title = prompt("Ingrese el título del evento");
    const newEvent = {
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      color: "red",
    };
    setEvents([...events, newEvent]);
  };

  const { isOpen, onOpen } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    onOpen();
  };

  const boxBg = useColorModeValue("#2c3e50", "gray.800");

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
          bg={boxBg}
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
