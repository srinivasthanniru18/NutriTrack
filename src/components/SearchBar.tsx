import { Search, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/food/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-full py-4 pl-12 pr-12 search-gradient border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Search for food items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <Mic className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
    </form>
  );
}