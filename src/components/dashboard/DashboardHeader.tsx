import { useState } from "react";
import logo from "@/assets/logo-castel-black.png";

const periods = [
  { label: "Hoje", days: 1 },
  { label: "7 dias", days: 7 },
  { label: "14 dias", days: 14 },
  { label: "30 dias", days: 30 },
];

interface DashboardHeaderProps {
  selectedDays: number;
  onSelectDays: (days: number) => void;
  clientName: string;
}

export function DashboardHeader({ selectedDays, onSelectDays, clientName }: DashboardHeaderProps) {
  return (
    <header className="w-full py-8 opacity-0 animate-fade-in">
      <div className="flex flex-col items-center gap-6 mb-8">
        <img
          src={logo}
          alt={clientName}
          className="h-24 w-auto object-contain"
        />
        <div className="text-center">
          <h1 className="text-xl font-semibold tracking-wide">{clientName}</h1>
          <p className="text-sm text-muted-foreground mt-1">Performance sob controle</p>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.days}
              onClick={() => onSelectDays(p.days)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedDays === p.days
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Resultados atualizados há poucos minutos
        </p>
      </div>
    </header>
  );
}
