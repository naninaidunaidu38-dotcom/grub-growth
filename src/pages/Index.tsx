import { useState, useEffect } from "react";
import MealLogger, { type Meal } from "@/components/MealLogger";
import DailySummary from "@/components/DailySummary";
import WeeklyChart from "@/components/WeeklyChart";
import MealHistory from "@/components/MealHistory";
import { toast } from "sonner";
import heroImage from "@/assets/hero-nutrition.jpg";

const Index = () => {
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem("nutrition-meals");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("nutrition-meals", JSON.stringify(meals));
  }, [meals]);

  const handleMealAdd = (meal: Meal) => {
    setMeals([...meals, meal]);
  };

  const handleMealDelete = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id));
    toast.success("Meal deleted");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[var(--gradient-hero)]">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Healthy nutrition" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            NutriTrack
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your meals, monitor your macros, and achieve your nutrition goals
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Daily Summary */}
        <DailySummary meals={meals} />

        {/* Meal Logger & History */}
        <div className="grid lg:grid-cols-2 gap-8">
          <MealLogger onMealAdd={handleMealAdd} />
          <MealHistory meals={meals} onDelete={handleMealDelete} />
        </div>

        {/* Weekly Chart */}
        <WeeklyChart meals={meals} />
      </div>
    </div>
  );
};

export default Index;
