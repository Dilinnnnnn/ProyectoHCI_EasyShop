import { cn } from "../../components/ui/utils";

export const Divider = ({ className }: { className?: string }) => (
  <div className={cn("w-full h-px bg-border my-2", className)} />
);
