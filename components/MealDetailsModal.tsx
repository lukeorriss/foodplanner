import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Meal } from "../data/staticMeals";
import Link from "next/link";
import { Button } from "./ui/button";

interface MealDetailsModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MealDetailsModal({ meal, isOpen, onClose }: MealDetailsModalProps) {
  if (!meal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={meal.isUserAdded ? "text-blue-400" : ""}>{meal.name}</DialogTitle>
          <DialogDescription>Servings: {meal.servings || "Not specified"}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc pl-5">
            {meal.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        {meal.link && (
          <div className="mt-4">
            <Button variant="outline" asChild>
              <Link href={meal.link} target="_blank" rel="noopener noreferrer">
                View Recipe
              </Link>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
