import { cn } from "../../components/ui/utils";

interface WBoxProps {
  className?: string;
  label?: string;
  sublabel?: string;
  dashed?: boolean;
  dark?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const WBox = ({ className = "", label, sublabel, dashed, dark, children, onClick }: WBoxProps) => (
  <div
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center select-none",
      dashed
        ? "border-2 border-dashed border-muted-foreground/30"
        : "border border-border",
      dark
        ? "bg-primary text-primary-foreground"
        : "bg-card text-card-foreground",
      onClick && "cursor-pointer active:scale-[0.97] transition-transform",
      className
    )}
  >
    {children ?? (
      <>
        {label && <span className="text-center font-bold text-sm leading-tight px-1">{label}</span>}
        {sublabel && <span className="text-center text-xs mt-1 text-muted-foreground px-1">{sublabel}</span>}
      </>
    )}
  </div>
);
