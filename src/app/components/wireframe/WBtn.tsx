import { cn } from "../../components/ui/utils";

interface WBtnProps {
  label: string;
  onClick?: () => void;
  dark?: boolean;
  variant?: "primary" | "secondary" | "destructive" | "outline";
  className?: string;
  icon?: React.ReactNode;
}

export const WBtn = ({
  label,
  onClick,
  dark = false,
  variant = "outline",
  className = "",
  icon,
}: WBtnProps) => {
  const variants = {
    primary: "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90",
    destructive: "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90",
    outline: dark
      ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
      : "bg-card text-card-foreground border-border hover:bg-muted",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "btn-accessible flex items-center justify-center gap-2 w-full py-4 px-4 font-bold text-lg rounded-xl",
        "border-2 active:scale-[0.97] transition-all select-none",
        variants[variant],
        className
      )}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      {label}
    </button>
  );
};
