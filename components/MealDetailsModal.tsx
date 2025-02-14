import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Meal } from "../data/staticMeals";
import Link from "next/link";
import { Button } from "./ui/button";
import { capitalise } from "@/lib/utils";
import { dietIcons } from "@/data/diet";

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
          <div className="flex flex-wrap gap-2">
            {meal.diet?.map((dietType) => {
              return (
                <p key={dietType} title={capitalise(dietType)} className={`flex items-center gap-2 text-sm border rounded-md px-2 py-1`}>
                  {dietIcons[dietType].icon} {capitalise(dietIcons[dietType].text)}
                </p>
              );
            })}
          </div>
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
