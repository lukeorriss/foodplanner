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
import { Vegan, Leaf, CircleDollarSign } from "lucide-react";
import { PiPepperBold } from "react-icons/pi";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const dietIcons = {
  vegan: <Vegan className="w-4 h-4 text-green-800" />,
  vegetarian: <Leaf className="w-4 h-4 text-green-800" />,
  premium: <CircleDollarSign className="w-4 h-4 text-yellow-800" />,
  spicy: <PiPepperBold className="w-4 h-4 text-red-800" />,
};

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
          url: "https://foodplanner.orriss.dev",
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
          <Button onClick={resetToInitialState}>Reset</Button>
        </div>
        <p className="mb-4 text-sm text-gray-600">Note: All default meals are representative of two servings.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>All Meals</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {allMeals.map((meal) => (
                  <div key={meal.id} className="flex justify-between items-center mb-2">
                    <Button variant="ghost" onClick={() => openMealDetails(meal)} className={meal.isUserAdded ? "text-blue-400" : ""}>
                      {meal.name}
                      {meal.diet?.map((dietType) => (
                        <span key={dietType} className="" title={dietType}>
                          {dietIcons[dietType as keyof typeof dietIcons]}
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
                <div className="flex items-center justify-between space-x-2">
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
                    <Button variant="ghost" onClick={() => openMealDetails(meal)} className={meal.isUserAdded ? "text-blue-400" : ""}>
                      {meal.name}
                      {meal.diet?.map((dietType) => (
                        <span key={dietType} className="" title={dietType}>
                          {dietIcons[dietType as keyof typeof dietIcons]}
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
              <CardTitle>Week Plan</CardTitle>
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

        <div className="mt-4">
          <Button variant="outline" onClick={clearLocalStorage}>
            Clear Local Storage
          </Button>
        </div>
      </div>
      <MealDetailsModal meal={currentMeal} isOpen={isMealDetailsOpen} onClose={() => setIsMealDetailsOpen(false)} />
      <ToastContainer />
    </>
  );
}
