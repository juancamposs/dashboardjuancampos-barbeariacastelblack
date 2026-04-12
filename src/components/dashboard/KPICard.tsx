import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  delay?: number;
  description?: string;
}

export function KPICard({ title, value, icon, delay = 0, description }: KPICardProps) {
  return (
    <div
      className={cn(
        "card-vault gold-border-glow opacity-0 animate-fade-in",
        "hover:border-primary/20 transition-all duration-300 p-8"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-muted-foreground/80 text-xs font-medium tracking-[0.15em] uppercase">
          {title}
        </span>
        <span className="text-primary/40">{icon}</span>
      </div>
      <p className="text-4xl font-extrabold tracking-tight gold-text gold-glow leading-none">
        {value}
      </p>
      {description && (
        <p className="text-[10px] text-muted-foreground/40 mt-3 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
