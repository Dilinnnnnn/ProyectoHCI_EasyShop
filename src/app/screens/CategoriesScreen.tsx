import { useApp } from "../context/AppContext";
import { categories } from "../data/products";
import { TopBar } from "../components/layout/TopBar";
import { BottomNav } from "../components/layout/BottomNav";
import * as Icons from "lucide-react";

interface CategoriesScreenProps {
  voiceActive: boolean;
  onVoice: () => void;
}

export const CategoriesScreen = ({ voiceActive, onVoice }: CategoriesScreenProps) => {
  const { selectCategory } = useApp();

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as Record<string, React.FC<{ className?: string }>>)[
      iconName.replace("-", "")
    ] || Icons.Package;
    return <IconComponent className="w-9 h-9" />;
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      <TopBar title="Categorías" showBack showVoice onVoice={onVoice} voiceActive={voiceActive} />
      <div className="screen-scroll flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => selectCategory(c.id)}
              className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center gap-4 active:scale-[0.97] transition-all hover:shadow-md"
              aria-label={c.label}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: c.color + "18", color: c.color }}
              >
                {getIcon(c.icon)}
              </div>
              <span className="font-bold text-base text-foreground">{c.label}</span>
            </button>
          ))}
        </div>
      </div>
      <BottomNav active="categories" />
    </div>
  );
};
