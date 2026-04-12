import { useState } from "react";
import { Plus, Copy, Edit2, Power, ExternalLink } from "lucide-react";
import { mockClients, ClientData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminPanel() {
  const [clients] = useState<ClientData[]>(mockClients);

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/dashboard/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 opacity-0 animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Centro de Comando</h1>
            <p className="text-sm text-muted-foreground mt-1">Gerencie seus clientes e dashboards</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Cliente
          </Button>
        </div>

        {/* Client List */}
        <div className="space-y-3">
          {clients.map((client, i) => (
            <div
              key={client.id}
              className="card-vault flex items-center justify-between opacity-0 animate-fade-in"
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full",
                    client.status === "active" ? "bg-emerald-400" : "bg-muted-foreground"
                  )}
                />
                <div>
                  <h3 className="font-semibold">{client.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    /{client.slug} · {client.meta_account_id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyLink(client.slug)}
                  title="Copiar link"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Ver dashboard">
                  <a href={`/dashboard/${client.slug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" title="Editar">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Desativar">
                  <Power className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
