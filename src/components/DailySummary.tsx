import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Activity, Beef, Wheat } from "lucide-react";
import type { Meal } from "./MealLogger";

interface DailySummaryProps {
  meals: Meal[];
}

const DailySummary = ({ meals }: DailySummaryProps) => {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = meals.reduce((sum, meal) => sum + meal.fats, 0);

  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65,
  };

  const macros = [
    {
      name: "Calories",
      value: totalCalories,
      goal: dailyGoals.calories,
      unit: "kcal",
      icon: Flame,
      color: "text-secondary",
    },
    {
      name: "Protein",
      value: totalProtein,
      goal: dailyGoals.protein,
      unit: "g",
      icon: Beef,
      color: "text-primary",
    },
    {
      name: "Carbs",
      value: totalCarbs,
      goal: dailyGoals.carbs,
      unit: "g",
      icon: Wheat,
      color: "text-accent",
    },
    {
      name: "Fats",
      value: totalFats,
      goal: dailyGoals.fats,
      unit: "g",
      icon: Activity,
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Today's Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {macros.map((macro) => {
          const Icon = macro.icon;
          const percentage = Math.min((macro.value / macro.goal) * 100, 100);
          
          return (
            <Card key={macro.name} className="p-6 shadow-[var(--shadow-card)] hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${macro.color}`} />
                  <span className="font-medium text-sm text-muted-foreground">{macro.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{macro.value}</span>
                  <span className="text-muted-foreground text-sm">/ {macro.goal}{macro.unit}</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DailySummary;
