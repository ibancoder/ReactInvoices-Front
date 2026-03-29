import type { Client, Invoice } from "@/types/invoice";

export const mockClients: Client[] = [
  { id: 1, cif: "B12345678", nombre: "Empresa Ejemplo S.L.", direccion: "Calle Mayor 10", ciudad: "Madrid", codigoPostal: "28001", email: "info@ejemplo.com", telefono: "912345678" },
  { id: 2, cif: "A87654321", nombre: "Servicios Avanzados S.A.", direccion: "Av. de la Constitución 5", ciudad: "Barcelona", codigoPostal: "08001", email: "contacto@avanzados.es", telefono: "934567890" },
  { id: 3, cif: "B55667788", nombre: "Tech Solutions S.L.", direccion: "Paseo de la Castellana 100", ciudad: "Madrid", codigoPostal: "28046", email: "admin@techsol.com" },
];

const year = new Date().getFullYear();

export const mockInvoices: Invoice[] = [
  { id: 1, numeroFactura: `${year}-001`, fechaFactura: "2026-01-15", clienteId: 1, cliente: mockClients[0], descripcion: "Desarrollo web corporativa", baseImponible: 3000, tipoIva: 21, importeIva: 630, totalFactura: 3630, cobrada: true },
  { id: 2, numeroFactura: `${year}-002`, fechaFactura: "2026-02-10", clienteId: 2, cliente: mockClients[1], descripcion: "Consultoría IT mensual - Febrero", baseImponible: 1500, tipoIva: 21, importeIva: 315, totalFactura: 1815, fechaPrevistaCobro: "2026-03-10", cobrada: false },
  { id: 3, numeroFactura: `${year}-003`, fechaFactura: "2026-03-01", clienteId: 3, cliente: mockClients[2], descripcion: "Licencia software anual", baseImponible: 5000, tipoIva: 21, importeIva: 1050, totalFactura: 6050, fechaPrevistaCobro: "2026-04-01", cobrada: false },
  { id: 4, numeroFactura: `${year}-004`, fechaFactura: "2026-03-20", clienteId: 1, cliente: mockClients[0], descripcion: "Formación equipo desarrollo", baseImponible: 800, tipoIva: 0, importeIva: 0, totalFactura: 800, cobrada: true },
];
