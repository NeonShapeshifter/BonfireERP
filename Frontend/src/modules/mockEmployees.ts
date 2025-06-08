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
  contractStart: string;
  contractEnd?: string;
  absences: number;
  lastLogin: string;
  actions: { date: string; action: string }[];
  documents: { name: string; size: string }[];
  reports: {
    subject: string;
    classification?: string;
    text: string;
    attachments?: string[];
    submittedBy: string;
    date: string;
  }[];
  schedule: string;
  vacations: { start: string; end: string }[];
  sickLeaves: { start: string; end: string }[];
  stats: {
    punctuality: number;
    workedDays: number;
    lateArrivals: number;
  };
}

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Carlos Pérez',
    nationalId: '8-123-456',
    email: 'carlos.perez@example.com',
    branch: 'Sucursal Centro',
    position: 'Gerente',
    role: 'admin',
    tags: ['supervisor'],
    permissions: ['empleados:roles', 'inventario:ver'],
    salary: 3200,
    active: true,
    contractType: 'Indefinido',
    contractStart: '01-01-2024',
    absences: 1,
    lastLogin: '02-06-2025',
    actions: [
      { date: '15-05-2025', action: 'Actualización de inventario' }
    ],
    documents: [
      { name: 'Contrato.pdf', size: '200KB' }
    ],
    reports: [],
    schedule: 'Lun-Vie 08:00-17:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 98, workedDays: 120, lateArrivals: 1 }
  },
  {
    id: 2,
    name: 'María González',
    nationalId: '9-234-567',
    email: 'maria.gonzalez@example.com',
    branch: 'Sucursal Norte',
    position: 'Analista',
    role: 'finanzas',
    tags: ['atención al cliente'],
    permissions: ['finanzas:ver'],
    salary: 1850,
    active: true,
    contractType: 'Definido',
    contractStart: '12-03-2023',
    contractEnd: '11-03-2026',
    absences: 0,
    lastLogin: '01-06-2025',
    actions: [],
    documents: [],
    reports: [
      {
        subject: 'Reporte Trimestral',
        text: 'Resultados financieros del Q1.',
        submittedBy: 'María González',
        date: '05-04-2025'
      }
    ],
    schedule: 'Lun-Vie 09:00-18:00',
    vacations: [
      { start: '01-02-2025', end: '15-02-2025' }
    ],
    sickLeaves: [],
    stats: { punctuality: 96, workedDays: 110, lateArrivals: 2 }
  },
  {
    id: 3,
    name: 'Luis Rodríguez',
    nationalId: '7-345-678',
    email: 'luis.rodriguez@example.com',
    branch: 'Sucursal Sur',
    position: 'Bodeguero',
    role: 'inventario',
    permissions: ['inventario:editar'],
    salary: 1250,
    active: false,
    contractType: 'Indefinido',
    contractStart: '20-07-2022',
    absences: 3,
    lastLogin: '15-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Sab 10:00-19:00',
    vacations: [],
    sickLeaves: [
      { start: '10-03-2025', end: '12-03-2025' }
    ],
    stats: { punctuality: 90, workedDays: 95, lateArrivals: 6 }
  },
  {
    id: 4,
    name: 'Ana Martínez',
    nationalId: '8-456-789',
    email: 'ana.martinez@example.com',
    branch: 'Sucursal Centro',
    position: 'Cajera',
    role: 'caja',
    tags: ['atención al cliente'],
    permissions: ['caja:ver'],
    salary: 1150,
    active: true,
    contractType: 'Definido',
    contractStart: '05-02-2024',
    contractEnd: '04-02-2025',
    absences: 2,
    lastLogin: '30-05-2025',
    actions: [],
    documents: [
      { name: 'Identificación.pdf', size: '150KB' }
    ],
    reports: [],
    schedule: 'Lun-Vie 13:00-21:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 97, workedDays: 105, lateArrivals: 1 }
  },
  {
    id: 5,
    name: 'José López',
    nationalId: '9-567-890',
    email: 'jose.lopez@example.com',
    branch: 'Sucursal Norte',
    position: 'Supervisor',
    role: 'rrhh',
    tags: ['supervisor'],
    permissions: ['empleados:ver'],
    salary: 2550,
    active: true,
    contractType: 'Indefinido',
    contractStart: '15-09-2023',
    absences: 0,
    lastLogin: '01-06-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Horario rotativo',
    vacations: [
      { start: '10-01-2025', end: '20-01-2025' }
    ],
    sickLeaves: [],
    stats: { punctuality: 94, workedDays: 115, lateArrivals: 3 }
  },
  {
    id: 6,
    name: 'Patricia Díaz',
    nationalId: '8-678-901',
    email: 'patricia.diaz@example.com',
    branch: 'Sucursal Sur',
    position: 'Contadora',
    role: 'finanzas',
    permissions: ['finanzas:editar'],
    salary: 2250,
    active: true,
    contractType: 'Indefinido',
    contractStart: '21-11-2022',
    absences: 1,
    lastLogin: '28-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Vie 08:00-17:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 99, workedDays: 130, lateArrivals: 0 }
  },
  {
    id: 7,
    name: 'Ricardo Castillo',
    nationalId: '7-789-012',
    email: 'ricardo.castillo@example.com',
    branch: 'Sucursal Centro',
    position: 'Vendedor',
    role: 'caja',
    tags: ['atención al cliente'],
    permissions: ['caja:ver'],
    salary: 1350,
    active: true,
    contractType: 'Definido',
    contractStart: '10-08-2024',
    contractEnd: '09-08-2025',
    absences: 2,
    lastLogin: '31-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Sab 09:00-18:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 95, workedDays: 100, lateArrivals: 2 }
  },
  {
    id: 8,
    name: 'Laura Sánchez',
    nationalId: '9-890-123',
    email: 'laura.sanchez@example.com',
    branch: 'Sucursal Norte',
    position: 'Asistente',
    role: 'rrhh',
    permissions: ['empleados:ver'],
    salary: 1450,
    active: true,
    contractType: 'Definido',
    contractStart: '01-04-2024',
    contractEnd: '31-03-2025',
    absences: 1,
    lastLogin: '27-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Vie 09:00-17:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 97, workedDays: 102, lateArrivals: 1 }
  },
  {
    id: 9,
    name: 'Jorge Herrera',
    nationalId: '8-901-234',
    email: 'jorge.herrera@example.com',
    branch: 'Sucursal Sur',
    position: 'Encargado de Inventario',
    role: 'inventario',
    tags: ['supervisor'],
    permissions: ['inventario:ver', 'inventario:editar'],
    salary: 2050,
    active: false,
    contractType: 'Indefinido',
    contractStart: '17-06-2021',
    absences: 4,
    lastLogin: '15-04-2025',
    actions: [
      { date: '02-02-2025', action: 'Revisión de stock' }
    ],
    documents: [],
    reports: [],
    schedule: 'Lun-Vie 06:00-15:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 88, workedDays: 85, lateArrivals: 8 }
  },
  {
    id: 10,
    name: 'Elena Vargas',
    nationalId: '7-012-345',
    email: 'elena.vargas@example.com',
    branch: 'Sucursal Centro',
    position: 'Analista de Datos',
    role: 'finanzas',
    permissions: ['finanzas:ver'],
    salary: 2150,
    active: true,
    contractType: 'Definido',
    contractStart: '05-05-2024',
    contractEnd: '04-05-2026',
    absences: 0,
    lastLogin: '02-06-2025',
    actions: [],
    documents: [
      { name: 'Certificado.xlsx', size: '50KB' }
    ],
    reports: [],
    schedule: 'Lun-Vie 08:30-17:30',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 100, workedDays: 100, lateArrivals: 0 }
  },
  {
    id: 11,
    name: 'Gabriel Mendoza',
    nationalId: '8-234-567',
    email: 'gabriel.mendoza@example.com',
    branch: 'Sucursal Norte',
    position: 'Cajero',
    role: 'caja',
    permissions: ['caja:ver'],
    salary: 1020,
    active: true,
    contractType: 'Definido',
    contractStart: '01-09-2024',
    contractEnd: '31-08-2025',
    absences: 3,
    lastLogin: '31-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Dom 14:00-22:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 92, workedDays: 90, lateArrivals: 5 }
  },
  {
    id: 12,
    name: 'Paola Jiménez',
    nationalId: '9-345-678',
    email: 'paola.jimenez@example.com',
    branch: 'Sucursal Sur',
    position: 'Recursos Humanos',
    role: 'rrhh',
    permissions: ['empleados:roles'],
    salary: 2350,
    active: true,
    contractType: 'Indefinido',
    contractStart: '12-12-2022',
    absences: 2,
    lastLogin: '29-05-2025',
    actions: [
      { date: '20-04-2025', action: 'Capacitación interna' }
    ],
    documents: [],
    reports: [],
    schedule: 'Lun-Vie 08:00-17:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 98, workedDays: 120, lateArrivals: 1 }
  },
  {
    id: 13,
    name: 'Fernando Ortega',
    nationalId: '7-456-789',
    email: 'fernando.ortega@example.com',
    branch: 'Sucursal Centro',
    position: 'Encargado de Bodega',
    role: 'inventario',
    permissions: ['inventario:ver'],
    salary: 1750,
    active: false,
    contractType: 'Definido',
    contractStart: '19-03-2024',
    contractEnd: '18-03-2025',
    absences: 5,
    lastLogin: '05-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Vie 07:00-16:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 87, workedDays: 80, lateArrivals: 9 }
  },
  {
    id: 14,
    name: 'Karla Díaz',
    nationalId: '8-567-890',
    email: 'karla.diaz@example.com',
    branch: 'Sucursal Norte',
    position: 'Gerente de Ventas',
    role: 'admin',
    tags: ['supervisor'],
    permissions: ['inventario:ver', 'finanzas:ver'],
    salary: 3300,
    active: true,
    contractType: 'Indefinido',
    contractStart: '10-10-2020',
    absences: 1,
    lastLogin: '02-06-2025',
    actions: [],
    documents: [
      { name: 'Plan_de_Ventas.pdf', size: '300KB' }
    ],
    reports: [],
    schedule: 'Lun-Vie 08:00-17:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 99, workedDays: 150, lateArrivals: 0 }
  },
  {
    id: 15,
    name: 'Diego Navarro',
    nationalId: '9-678-901',
    email: 'diego.navarro@example.com',
    branch: 'Sucursal Sur',
    position: 'Soporte Técnico',
    role: 'caja',
    tags: ['atención al cliente'],
    permissions: ['caja:ver'],
    salary: 1550,
    active: true,
    contractType: 'Definido',
    contractStart: '03-01-2024',
    contractEnd: '02-01-2025',
    absences: 0,
    lastLogin: '30-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Sab 08:00-16:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 95, workedDays: 108, lateArrivals: 2 }
  },
  {
    id: 16,
    name: 'Andrea Flores',
    nationalId: '7-789-012',
    email: 'andrea.flores@example.com',
    branch: 'Sucursal Centro',
    position: 'Contadora',
    role: 'finanzas',
    permissions: ['finanzas:editar'],
    salary: 2450,
    active: true,
    contractType: 'Indefinido',
    contractStart: '14-02-2022',
    absences: 2,
    lastLogin: '31-05-2025',
    actions: [],
    documents: [],
    reports: [
      {
        subject: 'Informe Anual',
        classification: 'Confidencial',
        text: 'Desempeño financiero de la empresa.',
        submittedBy: 'Andrea Flores',
        date: '20-01-2025'
      }
    ],
    schedule: 'Lun-Vie 09:00-18:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 97, workedDays: 140, lateArrivals: 1 }
  },
  {
    id: 17,
    name: 'Manuel Ruiz',
    nationalId: '8-890-123',
    email: 'manuel.ruiz@example.com',
    branch: 'Sucursal Norte',
    position: 'Analista de Inventario',
    role: 'inventario',
    permissions: ['inventario:ver'],
    salary: 1650,
    active: true,
    contractType: 'Definido',
    contractStart: '22-05-2023',
    contractEnd: '21-05-2026',
    absences: 3,
    lastLogin: '28-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Vie 07:00-16:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 93, workedDays: 100, lateArrivals: 4 }
  },
  {
    id: 18,
    name: 'Isabel Morales',
    nationalId: '9-901-234',
    email: 'isabel.morales@example.com',
    branch: 'Sucursal Sur',
    position: 'Recursos Humanos',
    role: 'rrhh',
    permissions: ['empleados:roles'],
    salary: 2150,
    active: true,
    contractType: 'Indefinido',
    contractStart: '10-04-2021',
    absences: 0,
    lastLogin: '25-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Vie 08:00-17:00',
    vacations: [
      { start: '05-07-2025', end: '15-07-2025' }
    ],
    sickLeaves: [],
    stats: { punctuality: 98, workedDays: 160, lateArrivals: 1 }
  },
  {
    id: 19,
    name: 'Mario Gómez',
    nationalId: '7-012-345',
    email: 'mario.gomez@example.com',
    branch: 'Sucursal Centro',
    position: 'Cajero',
    role: 'caja',
    permissions: ['caja:ver'],
    salary: 1080,
    active: false,
    contractType: 'Definido',
    contractStart: '06-06-2024',
    contractEnd: '05-06-2025',
    absences: 4,
    lastLogin: '20-05-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Dom 15:00-23:00',
    vacations: [],
    sickLeaves: [],
    stats: { punctuality: 91, workedDays: 90, lateArrivals: 6 }
  },
  {
    id: 20,
    name: 'Sofía Aguilar',
    nationalId: '8-123-457',
    email: 'sofia.aguilar@example.com',
    branch: 'Sucursal Norte',
    position: 'Gerente',
    role: 'admin',
    tags: ['supervisor'],
    permissions: ['empleados:roles', 'finanzas:ver', 'inventario:ver'],
    salary: 3350,
    active: true,
    contractType: 'Indefinido',
    contractStart: '01-01-2019',
    absences: 1,
    lastLogin: '02-06-2025',
    actions: [],
    documents: [],
    reports: [],
    schedule: 'Lun-Vie 08:00-17:00',
    vacations: [],
    sickLeaves: [
      { start: '12-02-2025', end: '15-02-2025' }
    ],
    stats: { punctuality: 97, workedDays: 180, lateArrivals: 1 }
  }
];