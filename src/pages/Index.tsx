import { SearchBar } from "@/components/SearchBar";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl w-full text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
          <span className="gradient-text">Track Your Nutrition</span>
        </h1>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl">
          Search for any food item to get detailed nutritional information
          and make healthier choices.
        </p>
        <SearchBar />
        <p className="mt-8 text-sm text-gray-500">
          When you're done, check out our recipes, many with reduced calories!
        </p>
      </div>
    </div>
  );
}