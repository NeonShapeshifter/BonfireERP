export interface Employee {
  id: number;
  name: string;
  nationalId: string;
  email: string;
  branch: string;
  position: string;
  role: string;
  tags?: string[];
  permissions: string[];
  salary: number;
  active: boolean;
  contractType: 'Definido' | 'Indefinido';
  absences: number;
}

export const mockEmployees: Employee[] = [
  { id: 1, name: 'Carlos Pérez', nationalId: '8-123-456', email: 'carlos.perez@example.com', branch: 'Sucursal Centro', position: 'Gerente', role: 'admin', tags: ['supervisor'], permissions: ['empleados:roles', 'inventario:ver'], salary: 3000, active: true, contractType: 'Indefinido', absences: 1 },
  { id: 2, name: 'María González', nationalId: '9-234-567', email: 'maria.gonzalez@example.com', branch: 'Sucursal Norte', position: 'Analista', role: 'finanzas', tags: ['atención al cliente'], permissions: ['finanzas:ver'], salary: 1800, active: true, contractType: 'Definido', absences: 0 },
  { id: 3, name: 'Luis Rodríguez', nationalId: '7-345-678', email: 'luis.rodriguez@example.com', branch: 'Sucursal Sur', position: 'Bodeguero', role: 'inventario', permissions: ['inventario:editar'], salary: 1200, active: false, contractType: 'Indefinido', absences: 3 },
  { id: 4, name: 'Ana Martínez', nationalId: '8-456-789', email: 'ana.martinez@example.com', branch: 'Sucursal Centro', position: 'Cajera', role: 'caja', tags: ['atención al cliente'], permissions: ['caja:ver'], salary: 1100, active: true, contractType: 'Definido', absences: 2 },
  { id: 5, name: 'José López', nationalId: '9-567-890', email: 'jose.lopez@example.com', branch: 'Sucursal Norte', position: 'Supervisor', role: 'rrhh', tags: ['supervisor'], permissions: ['empleados:ver'], salary: 2500, active: true, contractType: 'Indefinido', absences: 0 },
  { id: 6, name: 'Patricia Díaz', nationalId: '8-678-901', email: 'patricia.diaz@example.com', branch: 'Sucursal Sur', position: 'Contadora', role: 'finanzas', permissions: ['finanzas:editar'], salary: 2200, active: true, contractType: 'Indefinido', absences: 1 },
  { id: 7, name: 'Ricardo Castillo', nationalId: '7-789-012', email: 'ricardo.castillo@example.com', branch: 'Sucursal Centro', position: 'Vendedor', role: 'caja', tags: ['atención al cliente'], permissions: ['caja:ver'], salary: 1300, active: true, contractType: 'Definido', absences: 2 },
  { id: 8, name: 'Laura Sánchez', nationalId: '9-890-123', email: 'laura.sanchez@example.com', branch: 'Sucursal Norte', position: 'Asistente', role: 'rrhh', permissions: ['empleados:ver'], salary: 1400, active: true, contractType: 'Definido', absences: 1 },
  { id: 9, name: 'Jorge Herrera', nationalId: '8-901-234', email: 'jorge.herrera@example.com', branch: 'Sucursal Sur', position: 'Encargado de Inventario', role: 'inventario', tags: ['supervisor'], permissions: ['inventario:ver', 'inventario:editar'], salary: 2000, active: false, contractType: 'Indefinido', absences: 4 },
  { id: 10, name: 'Elena Vargas', nationalId: '7-012-345', email: 'elena.vargas@example.com', branch: 'Sucursal Centro', position: 'Analista de Datos', role: 'finanzas', permissions: ['finanzas:ver'], salary: 2100, active: true, contractType: 'Definido', absences: 0 },
  { id: 11, name: 'Gabriel Mendoza', nationalId: '8-234-567', email: 'gabriel.mendoza@example.com', branch: 'Sucursal Norte', position: 'Cajero', role: 'caja', permissions: ['caja:ver'], salary: 1000, active: true, contractType: 'Definido', absences: 3 },
  { id: 12, name: 'Paola Jiménez', nationalId: '9-345-678', email: 'paola.jimenez@example.com', branch: 'Sucursal Sur', position: 'Recursos Humanos', role: 'rrhh', permissions: ['empleados:roles'], salary: 2300, active: true, contractType: 'Indefinido', absences: 2 },
  { id: 13, name: 'Fernando Ortega', nationalId: '7-456-789', email: 'fernando.ortega@example.com', branch: 'Sucursal Centro', position: 'Encargado de Bodega', role: 'inventario', permissions: ['inventario:ver'], salary: 1700, active: false, contractType: 'Definido', absences: 5 },
  { id: 14, name: 'Karla Díaz', nationalId: '8-567-890', email: 'karla.diaz@example.com', branch: 'Sucursal Norte', position: 'Gerente de Ventas', role: 'admin', tags: ['supervisor'], permissions: ['inventario:ver', 'finanzas:ver'], salary: 3200, active: true, contractType: 'Indefinido', absences: 1 },
  { id: 15, name: 'Diego Navarro', nationalId: '9-678-901', email: 'diego.navarro@example.com', branch: 'Sucursal Sur', position: 'Soporte Técnico', role: 'caja', tags: ['atención al cliente'], permissions: ['caja:ver'], salary: 1500, active: true, contractType: 'Definido', absences: 0 },
  { id: 16, name: 'Andrea Flores', nationalId: '7-789-012', email: 'andrea.flores@example.com', branch: 'Sucursal Centro', position: 'Contadora', role: 'finanzas', permissions: ['finanzas:editar'], salary: 2400, active: true, contractType: 'Indefinido', absences: 2 },
  { id: 17, name: 'Manuel Ruiz', nationalId: '8-890-123', email: 'manuel.ruiz@example.com', branch: 'Sucursal Norte', position: 'Analista de Inventario', role: 'inventario', permissions: ['inventario:ver'], salary: 1600, active: true, contractType: 'Definido', absences: 3 },
  { id: 18, name: 'Isabel Morales', nationalId: '9-901-234', email: 'isabel.morales@example.com', branch: 'Sucursal Sur', position: 'Recursos Humanos', role: 'rrhh', permissions: ['empleados:roles'], salary: 2100, active: true, contractType: 'Indefinido', absences: 0 },
  { id: 19, name: 'Mario Gómez', nationalId: '7-012-345', email: 'mario.gomez@example.com', branch: 'Sucursal Centro', position: 'Cajero', role: 'caja', permissions: ['caja:ver'], salary: 1050, active: false, contractType: 'Definido', absences: 4 },
  { id: 20, name: 'Sofía Aguilar', nationalId: '8-123-456', email: 'sofia.aguilar@example.com', branch: 'Sucursal Norte', position: 'Gerente', role: 'admin', tags: ['supervisor'], permissions: ['empleados:roles', 'finanzas:ver', 'inventario:ver'], salary: 3300, active: true, contractType: 'Indefinido', absences: 1 },
];