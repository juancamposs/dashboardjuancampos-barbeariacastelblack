import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  delay?: number;
}

export function KPICard({ title, value, icon, delay = 0 }: KPICardProps) {
  return (
    <div
      className={cn(
        "card-vault gold-border-glow opacity-0 animate-fade-in",
        "hover:border-gold/30 transition-all duration-300"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          {title}
        </span>
        <span className="text-gold/60">{icon}</span>
      </div>
      <p className="text-3xl font-bold tracking-tight gold-text gold-glow">
        {value}
      </p>
    </div>
  );
}
