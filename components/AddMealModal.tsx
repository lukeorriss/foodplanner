"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Meal } from "../data/staticMeals";

interface AddMealModalProps {
  onMealAdded: (meal: Meal) => void;
}

export function AddMealModal({ onMealAdded }: AddMealModalProps) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [servings, setServings] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeal: Meal = {
      id: Date.now().toString(),
      name,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      servings,
      isUserAdded: true,
    };
    onMealAdded(newMeal);
    setName("");
    setIngredients("");
    setServings(1);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Meal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-blue-400">Add New Meal</DialogTitle>
          <DialogDescription>Create a new meal to add to your meal planner.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ingredients" className="text-right">
                Ingredients
              </Label>
              <Textarea id="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Enter ingredients separated by commas" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="servings" className="text-right">
                Servings
              </Label>
              <Input id="servings" type="number" value={servings} onChange={(e) => setServings(Number(e.target.value))} min={1} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white">
              Add Meal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
