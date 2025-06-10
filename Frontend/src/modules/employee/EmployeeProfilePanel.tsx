import React, { useState } from 'react';
import type { Employee } from './mockEmployees';
import Button from '../../components/Button';
import PermissionEditor from './PermissionEditor';

interface Props {
  employee: Employee;
  onClose: () => void;
}

const EmployeeProfilePanel: React.FC<Props> = ({ employee, onClose }) => {
  const [permEditorOpen, setPermEditorOpen] = useState(false);
  const [editingPerms, setEditingPerms] = useState<string[]>(employee.permissions);
  const [infoTab, setInfoTab] = useState<'documentos' | 'reportes'>('documentos');

  const isEndingSoon = (date?: string) => {
    if (!date) return false;
    const end = new Date(date);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return diff > 0 && diff < 1000 * 60 * 60 * 24 * 30;
  };

  const savePerms = (newPerms: string[]) => {
    setEditingPerms(newPerms);
    setPermEditorOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{employee.name}</h2>
        <Button variant="secondary" onClick={onClose}>Volver</Button>
      </div>

      {/* Info básica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Información general">
          <p><strong>Cédula:</strong> {employee.nationalId}</p>
          <p><strong>Correo:</strong> {employee.email}</p>
          <p><strong>Puesto:</strong> {employee.position}</p>
          <p><strong>Rol:</strong> {employee.role}</p>
          <p><strong>Sucursal:</strong> {employee.branch}</p>
          <p><strong>Salario:</strong> ${employee.salary}</p>
          <p><strong>Ausencias:</strong> {employee.absences}</p>
          {employee.tags?.length && (
            <p><strong>Etiquetas:</strong> {employee.tags.join(', ')}</p>
          )}
        </Card>

        <Card title="Contrato actual">
          <p><strong>Tipo:</strong> {employee.contractType}</p>
          <p><strong>Inicio:</strong> {employee.contractStart}</p>
          {employee.contractEnd && (
            <p>
              <strong>Fin:</strong> {employee.contractEnd}{' '}
              {new Date(employee.contractEnd) < new Date() && (
                <span className="text-red-500">(Vencido)</span>
              )}
              {isEndingSoon(employee.contractEnd) && (
                <span className="text-orange-500 ml-2">(Próximo a vencer)</span>
              )}
            </p>
          )}
        </Card>
      </div>

      {/* Historial y actividad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Actividad">
          <p><strong>Último ingreso:</strong> {employee.lastLogin}</p>
          <ul className="list-disc ml-5 text-sm">
            {employee.actions.map((a, i) => (
              <li key={i}>{a.date}: {a.action}</li>
            ))}
          </ul>
        </Card>

        <Card title="Historial de contrato (mock)">
          <ul className="text-sm space-y-1">
            <li>01/01/2024 – Asignado salario $3200</li>
            <li>01/01/2023 – Contrato renovado</li>
          </ul>
        </Card>
      </div>

      {/* Calendario */}
      <Card title="Calendario individual">
        <p><strong>Horario:</strong> {employee.schedule}</p>
        <p>
          <strong>Vacaciones:</strong> {employee.vacations.length
            ? employee.vacations.map(v => `${v.start}–${v.end}`).join(', ')
            : 'Ninguna'}
        </p>
        <p>
          <strong>Incapacidades:</strong> {employee.sickLeaves.length
            ? employee.sickLeaves.map(s => `${s.start}–${s.end}`).join(', ')
            : 'Ninguna'}
        </p>
      </Card>

      {/* Estadísticas y desempeño */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Estadísticas">
          <p>Puntualidad: {employee.stats.punctuality}%</p>
          <p>Días trabajados: {employee.stats.workedDays}</p>
          <p>Atrasos: {employee.stats.lateArrivals}</p>
        </Card>

        <Card title="Desempeño (mock)">
          <ul className="text-sm space-y-1">
            <li>📈 Evaluación abril: 4.5 ⭐</li>
            <li>🧠 Comentario: "Cumple metas y es proactivo."</li>
          </ul>
        </Card>
      </div>

      {/* Documentos y reportes */}
      <Card title="Archivos">
        <div className="flex gap-4 border-b mb-2">
          <button
            className={`pb-1 ${infoTab === 'documentos' ? 'border-b-2 border-orange-500' : ''}`}
            onClick={() => setInfoTab('documentos')}
          >
            Documentos
          </button>
          <button
            className={`pb-1 ${infoTab === 'reportes' ? 'border-b-2 border-orange-500' : ''}`}
            onClick={() => setInfoTab('reportes')}
          >
            Reportes
          </button>
        </div>
        {infoTab === 'documentos' ? (
          <>
            {employee.documents.length ? (
              <ul className="list-disc ml-5 text-sm">
                {employee.documents.map((d, i) => (
                  <li key={i}>{d.name} ({d.size})</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Sin documentos.</p>
            )}
          </>
        ) : (
          <>
            {employee.reports.length ? (
              employee.reports.map((r, i) => (
                <div key={i} className="border p-2 rounded mb-2">
                  <h5 className="font-semibold">{r.subject}</h5>
                  <p className="text-xs text-gray-500">{r.date} - {r.submittedBy}</p>
                  {r.classification && <p className="text-xs">Clasificación: {r.classification}</p>}
                  <p className="text-sm">{r.text}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Sin reportes.</p>
            )}
          </>
        )}
      </Card>

      {/* Permisos */}
      <Card title="Permisos">
        <p className="text-sm">{editingPerms.join(', ')}</p>
        <Button
          variant="secondary"
          onClick={() => setPermEditorOpen(true)}
        >
          Editar permisos
        </Button>
      </Card>

      {/* Bitácora de cambios */}
      <Card title="Bitácora (mock)">
        <ul className="text-sm list-disc ml-5">
          <li>01/06/2025 – Rol actualizado por RRHH</li>
          <li>15/05/2025 – Documento cargado</li>
        </ul>
      </Card>

      {/* Confirmación */}
      <Card title="Confirmaciones">
        <p className="text-sm">✔ Documento interno aceptado el 01/06/2025</p>
      </Card>

      <PermissionEditor
        open={permEditorOpen}
        initial={editingPerms}
        onSave={savePerms}
        onClose={() => setPermEditorOpen(false)}
      />
    </div>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow space-y-2">
    <h4 className="text-lg font-semibold">{title}</h4>
    {children}
  </div>
);

export default EmployeeProfilePanel;
