import './App.css';
import { useState } from 'react';
import MainDashboard from './modules/main/MainDashboard';
import EmployeeDashboard from './modules/employee/EmployeeDashboard';
import EmployeeTool from './modules/employee/EmployeeTool';
import EmployeeCalendar from './modules/employee/EmployeeCalendar';
import CompanyCalendar from './modules/employee/CompanyCalendar';

function App() {
  const [view, setView] = useState<'main' | 'dashboard' | 'tool' | 'calendar' | 'company'>('main');

  return (
    <div className="h-full">
      <nav className="p-2 flex gap-2 border-b">
        <button onClick={() => setView('main')} className="text-sm px-3 py-1 bg-orange-100 rounded">Main</button>
        <button onClick={() => setView('dashboard')} className="text-sm px-3 py-1 bg-orange-100 rounded">EmployeeDashboard</button>
        <button onClick={() => setView('tool')} className="text-sm px-3 py-1 bg-orange-100 rounded">EmployeeTool</button>
        <button onClick={() => setView('calendar')} className="text-sm px-3 py-1 bg-orange-100 rounded">EmployeeCalendar</button>
        <button onClick={() => setView('company')} className="text-sm px-3 py-1 bg-orange-100 rounded">CompanyCalendar</button>
      </nav>

      <div className="h-[calc(100%-48px)] overflow-auto">
        {view === 'main' && <MainDashboard />}
        {view === 'dashboard' && <EmployeeDashboard />}
        {view === 'tool' && <EmployeeTool />}
        {view === 'calendar' && <EmployeeCalendar />}
        {view === 'company' && <CompanyCalendar />}
      </div>
    </div>
  );
}

export default App;