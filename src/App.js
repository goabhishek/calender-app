import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Festival',
    event: [],
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
    colorEvento: 'yellow',
    color: 'yellow',
  },
  {
    title: 'Events',
    event: [],
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
    colorEvento: 'green',
    color: 'green',
  },
  {
    title: 'Holi',
    event: [],
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
    colorEvento: 'green',
    color: 'green',
  },
  {
    title: 'Newyear',
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
    colorEvento: 'green',
    color: 'green',
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        // alert('CLASH');
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
    console.log(setAllEvents);
  }

  return (
    <div className='App'>
      <h1>Calendar</h1>
      <div
        style={{
          width: '1200px',
          border: '2px solid red',
          display: 'flex',

          marginLeft: '150px',
        }}
      >
        <div style={{ width: '600px' }}>
          <Calendar
            localizer={localizer}
            events={allEvents}
            startAccessor='start'
            endAccessor='end'
            views={['month']}
            style={{ height: 400, margin: '80px', border: 'none' }}
            eventPropGetter={(events) => {
              const backgroundColor = events.colorEvento ? events.colorEvento : 'blue';
              const color = events.color ? events.color : 'white';
              return { style: { backgroundColor, color } };
            }}
          />
        </div>
        <div>
          <h1>Importent days</h1>

          {allEvents.map((item) => {
            return (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Events</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{item.event}</td>

                      <td>{item.title}</td>
                      <td>Events</td>
                      <td> Delete / Edit</td>
                      {/* <td>{item.start}</td>
                      <td>{item.end}</td> */}
                    </tr>
                  </tbody>
                </table>
              </>

              //  <h2>{setAllEvents}</h2>
              //         <h2>{setNewEvent}</h2>
              //         <h2>{handleAddEvent}</h2>
            );
          })}

          <div>
            <div
              style={{
                alignSelf: 'end',
                marginTop: '400px',
                marginLeft: '30px',
                border: '2px solid red',
              }}
            >
              <button
                onClick={handleOpen}
                style={{ color: 'white', backgroundColor: 'blue', height: '40px', width: '300px' }}
              >
                ADD IMPORTENT DAY
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
              >
                <Box sx={style}>
                  <Typography id='modal-modal-title' variant='h6' component='h2'>
                    Add New Event
                  </Typography>

                  <div>
                    {/* <input
                  type='text'
                  placeholder='Add Title'
                  style={{ width: '60%', marginRight: '10px' }}
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                /> */}
                    <form>
                      {/* <label id='label'>Select priority </label> */}
                      <select
                        // value={newEvent.title}
                        onChange={(e) => setNewEvent({ title: e.target.value })}
                        id='priority'
                      >
                        {events.map((item, i) => (
                          <option>{item.title}</option>
                        ))}
                        {/* <option> HIGH </option>
                    <option> MEDIUM </option>
                    <option> LOW </option> */}
                      </select>
                      <br />
                      <input
                        type='text'
                        placeholder='Add Event'
                        style={{ width: '60%', marginRight: '10px', marginTop: '15px' }}
                        value={newEvent.event}
                        onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
                      />
                    </form>
                    <br />
                    <DatePicker
                      placeholderText='Start Date'
                      style={{ marginRight: '10px', margin: 5 }}
                      selected={newEvent.start}
                      onChange={(start) => setNewEvent({ ...newEvent, start })}
                    />
                    <DatePicker
                      style={{ marginRight: '10px', margin: '5px' }}
                      placeholderText='End Date'
                      selected={newEvent.end}
                      onChange={(end) => setNewEvent({ ...newEvent, end })}
                    />
                    <button onClose={handleClose} stlye={{ marginTop: '10px' }} onClick={handleAddEvent}>
                      Add Event
                    </button>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
