import {
  Dumbbell,
  Headphones,
  Lamp,
  Puzzle,
  Shirt,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";

const icons: Record<ProductCategory, LucideIcon> = {
  Electronics: Headphones,
  Clothing: Shirt,
  Home: Lamp,
  Sports: Dumbbell,
  Beauty: Sparkles,
  Toys: Puzzle,
};

const tints: Record<ProductCategory, string> = {
  Electronics: "bg-primary/10 text-primary",
  Clothing: "bg-success/10 text-success",
  Home: "bg-warning/10 text-warning",
  Sports: "bg-danger/10 text-danger",
  Beauty: "bg-primary/10 text-primary",
  Toys: "bg-success/10 text-success",
};

type CategoryIconProps = {
  category: ProductCategory;
  className?: string;
  iconClassName?: string;
};

export default function CategoryIcon({
  category,
  className,
  iconClassName,
}: CategoryIconProps) {
  const Icon = icons[category];

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg",
        tints[category],
        className,
      )}
    >
      <Icon className={cn("h-8 w-8", iconClassName)} />
    </div>
  );
}