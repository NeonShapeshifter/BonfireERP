import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Drawer from './Drawer';
import NewActivityModal, { CalendarEvent } from './NewActivityModal';
import Button from '../../components/Button';
import { mockEmployees } from './mockEmployees';

const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const CompanyCalendar: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const monthStart = useMemo(() => new Date(date.getFullYear(), date.getMonth(), 1), [date]);
  const daysInMonth = useMemo(() => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(), [date]);
  const startOffset = useMemo(() => (monthStart.getDay() + 6) % 7, [monthStart]);

  const days = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1));
  }, [date, daysInMonth]);

  const eventsFor = (d: Date) => {
    return events.filter(evt => {
      const start = new Date(evt.startDate);
      const end = evt.endDate ? new Date(evt.endDate) : start;
      if (evt.recurrence === 'weekly') return start <= d && end >= d && start.getDay() === d.getDay();
      if (evt.recurrence === 'monthly') return start <= d && end >= d && start.getDate() === d.getDate();
      return d >= start && d <= end;
    });
  };

  const addEvent = (e: CalendarEvent) => setEvents(prev => [...prev, e]);

  const changeMonth = (delta: number) => setDate(d => new Date(d.getFullYear(), d.getMonth() + delta, 1));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button variant="secondary" icon={ChevronLeft} onClick={() => changeMonth(-1)} />
        <h2 className="text-xl font-bold">
          {date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
        </h2>
        <Button variant="secondary" icon={ChevronRight} onClick={() => changeMonth(1)} />
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded overflow-hidden">
        {weekdays.map(d => (
          <div key={d} className="bg-gray-100 text-center p-2 font-semibold">
            {d}
          </div>
        ))}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-white h-24" />
        ))}
        {days.map(d => (
          <button
            key={d.toISOString()}
            onClick={() => setSelectedDate(d)}
            className="bg-white border h-24 p-1 text-left hover:bg-orange-50"
          >
            <div className="text-sm font-medium">{d.getDate()}</div>
            <ul className="text-xs space-y-0.5 mt-1">
              {eventsFor(d).slice(0, 2).map((e, idx) => (
                <li key={idx} className="truncate rounded bg-orange-100 px-1">
                  {e.title}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <Drawer open={!!selectedDate} onClose={() => setSelectedDate(null)}>
        {selectedDate && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">
                {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h3>
              <Button icon={Plus} onClick={() => setModalOpen(true)}>
                Nueva actividad
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Personal disponible</h4>
                <ul className="text-sm max-h-40 overflow-y-auto space-y-1">
                  {mockEmployees.filter(e => e.active).map(e => (
                    <li key={e.id}>{e.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Actividades</h4>
                <ul className="text-sm max-h-40 overflow-y-auto space-y-2">
                  {eventsFor(selectedDate).map((e, i) => (
                    <li key={i} className="border p-2 rounded">
                      <p className="font-semibold">{e.title}</p>
                      <p className="text-xs text-gray-500">{e.description}</p>
                    </li>
                  ))}
                  {eventsFor(selectedDate).length === 0 && (
                    <li className="text-xs text-gray-500">Sin actividades</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <NewActivityModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={addEvent} />
    </div>
  );
};

export default CompanyCalendar;
