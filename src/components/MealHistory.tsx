import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Meal } from "./MealLogger";

interface MealHistoryProps {
  meals: Meal[];
  onDelete: (id: string) => void;
}

const MealHistory = ({ meals, onDelete }: MealHistoryProps) => {
  const todayMeals = meals.filter(meal => {
    const mealDate = new Date(meal.timestamp);
    const today = new Date();
    return mealDate.toDateString() === today.toDateString();
  });

  const sortedMeals = [...todayMeals].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card className="p-6 shadow-[var(--shadow-card)]">
      <h2 className="text-2xl font-bold mb-4">Today's Meals</h2>
      <ScrollArea className="h-[400px] pr-4">
        {sortedMeals.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No meals logged today. Start tracking your nutrition!
          </div>
        ) : (
          <div className="space-y-3">
            {sortedMeals.map((meal) => (
              <div
                key={meal.id}
                className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{meal.name}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(meal.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Clock className="h-3 w-3" />
                  {new Date(meal.timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Cal:</span>{" "}
                    <span className="font-medium">{meal.calories}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">P:</span>{" "}
                    <span className="font-medium">{meal.protein}g</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">C:</span>{" "}
                    <span className="font-medium">{meal.carbs}g</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">F:</span>{" "}
                    <span className="font-medium">{meal.fats}g</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default MealHistory;
