import type { Invoice } from "@/types/invoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  invoices: Invoice[];
  onToggleCobrada: (id: number) => void;
  onDelete: (id: number) => void;
  onNewInvoice: () => void;
}

export const InvoiceList = ({ invoices, onToggleCobrada, onDelete, onNewInvoice }: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Facturas Emitidas</h2>
          <p className="text-muted-foreground mt-1">{invoices.length} facturas registradas</p>
        </div>
        <Button onClick={onNewInvoice} className="gap-2">
          <Plus className="w-4 h-4" /> Nueva Factura
        </Button>
      </div>

      <Card className="border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nº Factura</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Fecha</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Cliente</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Descripción</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Base</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">IVA %</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">IVA €</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Total</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Estado</th>
                <th className="text-center px-4 py-3 font-medium text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{inv.numeroFactura}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(inv.fechaFactura).toLocaleDateString("es-ES")}</td>
                  <td className="px-4 py-3 text-foreground">{inv.cliente?.nombre}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{inv.descripcion}</td>
                  <td className="px-4 py-3 text-right text-foreground">{inv.baseImponible.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{inv.tipoIva}%</td>
                  <td className="px-4 py-3 text-right text-foreground">{inv.importeIva.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €</td>
                  <td className="px-4 py-3 text-right font-display font-semibold text-foreground">{inv.totalFactura.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => inv.id && onToggleCobrada(inv.id)}>
                      <Badge variant={inv.cobrada ? "default" : "secondary"} className={inv.cobrada ? "bg-success text-success-foreground hover:bg-success/90 cursor-pointer" : "cursor-pointer"}>
                        {inv.cobrada ? "Cobrada" : "Pendiente"}
                      </Badge>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => inv.id && onDelete(inv.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-muted-foreground">
                    No hay facturas registradas. ¡Crea tu primera factura!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
