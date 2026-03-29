import { useState } from "react";
import type { Client, InvoiceFormData } from "@/types/invoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";

interface Props {
  clients: Client[];
  nextNumber: string;
  onSubmit: (data: InvoiceFormData) => void;
  onCancel: () => void;
}

export const InvoiceForm = ({ clients, nextNumber, onSubmit, onCancel }: Props) => {
  const today = new Date().toISOString().split("T")[0];
  const [clienteId, setClienteId] = useState<number | null>(null);
  const [fechaFactura, setFechaFactura] = useState(today);
  const [descripcion, setDescripcion] = useState("");
  const [baseImponible, setBaseImponible] = useState<number>(0);
  const [tipoIva, setTipoIva] = useState<0 | 21>(21);
  const [fechaPrevistaCobro, setFechaPrevistaCobro] = useState("");
  const [cobrada, setCobrada] = useState(false);

  const importeIva = baseImponible * (tipoIva / 100);
  const total = baseImponible + importeIva;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId) return;
    onSubmit({
      clienteId,
      fechaFactura,
      descripcion,
      baseImponible,
      tipoIva,
      fechaPrevistaCobro: fechaPrevistaCobro || undefined,
      cobrada,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Nueva Factura</h2>
          <p className="text-muted-foreground">Nº {nextNumber}</p>
        </div>
      </div>

      <Card className="border-border">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numero">Nº Factura</Label>
                <Input id="numero" value={nextNumber} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha Factura</Label>
                <Input id="fecha" type="date" value={fechaFactura} onChange={(e) => setFechaFactura(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cliente</Label>
              <Select onValueChange={(v) => setClienteId(Number(v))} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.nombre} ({c.cif})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Descripción</Label>
              <Textarea id="desc" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Descripción del servicio o producto" required rows={3} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="base">Base Imponible (€)</Label>
                <Input id="base" type="number" min={0} step={0.01} value={baseImponible || ""} onChange={(e) => setBaseImponible(Number(e.target.value))} required />
              </div>
              <div className="space-y-2">
                <Label>Tipo de IVA</Label>
                <Select value={String(tipoIva)} onValueChange={(v) => setTipoIva(Number(v) as 0 | 21)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="21">21%</SelectItem>
                    <SelectItem value="0">0% (Exento)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Calculated fields */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Importe IVA</p>
                <p className="text-lg font-display font-semibold text-foreground">{importeIva.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Factura</p>
                <p className="text-xl font-display font-bold text-foreground">{total.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fechaCobro">Fecha Prevista de Cobro</Label>
                <Input id="fechaCobro" type="date" value={fechaPrevistaCobro} onChange={(e) => setFechaPrevistaCobro(e.target.value)} />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch id="cobrada" checked={cobrada} onCheckedChange={setCobrada} />
                <Label htmlFor="cobrada">Factura cobrada</Label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1" disabled={!clienteId}>
                Guardar Factura
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
