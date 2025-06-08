import React, { useState } from 'react';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';

export interface CalendarEvent {
  title: string;
  description: string;
  createdBy: string;
  visibility: 'private' | 'public';
  recurrence: 'none' | 'monthly' | 'weekly';
  startDate: string;
  endDate?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
}

const NewActivityModal: React.FC<Props> = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState<CalendarEvent>({
    title: '',
    description: '',
    createdBy: 'Admin',
    visibility: 'public',
    recurrence: 'none',
    startDate: '',
    endDate: '',
  });

  const update = (field: keyof CalendarEvent, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleSave = () => {
    onSave({ ...form, endDate: form.endDate || undefined });
    onClose();
    setForm({
      title: '',
      description: '',
      createdBy: 'Admin',
      visibility: 'public',
      recurrence: 'none',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <Modal
      isOpen={open}
      title="Nueva actividad"
      onClose={onClose}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </>
      }
    >
      <div className="space-y-2">
        <Input
          label="Título"
          value={form.title}
          onChange={e => update('title', e.target.value)}
        />
        <Input
          label="Descripción"
          value={form.description}
          onChange={e => update('description', e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium" htmlFor="visibility">
              Visibilidad
            </label>
            <select
              id="visibility"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700"
              value={form.visibility}
              onChange={e => update('visibility', e.target.value)}
            >
              <option value="public">Pública</option>
              <option value="private">Privada</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="recurrence">
              Recurrencia
            </label>
            <select
              id="recurrence"
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-700"
              value={form.recurrence}
              onChange={e => update('recurrence', e.target.value)}
            >
              <option value="none">Ninguna</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
            </select>
          </div>
        </div>
        <Input
          label="Inicio"
          type="date"
          value={form.startDate}
          onChange={e => update('startDate', e.target.value)}
        />
        <Input
          label="Fin (opcional)"
          type="date"
          value={form.endDate}
          onChange={e => update('endDate', e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default NewActivityModal;