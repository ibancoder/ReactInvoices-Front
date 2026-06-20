export interface Client {
  id: number;
  cif: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  email: string;
  telefono?: string;
}

export interface Proveedor {
  id: number;
  cif: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  email: string;
  telefono?: string;
}

export interface Invoice {
  id?: number;
  numeroFactura: string;
  fechaFactura: string;
  clienteId: number;
  cliente?: Client;
  descripcion: string;
  baseImponible: number;
  tipoIva: 0 | 21;
  importeIva: number;
  totalFactura: number;
  fechaPrevistaCobro?: string;
  cobrada: boolean;
}

export interface InvoiceFormData {
  clienteId: number;
  fechaFactura: string;
  descripcion: string;
  baseImponible: number;
  tipoIva: 0 | 21;
  fechaPrevistaCobro?: string;
  cobrada: boolean;
}
