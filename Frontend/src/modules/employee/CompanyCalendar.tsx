import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { mockEmployees } from '../mockEmployees';
import Drawer from './Drawer';
import type { CalendarEvent } from './NewActivityModal';
import Button from '../../components/Button';

const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const CompanyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selected, setSelected] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const monthStart = useMemo(() => new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), [currentDate]);

  const daysInMonth = useMemo(() => new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate(), [monthStart]);
  const startOffset = useMemo(() => (monthStart.getDay() + 6) % 7, [monthStart]);

  const monthDays = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => new Date(monthStart.getFullYear(), monthStart.getMonth(), i + 1));
  }, [monthStart, daysInMonth]);

  const changeMonth = (delta: number) => {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + delta, 1));
  };

  const addEvent = (evt: CalendarEvent) => {
    setEvents(e => [...e, evt]);
  };

  const eventsForDate = (date: Date) => {
    return events.filter(e => {
      const start = new Date(e.startDate);
      const end = e.endDate ? new Date(e.endDate) : start;
      if (e.recurrence === 'weekly') {
        return start <= date && end >= date && start.getDay() === date.getDay();
      }
      if (e.recurrence === 'monthly') {
        return start <= date && end >= date && start.getDate() === date.getDate();
      }
      return date >= start && date <= end;
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="secondary" icon={ChevronLeft} onClick={() => changeMonth(-1)} />
        <h2 className="text-xl font-bold">
          {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
        </h2>
        <Button variant="secondary" icon={ChevronRight} onClick={() => changeMonth(1)} />
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded overflow-hidden">
        {weekDays.map(d => (
          <div key={d} className="p-2 text-center font-medium bg-gray-100">
            {d}
          </div>
        ))}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2 bg-white" />
        ))}
        {monthDays.map(day => (
          <button
            key={day.toISOString()}
            onClick={() => setSelected(day)}
            className="p-2 h-24 text-left bg-white border hover:bg-orange-50 focus:outline-none"
          >
            <div className="text-sm font-semibold">{day.getDate()}</div>
            <ul className="space-y-1 mt-1">
              {eventsForDate(day).slice(0, 2).map((evt, idx) => (
                <li key={idx} className="text-xs truncate bg-orange-100 rounded px-1">
                  {evt.title}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
      <Drawer open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {selected.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h3>
              <Button icon={Plus} onClick={() => setModalOpen(true)}>
                Nueva actividad
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Personal disponible</h4>
                <ul className="space-y-1 max-h-40 overflow-y-auto">
                  {mockEmployees.filter(e => e.active).map(emp => (
                    <li key={emp.id} className="text-sm border-b last:border-none py-1">
                      {emp.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Actividades</h4>
                <ul className="space-y-2 max-h-40 overflow-y-auto">
                  {eventsForDate(selected).map((evt, idx) => (
                    <li key={idx} className="p-2 border rounded">
                      <p className="font-medium">{evt.title}</p>
                      <p className="text-xs text-gray-500">{evt.description}</p>
                      {evt.visibility === 'public' && (
                        <p className="text-xs text-gray-400">Creado por: {evt.createdBy}</p>
                      )}
                    </li>
                  ))}
                  {eventsForDate(selected).length === 0 && (
                    <li className="text-sm text-gray-500">Sin actividades</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Drawer>
      <NewActivityModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={addEvent}
      />
    </div>
  );
};

export default CompanyCalendar;