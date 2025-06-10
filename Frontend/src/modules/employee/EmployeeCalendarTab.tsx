import React from 'react';
import type { Employee } from './mockEmployees';
import { CalendarDays, AlertCircle } from 'lucide-react';

interface Props {
  employees: Employee[];
}

const EmployeeCalendarTab: React.FC<Props> = ({ employees }) => {
  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const eventColors: Record<string, string> = {
    shift: 'bg-orange-500',
    vacation: 'bg-blue-400',
    sick: 'bg-red-400',
  };

const getEvents = (emp: Employee) => {
  const all: { type: string; start: string; end?: string }[] = [];

  if (Array.isArray(emp.schedule)) {
    for (const s of emp.schedule) {
      if (typeof s === 'object' && 'start' in s) {
        all.push({ type: 'shift', ...s });
      }
    }
  }

  if (Array.isArray(emp.vacations)) {
    for (const v of emp.vacations) {
      if (typeof v === 'object' && 'start' in v) {
        all.push({ type: 'vacation', ...v });
      }
    }
  }

  if (Array.isArray(emp.sickLeaves)) {
    for (const i of emp.sickLeaves) {
      if (typeof i === 'object' && 'start' in i) {
        all.push({ type: 'sick', ...i });
      }
    }
  }

  return all;
};

  return (
    <div className="overflow-auto h-[80vh] border rounded-lg bg-white dark:bg-slate-800">
      {/* Encabezado con días */}
      <div className="grid grid-cols-8 sticky top-0 bg-gray-100 dark:bg-slate-700 text-sm font-semibold text-center z-10">
        <div className="p-2 text-left">Empleado</div>
        {weekDays.map((d, i) => (
          <div key={i} className="p-2 border-l">
            {d}
          </div>
        ))}
      </div>

      {/* Filas de empleados */}
      {employees.map(emp => {
        const events = getEvents(emp);
        return (
          <div
            key={emp.id}
            className="grid grid-cols-8 border-t border-gray-200 dark:border-slate-600 text-sm"
          >
            {/* Nombre */}
            <div className="p-2 font-medium truncate flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-orange-500" />
              {emp.name}
              {emp.contractEnd && new Date(emp.contractEnd) < new Date() && (
              <span className="ml-1 text-red-500" aria-label="Contrato vencido">
                   <AlertCircle className="w-4 h-4" />
              </span>              )}
             </div>

            {/* Día por día */}
            {weekDays.map((_, dayIndex) => {
              const dayEvents = events.filter(evt => {
                const start = new Date(evt.start);
                const end = evt.end ? new Date(evt.end) : start;
                return start.getDay() === ((dayIndex + 1) % 7) || (start <= new Date() && end >= new Date());
              });

              return (
                <div key={dayIndex} className="relative p-1 border-l h-12">
                  {dayEvents.map((evt, idx) => (
                    <div
                      key={idx}
                      className={`text-[10px] text-white px-1 py-0.5 rounded absolute left-1 right-1 top-1 ${eventColors[evt.type]}`}
                    >
                      {evt.type === 'shift' ? 'Turno' : evt.type === 'vacation' ? 'Vacaciones' : 'Incapacidad'}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeCalendarTab;
