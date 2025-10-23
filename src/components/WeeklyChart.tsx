import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { Meal } from "./MealLogger";

interface WeeklyChartProps {
  meals: Meal[];
}

const WeeklyChart = ({ meals }: WeeklyChartProps) => {
  // Group meals by day for the last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      days.push(date);
    }
    return days;
  };

  const last7Days = getLast7Days();
  
  const chartData = last7Days.map(day => {
    const dayMeals = meals.filter(meal => {
      const mealDate = new Date(meal.timestamp);
      return mealDate.toDateString() === day.toDateString();
    });

    const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
    
    return {
      day: dayName,
      calories: dayMeals.reduce((sum, meal) => sum + meal.calories, 0),
      protein: dayMeals.reduce((sum, meal) => sum + meal.protein, 0),
      carbs: dayMeals.reduce((sum, meal) => sum + meal.carbs, 0),
      fats: dayMeals.reduce((sum, meal) => sum + meal.fats, 0),
    };
  });

  return (
    <Card className="p-6 shadow-[var(--shadow-card)]">
      <h2 className="text-2xl font-bold mb-6">Weekly Progress</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="day" 
            className="text-muted-foreground text-sm"
          />
          <YAxis className="text-muted-foreground text-sm" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="calories" 
            stroke="hsl(var(--secondary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--secondary))' }}
          />
          <Line 
            type="monotone" 
            dataKey="protein" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default WeeklyChart;
