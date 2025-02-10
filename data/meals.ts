export interface Meal {
  id: string;
  name: string;
  ingredients: string[];
}

export const meals: Meal[] = [];

export function addMeal(meal: Meal) {
  meals.push(meal);
}
