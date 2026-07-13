import { cn } from "../../components/ui/utils";

interface WLabelProps {
  text: string;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  bold?: boolean;
  muted?: boolean;
  className?: string;
}

const sizes: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

export const WLabel = ({ text, size = "base", bold = false, muted = false, className = "" }: WLabelProps) => (
  <span
    className={cn(
      sizes[size],
      bold ? "font-bold" : "font-normal",
      muted ? "text-muted-foreground" : "text-foreground",
      className
    )}
  >
    {text}
  </span>
);
