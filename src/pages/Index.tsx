import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, BarChart3, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-castel-black.png";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl text-center opacity-0 animate-fade-in">
        <div className="mb-10">
          <img src={logo} alt="ClientMetrics Vault" className="h-28 mx-auto mb-8" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Client<span className="gold-text">Metrics</span> Vault
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            Dashboards premium de campanhas para seus clientes. Sem login. Sem fricção. Pura performance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Button
            size="lg"
            className="gap-2 text-base"
            onClick={() => navigate("/admin")}
          >
            Painel Admin
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 text-base border-border hover:bg-secondary"
            onClick={() => navigate("/dashboard/castel-black")}
          >
            Ver Demo
            <BarChart3 className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          {[
            { icon: <Link2 className="w-5 h-5 text-gold" />, title: "Link Exclusivo", desc: "Cada cliente acessa por URL única" },
            { icon: <BarChart3 className="w-5 h-5 text-gold" />, title: "Dados em Tempo Real", desc: "Métricas atualizadas automaticamente" },
            { icon: <Shield className="w-5 h-5 text-gold" />, title: "Premium & Seguro", desc: "Experiência que eleva sua marca" },
          ].map((f, i) => (
            <div
              key={i}
              className="card-vault opacity-0 animate-fade-in"
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="mb-3">{f.icon}</div>
              <h3 className="font-semibold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
