import { Check } from "lucide-react";

interface AnimatedCheckmarkProps {
  size?: "sm" | "md" | "lg";
  show?: boolean;
}

const sizes = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
};

const iconSizes = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};

export const AnimatedCheckmark = ({ size = "md", show = true }: AnimatedCheckmarkProps) => (
  <div
    className={`${sizes[size]} rounded-full border-4 border-secondary bg-secondary flex items-center justify-center transition-all duration-700
      ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
  >
    <Check className={`${iconSizes[size]} text-secondary-foreground transition-all duration-500 delay-300
      ${show ? "opacity-100 scale-100" : "opacity-0 scale-50"}`} />
  </div>
);
