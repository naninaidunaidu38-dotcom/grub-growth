import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface MealLoggerProps {
  onMealAdd: (meal: Meal) => void;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: Date;
}

const MealLogger = ({ onMealAdd }: MealLoggerProps) => {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mealName || !calories || !protein || !carbs || !fats) {
      toast.error("Please fill in all fields");
      return;
    }

    const meal: Meal = {
      id: Date.now().toString(),
      name: mealName,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
      timestamp: new Date(),
    };

    onMealAdd(meal);
    
    // Reset form
    setMealName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
    
    toast.success("Meal logged successfully!");
  };

  return (
    <Card className="p-6 shadow-[var(--shadow-card)]">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Log Your Meal
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="mealName">Meal Name</Label>
          <Input
            id="mealName"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder="e.g., Chicken Rice Bowl"
            className="mt-1.5"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="calories">Calories (kcal)</Label>
            <Input
              id="calories"
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="500"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="protein">Protein (g)</Label>
            <Input
              id="protein"
              type="number"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              placeholder="30"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="carbs">Carbs (g)</Label>
            <Input
              id="carbs"
              type="number"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              placeholder="50"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="fats">Fats (g)</Label>
            <Input
              id="fats"
              type="number"
              value={fats}
              onChange={(e) => setFats(e.target.value)}
              placeholder="15"
              className="mt-1.5"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          <Plus className="mr-2 h-4 w-4" />
          Log Meal
        </Button>
      </form>
    </Card>
  );
};

export default MealLogger;
