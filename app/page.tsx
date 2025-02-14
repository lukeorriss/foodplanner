"use client";

import { useEffect, useState } from "react";
import { staticMeals, type Meal } from "../data/staticMeals";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddMealModal } from "../components/AddMealModal";
import { MealDetailsModal } from "../components/MealDetailsModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import Script from "next/script";
import { dietIcons } from "@/data/diet";
import { ClipboardIcon } from "lucide-react";
import { capitalise } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function MealPlanner() {
  const [userMeals, setUserMeals] = useState<Meal[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const [weekPlan, setWeekPlan] = useState<Record<string, Meal>>({});
  const [randomMealsCount, setRandomMealsCount] = useState(7);
  const [isMealDetailsOpen, setIsMealDetailsOpen] = useState(false);

  useEffect(() => {
    const savedUserMeals = localStorage.getItem("userMeals");
    const savedSelectedMeals = localStorage.getItem("selectedMeals");
    const savedWeekPlan = localStorage.getItem("weekPlan");

    if (savedUserMeals) {
      setUserMeals(JSON.parse(savedUserMeals));
    }
    if (savedSelectedMeals) {
      setSelectedMeals(JSON.parse(savedSelectedMeals));
    }
    if (savedWeekPlan) {
      setWeekPlan(JSON.parse(savedWeekPlan));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userMeals", JSON.stringify(userMeals));
  }, [userMeals]);

  useEffect(() => {
    localStorage.setItem("selectedMeals", JSON.stringify(selectedMeals));
  }, [selectedMeals]);

  useEffect(() => {
    localStorage.setItem("weekPlan", JSON.stringify(weekPlan));
  }, [weekPlan]);

  const addMeal = (meal: Meal) => {
    setSelectedMeals([...selectedMeals, meal]);
  };

  const removeMeal = (mealId: string) => {
    setSelectedMeals(selectedMeals.filter((meal) => meal.id !== mealId));
    setWeekPlan((prevPlan) => {
      const newPlan = { ...prevPlan };
      Object.keys(newPlan).forEach((day) => {
        if (newPlan[day].id === mealId) {
          delete newPlan[day];
        }
      });
      return newPlan;
    });
  };

  const handleMealAdded = (newMeal: Meal) => {
    setUserMeals([...userMeals, { ...newMeal, isUserAdded: true }]);
  };

  const planWeek = () => {
    if (selectedMeals.length < DAYS_OF_WEEK.length) {
      toast.error("Please select at least 7 meals before planning the week.");
      return;
    }

    const shuffled = [...selectedMeals].sort(() => 0.5 - Math.random());
    const newWeekPlan: Record<string, Meal> = {};
    DAYS_OF_WEEK.forEach((day, index) => {
      newWeekPlan[day] = shuffled[index];
    });
    setWeekPlan(newWeekPlan);
    toast.success("Week plan generated successfully!");
  };

  const randomizeMeals = () => {
    const allMeals = [...staticMeals, ...userMeals];
    if (allMeals.length < randomMealsCount) {
      toast.error(`Not enough meals available. Please add more meals or reduce the number of random meals.`);
      return;
    }

    const shuffled = allMeals.sort(() => 0.5 - Math.random());
    const newSelectedMeals = shuffled.slice(0, randomMealsCount);
    setSelectedMeals(newSelectedMeals);
    toast.success(`${randomMealsCount} meals randomly selected!`);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("userMeals");
    localStorage.removeItem("selectedMeals");
    localStorage.removeItem("weekPlan");
    setUserMeals([]);
    setSelectedMeals([]);
    setWeekPlan({});
    toast.info("Local storage cleared. App reset to initial state.");
  };

  const resetToInitialState = () => {
    setUserMeals([]);
    setSelectedMeals([]);
    setWeekPlan({});
    setRandomMealsCount(7);
    clearLocalStorage();
    toast.info("Application reset to initial state.");
  };

  const openMealDetails = (meal: Meal) => {
    setCurrentMeal(meal);
    setIsMealDetailsOpen(true);
  };

  const allMeals = [...staticMeals, ...userMeals];

  const totalIngredients = Object.values(weekPlan).reduce((acc, meal) => {
    // const servings = meal.servings || 1;
    meal.ingredients.forEach((ingredient) => {
      if (!acc[meal.name]) {
        acc[meal.name] = [];
      }
      if (!acc[meal.name].includes(`${ingredient}`)) {
        acc[meal.name].push(`${ingredient}`);
      }
    });
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Weekly Meal Planner",
          url: "https://meals.orriss.dev",
          description: "An interactive meal planning tool to organize your weekly meals and generate shopping lists.",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Any",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        })}
      </Script>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Weekly Meal Planner</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearLocalStorage}>
              Clear Local Storage
            </Button>
            <Button onClick={resetToInitialState}>Reset</Button>
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-600">Note: All default meals are representative of two servings.</p>
        <div className="flex items-center space-x-2 mb-4">
          {Object.values(dietIcons).map((diet) => {
            return (
              <div key={diet.text} className="flex items-center space-x-2 hover:cursor-pointer">
                <Switch id={diet.text} className={`data-[state=checked]:bg-${diet.color}]`} />
                <Label htmlFor={diet.text} className={`text-${diet.color} text-sm`}>
                  {diet.text}
                </Label>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>All Meals</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <ScrollArea className="h-[300px] w-full">
                {allMeals.map((meal) => (
                  <div key={meal.id} className="flex justify-between items-center mb-2 w-full">
                    <Button variant="ghost" size="sm" onClick={() => openMealDetails(meal)} className={meal.isUserAdded ? "text-blue-400" : "" + " whitespace-normal text-left"}>
                      {meal.name}
                      {meal.diet?.map((dietType) => (
                        <span key={dietType} className={`text-${dietIcons[dietType].color}`} title={dietIcons[dietType].text}>
                          {dietIcons[dietType].icon}
                        </span>
                      ))}
                    </Button>
                    <Button onClick={() => addMeal(meal)} disabled={selectedMeals.some((m) => m.id === meal.id)} className={meal.isUserAdded ? "bg-blue-400 hover:bg-blue-500" : ""}>
                      Add
                    </Button>
                  </div>
                ))}
              </ScrollArea>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <Input id="randomCount" type="number" value={randomMealsCount} onChange={(e) => setRandomMealsCount(Number(e.target.value))} min={1} max={allMeals.length} className="w-20" />
                    <Button onClick={randomizeMeals}>Randomise Meals</Button>
                  </div>
                  <AddMealModal onMealAdded={handleMealAdded} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Selected Meals</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {selectedMeals.map((meal) => (
                  <div key={meal.id} className="flex justify-between items-center mb-2">
                    <Button variant="ghost" onClick={() => openMealDetails(meal)} className={meal.isUserAdded ? "text-blue-400" : "" + " whitespace-normal text-left"}>
                      {meal.name}
                      {meal.diet?.map((dietType) => (
                        <span key={dietType} className={`text-${dietIcons[dietType].color}`} title={dietIcons[dietType].text}>
                          {dietIcons[dietType].icon}
                        </span>
                      ))}
                    </Button>
                    <Button variant="destructive" onClick={() => removeMeal(meal.id)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </ScrollArea>
              <div className="mt-4">
                <Button onClick={planWeek}>Plan Week</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Week Plan</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="mb-2">
                    <strong>{day}:</strong>{" "}
                    {weekPlan[day] ? (
                      <span className={`cursor-pointer ${weekPlan[day].isUserAdded ? "text-blue-400" : ""}`} onClick={() => openMealDetails(weekPlan[day])}>
                        {weekPlan[day].name}
                      </span>
                    ) : (
                      "Not planned"
                    )}
                  </div>
                ))}
              </ScrollArea>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = DAYS_OF_WEEK.map((day) => `${day}\t${weekPlan[day] ? weekPlan[day].name : "Not planned"}`).join("\n");
                    navigator.clipboard.writeText(text);
                    toast.success("Week plan copied to clipboard!");
                  }}
                >
                  <ClipboardIcon className="h-4 w-4" />
                  Copy Days & Meals
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = Object.values(weekPlan)
                      .map((meal) => (meal ? meal.name : "Not planned"))
                      .join("\n");
                    navigator.clipboard.writeText(text);
                    toast.success("Week plan copied to clipboard!");
                  }}
                >
                  <ClipboardIcon className="h-4 w-4" />
                  Copy Meals
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingredients Needed</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {Object.entries(totalIngredients).map(([mealName, ingredients]) => (
                  <div key={mealName} className="mb-4">
                    <h3 className="font-semibold">{mealName}</h3>
                    <ul>
                      {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
      <MealDetailsModal meal={currentMeal} isOpen={isMealDetailsOpen} onClose={() => setIsMealDetailsOpen(false)} />
      <ToastContainer />
    </>
  );
}
