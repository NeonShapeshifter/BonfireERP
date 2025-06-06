import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

interface PermissionEditorProps {
  open: boolean;
  initial: string[];
  onSave: (perms: string[]) => void;
  onClose: () => void;
}

interface Module {
  id: string;
  label: string;
  tools: { id: string; label: string }[];
}

const availableModules: Module[] = [
  {
    id: 'inventario',
    label: 'Inventario',
    tools: [
      { id: 'ver', label: 'Ver' },
      { id: 'editar', label: 'Editar' },
      { id: 'crear', label: 'Crear' },
      { id: 'eliminar', label: 'Eliminar' },
    ],
  },
  {
    id: 'empleados',
    label: 'Empleados',
    tools: [
      { id: 'ver', label: 'Ver' },
      { id: 'editar', label: 'Editar' },
      { id: 'crear', label: 'Crear' },
      { id: 'eliminar', label: 'Eliminar' },
    ],
  },
  {
    id: 'finanzas',
    label: 'Finanzas',
    tools: [
      { id: 'ver', label: 'Ver' },
      { id: 'editar', label: 'Editar' },
      { id: 'crear', label: 'Crear' },
      { id: 'eliminar', label: 'Eliminar' },
    ],
  },
  {
    id: 'facturacion',
    label: 'Facturaci\u00f3n',
    tools: [
      { id: 'ver', label: 'Ver' },
      { id: 'editar', label: 'Editar' },
      { id: 'crear', label: 'Crear' },
      { id: 'eliminar', label: 'Eliminar' },
    ],
  },
];

const crudOptions = [
  { id: 'read', label: 'Leer' },
  { id: 'create', label: 'Crear' },
  { id: 'update', label: 'Actualizar' },
  { id: 'delete', label: 'Eliminar' },
];

const PermissionEditor = ({ open, initial, onSave, onClose }: PermissionEditorProps) => {
  const [permissions, setPermissions] = useState<string[]>([]);
  const [advanced, setAdvanced] = useState(false);

  useEffect(() => {
    if (open) {
      setPermissions(initial);
    }
  }, [initial, open]);

  const hasPerm = (perm: string) => permissions.includes(perm);
  const toggle = (perm: string) => {
    setPermissions(prev =>
      prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]
    );
  };

  return (
    <Modal
      isOpen={open}
      title="Editar permisos"
      onClose={onClose}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(permissions)}>Guardar</Button>
        </>
      }
    >
      <div className="space-y-4">
        {availableModules.map(mod => (
          <div key={mod.id} className="border rounded p-3">
            <h4 className="font-bold mb-2">{mod.label}</h4>
            <div className="space-y-1">
              {mod.tools.map(tool => (
                <div key={tool.id}>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hasPerm(`${mod.id}:${tool.id}`)}
                      onChange={() => toggle(`${mod.id}:${tool.id}`)}
                    />
                    {tool.label}
                  </label>
                  {advanced && (
                    <div className="ml-6 grid grid-cols-2 gap-1">
                      {crudOptions.map(opt => (
                        <label key={opt.id} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={hasPerm(`${mod.id}:${tool.id}:${opt.id}`)}
                            onChange={() => toggle(`${mod.id}:${tool.id}:${opt.id}`)}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setAdvanced(!advanced)}
          className="text-orange-500 hover:underline"
        >
          {advanced ? 'Ocultar configuraci\u00f3n avanzada' : 'Mostrar configuraci\u00f3n avanzada'}
        </button>
      </div>
    </Modal>
  );
};

export default PermissionEditor;