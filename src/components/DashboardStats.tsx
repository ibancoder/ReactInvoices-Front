import type { Invoice } from "@/types/invoice";
import type { Client } from "@/types/invoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Users,
  Euro,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

interface Props {
  invoices: Invoice[];
  clients: Client[];
  //suppliers: Client[]; // Assuming suppliers have the same structure as clients
  onNavigate: (view: "invoices" | "clients") => void;
}

export const DashboardStats = ({ invoices, clients, onNavigate }: Props) => {
  const totalFacturado = invoices.reduce((sum, i) => sum + i.totalFactura, 0);
  const totalCobrado = invoices
    .filter((i) => i.cobrada)
    .reduce((sum, i) => sum + i.totalFactura, 0);
  const totalPendiente = totalFacturado - totalCobrado;
  const facturasPendientes = invoices.filter((i) => !i.cobrada);

  const stats = [
    {
      label: "Total Facturado",
      value: `${totalFacturado.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €`,
      icon: Euro,
      color: "text-primary",
    },
    {
      label: "Cobrado",
      value: `${totalCobrado.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €`,
      icon: CheckCircle,
      color: "text-success",
    },
    {
      label: "Pendiente",
      value: `${totalPendiente.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €`,
      icon: AlertCircle,
      color: "text-accent",
    },
    {
      label: "Facturas",
      value: invoices.length.toString(),
      icon: FileText,
      color: "text-primary",
    },
    {
      label: "Clientes",
      value: clients.length.toString(),
      icon: Users,
      color: "text-primary",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">
          Panel de Control
        </h2>
        <p className="text-muted-foreground mt-1">
          Resumen de tu actividad de facturación
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border">
            <CardContent className="pt-5 pb-4 px-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {s.label}
                </span>
              </div>
              <p className="text-xl font-display font-bold text-foreground">
                {s.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {facturasPendientes.length > 0 && (
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-display">
                Facturas Pendientes de Cobro
              </CardTitle>
              <button
                onClick={() => onNavigate("invoices")}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                Ver todas <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {facturasPendientes.slice(0, 5).map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {inv.numeroFactura}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {inv.cliente?.nombre} · {inv.descripcion}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold text-foreground">
                      {inv.totalFactura.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      €
                    </p>
                    {inv.fechaPrevistaCobro && (
                      <p className="text-xs text-muted-foreground">
                        Previsto:{" "}
                        {new Date(inv.fechaPrevistaCobro).toLocaleDateString(
                          "es-ES",
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
