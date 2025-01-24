import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { foodDatabase, FoodItem } from "@/data/foodDatabase";

export default function FoodDetails() {
  const { query } = useParams();
  const { toast } = useToast();
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);

  useEffect(() => {
    if (query) {
      const searchResults = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      
      if (searchResults.length > 0) {
        setFoodItem(searchResults[0]);
        toast({
          title: "Food item found",
          description: `Showing details for ${searchResults[0].name}`,
        });
      } else {
        toast({
          title: "Food not found",
          description: "Please try a different search term",
          variant: "destructive",
        });
      }
    }
  }, [query]);

  if (!foodItem) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Card className="p-8 bg-gradient-to-br from-rose-50 to-teal-50 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 gradient-text text-center">
            Food not found
          </h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Card className="overflow-hidden bg-white shadow-xl rounded-xl">
        <div className="p-8 bg-gradient-to-br from-rose-50 to-teal-50">
          <h2 className="text-3xl font-bold mb-6 gradient-text text-center">
            {foodItem.name}
          </h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Calories</h3>
              <p className="text-4xl font-bold gradient-text">{foodItem.calories} kcal</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Protein</h3>
                <p className="text-2xl font-bold gradient-text">{foodItem.protein}g</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Carbs</h3>
                <p className="text-2xl font-bold gradient-text">{foodItem.carbohydrates}g</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Fat</h3>
                <p className="text-2xl font-bold gradient-text">{foodItem.fats}g</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Vitamins</h3>
                <p className="text-xl font-bold gradient-text">{foodItem.vitamins}</p>
              </div>
              <div className="p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Minerals</h3>
                <p className="text-xl font-bold gradient-text">{foodItem.minerals}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}