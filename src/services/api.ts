import type { Client, Invoice, InvoiceFormData } from "@/types/invoice";

// Configura aquí la URL base de tu API Spring Boot
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

  // Para respuestas sin contenido (204 No Content), no intentamos parsear JSON
  if (res.status === 204) return null as unknown as T;

  //Intentamos leer el texto primero para estar seguros de que no es una respuesta vacía antes de parsear JSON
  const text = await res.text();

  return text ? JSON.parse(text) : (null as unknown as T);
}

// ---- Facturas ----
export const getInvoices = () => request<Invoice[]>("/invoices");
export const getInvoice = (id: number) => request<Invoice>(`/invoices/${id}`);
export const createInvoice = (data: InvoiceFormData) =>
  request<Invoice>("/invoices", { method: "POST", body: JSON.stringify(data) });
export const updateInvoice = (id: number, data: Partial<InvoiceFormData>) =>
  request<Invoice>(`/invoices/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteInvoice = (id: number) =>
  request<void>(`/invoices/${id}`, { method: "DELETE" });

// ---- Clientes ----
export const getClients = () => request<Client[]>("/clientes");
export const getClient = (id: number) => request<Client>(`/clientes/${id}`);
export const createClient = (data: Omit<Client, "id">) =>
  request<Client>("/clientes", { method: "POST", body: JSON.stringify(data) });
export const updateClient = (id: number, data: Partial<Client>) =>
  request<Client>(`/clientes/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteClient = (id: number) =>
  request<void>(`/clientes/${id}`, { method: "DELETE" });

// ---- Proveedores ----
export const getSuppliers = () => request<Client[]>("/proveedores");
export const getSupplier = (id: number) =>
  request<Client>(`/proveedores/${id}`);
export const createSupplier = (data: Omit<Client, "id">) =>
  request<Client>("/proveedores", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const updateSupplier = (id: number, data: Partial<Client>) =>
  request<Client>(`/proveedores/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteSupplier = (id: number) =>
  request<void>(`/proveedores/${id}`, { method: "DELETE" });
