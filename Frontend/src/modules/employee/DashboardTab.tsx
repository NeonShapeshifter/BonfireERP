import React from 'react';
import { Users, UserCheck, CalendarX2, FileText } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { mockEmployees } from '../mockEmployees';

const DashboardTab: React.FC = () => {
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(e => e.active).length;
  const totalAbsences = mockEmployees.reduce((sum, e) => sum + e.absences, 0);
  const totalContracts = mockEmployees.filter(e => e.contractType).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total de empleados" value={totalEmployees} icon={Users} />
      <StatCard title="Empleados activos" value={activeEmployees} icon={UserCheck} />
      <StatCard title="Ausencias" value={totalAbsences} icon={CalendarX2} />
      <StatCard title="Contratos" value={totalContracts} icon={FileText} />
    </div>
  );
};

export default DashboardTab;
