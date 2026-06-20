import { useEffect, useState } from "react";
import type {
  Client,
  Invoice,
  InvoiceFormData,
  Proveedor,
} from "@/types/invoice";
// import { mockClients, mockInvoices } from "@/data/mockData";
import { InvoiceList } from "@/components/InvoiceList";
import { InvoiceForm } from "@/components/InvoiceForm";
import { ClientManager } from "@/components/ClientManager";
import { DashboardStats } from "@/components/DashboardStats";
import { ProvManager } from "@/components/ProvManager";
import { FileText, Users, LayoutDashboard, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getInvoices,
  getClients,
  createInvoice,
  deleteInvoice,
  createClient,
  deleteClient,
  getSuppliers,
  createSupplier,
  deleteSupplier,
} from "@/services/api";

type View = "dashboard" | "invoices" | "clients" | "new-invoice" | "suppliers";

const Index = () => {
  const [view, setView] = useState<View>("dashboard");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [suppliers, setSuppliers] = useState<Proveedor[]>([]); // Assuming suppliers have the same structure as clients
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  // ===============
  // Data Fetching
  // ===============
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [invoicesData, clientsData] = await Promise.all([
        getInvoices(),
        getClients(),
        getSuppliers(),
      ]);
      setInvoices(invoicesData);
      setClients(clientsData);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  // ===============
  // Numero Factura Logic
  // ===============

  const nextInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const count =
      invoices.filter((i) => i.numeroFactura.startsWith(`${year}`)).length + 1;
    return `${year}-${String(count).padStart(3, "0")}`;
  };

  // ===============
  // Crear Factura Logic
  // ===============

  const handleCreateInvoice = async (data: InvoiceFormData) => {
    try {
      const client = clients.find((c) => c.id === data.clienteId);
      const newInvoice: Invoice = {
        id: Math.max(0, ...invoices.map((i) => i.id || 0)) + 1,
        numeroFactura: nextInvoiceNumber(),
        fechaFactura: data.fechaFactura,
        clienteId: data.clienteId,
        cliente: client,
        descripcion: data.descripcion,
        baseImponible: data.baseImponible,
        tipoIva: data.tipoIva,
        importeIva: data.baseImponible * (data.tipoIva / 100),
        totalFactura:
          data.baseImponible + data.baseImponible * (data.tipoIva / 100),
        fechaPrevistaCobro: data.fechaPrevistaCobro,
        cobrada: data.cobrada,
      };
      const savedInvoice = await createInvoice(newInvoice);
      setInvoices((prev) => [...prev, newInvoice]);
      setView("invoices");
    } catch (error) {
      console.error("Error creando factura:", error);
    }
  };

  // ===============
  // Toggle Cobrada
  // ===============

  const handleToggleCobrada = (id: number) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, cobrada: !inv.cobrada } : inv,
      ),
    );
  };

  // ===============
  // Borrar Factura Logic
  // ===============

  const handleDeleteInvoice = async (id: number) => {
    try {
      await deleteInvoice(id);
      const updatedInvoices = await getInvoices();

      setInvoices(updatedInvoices);
    } catch (error) {
      console.error("Error eliminando factura:", error);
    }
  };

  // ===============
  // Crear Cliente Logic
  // ===============

  const handleCreateClient = async (data: Omit<Client, "id">) => {
    try {
      const savedClient = await createClient(data);
      setClients((prev) => [...prev, savedClient]);
    } catch (error) {
      console.error("Error creando cliente:", error);
    }
  };

  // ===============
  // Crear Proveedor Logic
  // ===============
  const handleCreateSupplier = async (data: Omit<Proveedor, "id">) => {
    try {
      const savedSupplier = await createSupplier(data);
      setSuppliers((prev) => [...prev, savedSupplier]);
    } catch (error) {
      console.error("Error creando proveedor:", error);
    }
  };

  // ===============
  // Borrar Cliente Logic
  // ===============

  const handleDeleteClient = async (id: number) => {
    try {
      await deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error eliminando cliente:", error);
    }
  };

  // ===============
  // Borrar Proveedor Logic
  // ===============
  const handleDeleteSupplier = async (id: number) => {
    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error eliminando proveedor:", error);
    }
  };

  // ===============
  // Navigation Items  Lugar donde se definen los elementos de navegación para la aplicación.
  // ===============

  const navItems = [
    {
      key: "dashboard" as View,
      label: "Vision General",
      icon: LayoutDashboard,
    },
    { key: "invoices" as View, label: "Facturas", icon: FileText },
    { key: "clients" as View, label: "Clientes", icon: Users },
    { key: "suppliers" as View, label: "Proveedores", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-display font-bold text-foreground tracking-tight">
                Control de Facturas
              </h1>
            </div>
            <nav className="flex items-center gap-1">
              {navItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setView(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === key ||
                    (key === "invoices" && view === "new-invoice")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </nav>
            <Button
              onClick={() => setView("new-invoice")}
              size="sm"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nueva Factura</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === "dashboard" && (
          <DashboardStats
            invoices={invoices}
            clients={clients}
            //suppliers={suppliers}
            onNavigate={setView}
          />
        )}
        {view === "invoices" && (
          <InvoiceList
            invoices={invoices}
            onToggleCobrada={handleToggleCobrada}
            onDelete={handleDeleteInvoice}
            onNewInvoice={() => setView("new-invoice")}
          />
        )}
        {view === "new-invoice" && (
          <InvoiceForm
            clients={clients}
            nextNumber={nextInvoiceNumber()}
            onSubmit={handleCreateInvoice}
            onCancel={() => setView("invoices")}
          />
        )}
        {view === "clients" && (
          <ClientManager
            clients={clients}
            onCreate={handleCreateClient}
            onDelete={handleDeleteClient}
          />
        )}
        {view === "suppliers" && (
          <ProvManager
            proveedores={suppliers}
            onCreate={handleCreateSupplier}
            onDelete={handleDeleteSupplier}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
