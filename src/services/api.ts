import type { Client, Invoice, InvoiceFormData } from "@/types/invoice";

// Configura aquí la URL base de tu API Spring Boot
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return res.json();
}

// ---- Facturas ----
export const getInvoices = () => request<Invoice[]>("/facturas");
export const getInvoice = (id: number) => request<Invoice>(`/facturas/${id}`);
export const createInvoice = (data: InvoiceFormData) =>
  request<Invoice>("/facturas", { method: "POST", body: JSON.stringify(data) });
export const updateInvoice = (id: number, data: Partial<InvoiceFormData>) =>
  request<Invoice>(`/facturas/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteInvoice = (id: number) =>
  request<void>(`/facturas/${id}`, { method: "DELETE" });

// ---- Clientes ----
export const getClients = () => request<Client[]>("/clientes");
export const getClient = (id: number) => request<Client>(`/clientes/${id}`);
export const createClient = (data: Omit<Client, "id">) =>
  request<Client>("/clientes", { method: "POST", body: JSON.stringify(data) });
export const updateClient = (id: number, data: Partial<Client>) =>
  request<Client>(`/clientes/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteClient = (id: number) =>
  request<void>(`/clientes/${id}`, { method: "DELETE" });
