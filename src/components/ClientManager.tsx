import { useState } from "react";
import type { Client } from "@/types/invoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X } from "lucide-react";

interface Props {
  clients: Client[];
  onCreate: (data: Omit<Client, "id">) => void;
  onDelete: (id: number) => void;
}

export const ClientManager = ({ clients, onCreate, onDelete }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ cif: "", nombre: "", direccion: "", ciudad: "", codigoPostal: "", email: "", telefono: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(form);
    setForm({ cif: "", nombre: "", direccion: "", ciudad: "", codigoPostal: "", email: "", telefono: "" });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Clientes</h2>
          <p className="text-muted-foreground mt-1">{clients.length} clientes registrados</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"} className="gap-2">
          {showForm ? <><X className="w-4 h-4" /> Cerrar</> : <><Plus className="w-4 h-4" /> Nuevo Cliente</>}
        </Button>
      </div>

      {showForm && (
        <Card className="border-border border-2 border-dashed">
          <CardHeader><CardTitle className="text-lg font-display">Nuevo Cliente</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CIF / NIF</Label>
                <Input value={form.cif} onChange={(e) => setForm({ ...form, cif: e.target.value })} required placeholder="B12345678" />
              </div>
              <div className="space-y-2">
                <Label>Nombre / Razón Social</Label>
                <Input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required placeholder="Empresa S.L." />
              </div>
              <div className="space-y-2">
                <Label>Dirección</Label>
                <Input value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} required placeholder="Calle Mayor 10" />
              </div>
              <div className="space-y-2">
                <Label>Ciudad</Label>
                <Input value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} required placeholder="Madrid" />
              </div>
              <div className="space-y-2">
                <Label>Código Postal</Label>
                <Input value={form.codigoPostal} onChange={(e) => setForm({ ...form, codigoPostal: e.target.value })} required placeholder="28001" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required placeholder="info@empresa.com" />
              </div>
              <div className="space-y-2">
                <Label>Teléfono (opcional)</Label>
                <Input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="912345678" />
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full">Guardar Cliente</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((c) => (
          <Card key={c.id} className="border-border group">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display font-semibold text-foreground">{c.nombre}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">{c.cif}</Badge>
                </div>
                <button onClick={() => onDelete(c.id)} className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>{c.direccion}, {c.codigoPostal} {c.ciudad}</p>
                <p>{c.email}</p>
                {c.telefono && <p>{c.telefono}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
