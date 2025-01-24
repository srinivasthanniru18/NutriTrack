import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

export default function FoodDetails() {
  const { query } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Loading nutrition information",
      description: `Searching details for ${query}`,
    });
  }, [query]);

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4 gradient-text">
          Nutrition Information for {query}
        </h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-700">Calories</h3>
            <p className="text-2xl font-bold gradient-text">267 kcal</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700">Protein</h3>
              <p className="text-xl font-bold gradient-text">12g</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700">Carbs</h3>
              <p className="text-xl font-bold gradient-text">35g</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-700">Fat</h3>
              <p className="text-xl font-bold gradient-text">8g</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}