import { Vegan, Leaf, CircleDollarSign } from "lucide-react";
import { PiPepperBold } from "react-icons/pi";

interface DietIcon {
  icon: React.ReactNode;
  color: string;
  text: string;
}

export const dietIcons: Record<string, DietIcon> = {
  vegan: {
    icon: <Vegan className="w-4 h-4 text-green-200" />,
    color: "text-green-800",
    text: "Vegan",
  },
  vegetarian: {
    icon: <Leaf className="w-4 h-4" />,
    color: "text-green-800",
    text: "Vegetarian",
  },
  premium: {
    icon: <CircleDollarSign className="w-4 h-4" />,
    color: "text-yellow-800",
    text: "Premium",
  },
  spicy: {
    icon: <PiPepperBold className="w-4 h-4" />,
    color: "text-red-800",
    text: "Spicy",
  },
};
