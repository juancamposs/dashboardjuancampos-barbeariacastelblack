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
}

export function DashboardHeader({ selectedDays, onSelectDays }: DashboardHeaderProps) {
  return (
    <header className="w-full pt-12 pb-10 opacity-0 animate-fade-in">
      <div className="flex flex-col items-center gap-5 mb-12">
        <img
          src={logo}
          alt="Barbearia Castel Black"
          className="h-28 w-auto object-contain drop-shadow-lg"
        />
        <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase">
          Performance sob controle
        </p>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p.days}
              onClick={() => onSelectDays(p.days)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedDays === p.days
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/70">
          Resultados atualizados há poucos minutos
        </p>
      </div>
    </header>
  );
}
