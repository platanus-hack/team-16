// src/pages/Playground.jsx
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Playground = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Playground</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">
            Bienvenido al área de experimentación
          </h2>
          <p className="text-muted-foreground mb-6">
            Esta es un área protegida solo para usuarios autenticados.
          </p>
          <div className="grid gap-4">
            {/* Aquí puedes agregar el contenido de tu playground */}
            <Button>Ejemplo de Botón</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Playground;