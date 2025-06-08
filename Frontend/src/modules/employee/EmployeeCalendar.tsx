import { useMemo } from 'react';
import { mockEmployees } from '../mockEmployees';

interface WeekEvent {
  employeeId: number;
  type: 'shift' | 'vacation' | 'sick';
  startDay: number; // 0=Mon
  endDay: number; // inclusive
  label?: string;
}

const weekDays = ['Lunes', 'Martes', 'Mi\u00e9rcoles', 'Jueves', 'Viernes', 'S\u00e1bado', 'Domingo'];

const events: WeekEvent[] = [
  { employeeId: 1, type: 'shift', startDay: 0, endDay: 0, label: 'Turno' },
  { employeeId: 1, type: 'shift', startDay: 2, endDay: 2, label: 'Turno' },
  { employeeId: 1, type: 'vacation', startDay: 4, endDay: 5, label: 'Vacaciones' },
  { employeeId: 2, type: 'shift', startDay: 0, endDay: 3, label: 'Turno' },
  { employeeId: 3, type: 'sick', startDay: 1, endDay: 1, label: 'Incapacidad' },
  { employeeId: 3, type: 'shift', startDay: 4, endDay: 4, label: 'Turno' },
  { employeeId: 4, type: 'vacation', startDay: 2, endDay: 6, label: 'Vacaciones' },
  { employeeId: 5, type: 'shift', startDay: 0, endDay: 6, label: 'Turno' },
];

const colorMap: Record<WeekEvent['type'], string> = {
  shift: 'bg-orange-500',
  vacation: 'bg-blue-300',
  sick: 'bg-red-300',
};

const isEndingSoon = (date?: string) => {
  if (!date) return false;
  const end = new Date(date);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return diff > 0 && diff < 1000 * 60 * 60 * 24 * 30;
};

const EmployeeCalendar = () => {
  const byEmployee = useMemo(() => {
    const map: Record<number, WeekEvent[]> = {};
    events.forEach(evt => {
      if (!map[evt.employeeId]) map[evt.employeeId] = [];
      map[evt.employeeId].push(evt);
    });
    return map;
  }, []);

  return (
    <div className="flex h-full">
      <aside className="w-48 border-r overflow-y-auto">
        {mockEmployees.map(emp => (
          <div key={emp.id} className="px-2 py-2 border-b">{emp.name}</div>
        ))}
      </aside>
      <div className="flex-1 overflow-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-7 sticky top-0 bg-gray-100 z-10">
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center font-semibold border-r last:border-none">
                {day}
              </div>
            ))}
          </div>
          {mockEmployees.map(emp => {
            const empEvents = byEmployee[emp.id] || [];
            return (
              <div
                key={emp.id}
                className={`relative h-12 border-b ${empEvents.length === 0 ? 'bg-gray-50' : ''}`}
              >
                <div className="grid grid-cols-7 h-full">
                  {weekDays.map((_, i) => (
                    <div key={i} className="border-r last:border-none" />
                  ))}
                </div>
                {empEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    onClick={() => {}}
                    className={`absolute text-white text-xs flex items-center justify-center rounded ${colorMap[evt.type]}`}
                    style={{
                      left: `${(evt.startDay / 7) * 100}%`,
                      width: `${((evt.endDay - evt.startDay + 1) / 7) * 100}%`,
                      top: '0.25rem',
                      bottom: '0.25rem',
                    }}
                  >
                    {evt.label}
                  </div>
                ))}
                {isEndingSoon(emp.contractEnd) && (
                  <span className="absolute right-1 top-1 text-xs text-red-500">
                    Fin de contrato pronto
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCalendar;