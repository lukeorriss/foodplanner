export interface Meal {
  id: string;
  name: string;
  ingredients: string[];
  isUserAdded?: boolean;
  servings?: number;
  link?: string;
  diet?: string[];
}

export const staticMeals: Meal[] = [
  {
    id: "1",
    name: "Chilli Jam Glazed Halloumi",
    ingredients: [
      "1 Garlic Clove",
      "1 Shallot",
      "125g Baby Plum Tomatos",
      "1 Green Pepper",
      "250g Halloumi",
      "25g Sun Dried Tomato Paste",
      "120g Bulgur Wheat",
      "10g Vegetable Stock Paste",
      "25g Chilli Jam",
      "240ml Boiled Water",
    ],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/chilli-jam-glazed-halloumi-63332b321d493b4599dd4bf8",
    diet: ["vegetarian"],
  },
  {
    id: "2",
    name: "Spiced Chickpea and Pepper Traybake",
    ingredients: [
      "1 Carton Chickpeas",
      "1 Bell Pepper",
      "2 Garlic Cloves",
      "1tsp Mixed Spices",
      "190g Baby Plum Tomatos",
      "1 Bunch Chives",
      "120g Couscous",
      "10g Vegetable Stock Paste",
      "75g Natural Greek Yohgurt",
      "25g Red Pepper Chilli Jam",
      "50g Fresh Pesto",
      "240ml Boiled Water",
    ],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/spiced-chickpea-and-pepper-traybake-633ea48928d328faab4cf6d1",
  },
  {
    id: "3",
    name: "Cajun Halloumi Wraps",
    ingredients: [
      "450g Potatoes",
      "250g Halloumi",
      "1 Bell Pepper",
      "32g Sweet Chilli Sauce",
      "1tsp Cajun Blackening",
      "12g Red Wine Vinegar",
      "20g Rocket",
      "6 Plain Tortilla",
      "1/2tsp Sugar",
      "1tbsp Olive Oil",
    ],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/cajun-halloumi-wraps-620b85277656b36e01506da9",
  },
  {
    id: "4",
    name: "BBQ Glazed Sausages in Buns and Wedges",
    ingredients: [
      "450g Potatoes",
      "2 Garlic Cloves",
      "2 Hickory Smoked Sausages",
      "120g Coleslaw Mix",
      "32g Mayonnaise",
      "15g Cider Vinegar",
      "1 Onion",
      "60g Mature Cheddar Cheese",
      "2 Brioche Hot Dog Buns",
      "32g BBQ Sauce",
      "1tbsp Flour",
    ],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/bbq-glazed-sausages-in-buns-and-wedges-64074b72683721c9a32b0948",
  },
  {
    id: "5",
    name: "Cheesy Melt in the Middle Beef Burger",
    ingredients: [
      "450g Potatoes",
      "30g Mature Cheddar Cheese",
      "1 Garlic Clove",
      "25g Sun Dried Tomato Paste",
      "10g Panko Breadcrumbs",
      "240g Beef Mince",
      "1 Medium Tomato",
      "12ml Balsamic Glaze",
      "2 Glazed Burger Buns",
      "50g Premium Baby Leaf Salad",
      "1tbsp Olive Oil",
      "2tbsp Mayonnaise",
    ],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/cheesy-melt-in-the-middle-beef-burger-63332b30607fcf1c8782283f",
  },
  {
    id: "6",
    name: "Butternut Squash and Chorizo Risotto",
    ingredients: [
      "20g Chicken Stock Paste",
      "1 Butternut Squash",
      "60g Chorizo",
      "1 Onion",
      "2 Garlic Cloves",
      "175g Risotto Rice",
      "25g Hazelnuts",
      "1 Bunch Sage",
      "25g Panko Breadcrumbs",
      "40g Grated Hard Italian Cheese",
      "500ml Boiled Water",
      "1tbsp Olive Oil",
      "20g Butter",
    ],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/butternut-squash-and-chorizo-risotto-635806eec60a873ac92c4088",
  },
  {
    id: "7",
    name: "Pan-Seared Sea Bass and Warm Tomato Salsa",
    ingredients: ["450g Potatoes", "1 Sachet Dried Rosemary", "1/2 Lemon", "1 Medium Tomato", "1 Garlic Clove", "32g Fresh Pesto", "2 Sea Bass Fillets", "50g Premium Baby Leaf Salad"],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/pan-seared-sea-bass-and-warm-tomato-salsa-626650ba62d0447b58050a8d",
  },
  {
    id: "8",
    name: "Thai Style Peanut Chicken Noodles",
    ingredients: [
      "1 Garlic Clove",
      "1/2 Lime",
      "80g Green Beans",
      "2 Nests Egg Noodles",
      "260g Diced Chicken Breast",
      "30g Peanut Butter",
      "15ml Soy Sauce",
      "25g Kejap Manis",
      "45g Yellow Thai Style Paste",
      "1tsp Sugar",
      "125ml Boiled Water",
    ],
    diet: ["spicy"],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/thai-style-peanut-chicken-noodles-63332b26607fcf1c87822839",
  },
  {
    id: "9",
    name: "Roasted Chicken and Chive Sauce",
    ingredients: ["2 Chicken Breast Fillets", "450g Potatoes", "100g Chopped Cavolo Nero/Spinach", "1 Bunch Chives", "5g Chicken Stock Paste", "75g Creme Fraiche", "75ml Water", "15g Butter"],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/roasted-chicken-and-chive-sauce-64a43bfbf12193f26cfb0471",
  },
  {
    id: "10",
    name: "Halloumi and Roasted Pepper Rigatoni",
    ingredients: [
      "250g Halloumi",
      "1 Bell Pepper",
      "1tsp Italian Seasoning",
      "2 Garlic Cloves",
      "400g Chopped Tomatoes",
      "10g Vegetable Stock Paste",
      "180g Rigatoni Pasta",
      "100g Cavolo Nero/Spinach",
      "1/2tsp Sugar",
      "75ml Water",
    ],
    servings: 2,
    link: "https://www.hellofresh.co.uk/recipes/halloumi-and-roasted-pepper-rigatoni-626f934219a615291f08c2a7",
    diet: ["vegetarian"],
  },
  {
    id: "11",
    name: "Beef Stroganoff",
    ingredients: [
      "1tbsp Olive Oil",
      "1 Onion",
      "1 Garlic Clove",
      "1tbsp Butter",
      "250g Mushrooms (Woodland Preferred)",
      "1tbsp Flour",
      "500g Fillet Steak",
      "150g Creme Fraiche",
      "1tsp English Mustard",
      "100ml Beef Stock",
      "1/2 Small Pack of Parsley",
    ],
    servings: 2,
    link: "https://www.bbcgoodfood.com/recipes/beef-stroganoff",
    diet: ["premium"],
  },
];
