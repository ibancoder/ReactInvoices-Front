import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X } from "lucide-react";
import { Item, Proveedor } from "@/types/invoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  items: Item[];
  proveedores: Proveedor[];
  onCreate: (data: Omit<Item, "id">) => void;
  onDelete: (id: number) => void;
}

export const ItemManager = ({
  items,
  proveedores,
  onCreate,
  onDelete,
}: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    telcode: "",
    descripcion: "",
    proveedorId: "",
    horas: "",
    precioCoste: "",
    precioVenta: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We look for the selected proveedor object based on the proveedorId from the form
    const proveedorSeleccionado = proveedores.find(
      (p) => p.id === Number(form.proveedorId),
    );

    if (!proveedorSeleccionado) {
      alert("Proveedor no encontrado");
      return;
    }

    // Now we can create the item with the selected proveedor
    onCreate({
      telcode: form.telcode,
      descripcion: form.descripcion,
      proveedor: proveedorSeleccionado,
      proveedorId: proveedorSeleccionado.id,
      horas: parseFloat(form.horas),
      precioCoste: parseFloat(form.precioCoste),
      precioVenta: parseFloat(form.precioVenta),
    } as Omit<Item, "id">);

    setForm({
      telcode: "",
      descripcion: "",
      proveedorId: "",
      horas: "",
      precioCoste: "",
      precioVenta: "",
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Items
          </h2>
          <p className="text-muted-foreground mt-1">
            {items.length} items registrados
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "outline" : "default"}
          className="gap-2"
        >
          {showForm ? (
            <>
              <X className="h-4 w-4" /> Cerrar
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Agregar Item
            </>
          )}
        </Button>
      </div>
      {showForm && (
        <Card className="border-border border-2 border-dashed">
          <CardHeader>
            <CardTitle className="text-lg font-display">Agregar Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="telcode">Telcode</Label>
                <Input
                  id="telcode"
                  value={form.telcode}
                  onChange={(e) =>
                    setForm({ ...form, telcode: e.target.value })
                  }
                  required
                  placeholder="xx.xx.xxx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                  required
                  placeholder="Descripción del item"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proveedor">Proveedor</Label>
                <select
                  id="proveedor"
                  value={form.proveedorId}
                  onChange={(e) =>
                    setForm({ ...form, proveedorId: e.target.value })
                  }
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Seleccione un proveedor</option>
                  {proveedores.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.id}>
                      {proveedor.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="horas">Horas</Label>
                <Input
                  id="horas"
                  value={form.horas}
                  onChange={(e) => setForm({ ...form, horas: e.target.value })}
                  required
                  placeholder="Horas estimadas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="precioCoste">Precio Coste</Label>
                <Input
                  id="precioCoste"
                  value={form.precioCoste}
                  onChange={(e) =>
                    setForm({ ...form, precioCoste: e.target.value })
                  }
                  required
                  placeholder="Precio de coste"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="precioVenta">Precio Venta</Label>
                <Input
                  id="precioVenta"
                  value={form.precioVenta}
                  onChange={(e) =>
                    setForm({ ...form, precioVenta: e.target.value })
                  }
                  required
                  placeholder="Precio de venta"
                />
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full sm:w-auto">
                  Guardar Item
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="border-border group">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {item.descripcion}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {item.telcode}
                  </Badge>
                </div>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                <p>
                  Proveedor:{" "}
                  {item.proveedor?.nombre ?? JSON.stringify(item.proveedor)}
                </p>
                <p>Horas: {item.horas}</p>
                <p>Precio de Coste: {item.precioCoste}</p>
                <p>Precio de Venta: {item.precioVenta}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
