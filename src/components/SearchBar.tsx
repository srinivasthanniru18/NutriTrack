import { Search, Mic, MicOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { foodDatabase } from "@/data/foodDatabase";
import { useToast } from "./ui/use-toast";

export function SearchBar() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchResults = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      
      if (searchResults.length > 0) {
        navigate(`/food/${encodeURIComponent(query.trim())}`);
      } else {
        toast({
          title: "No results found",
          description: "Please try a different search term",
        });
      }
    }
  };

  const toggleVoiceAssistant = () => {
    if (!isListening) {
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
          toast({
            title: "Voice Assistant Active",
            description: "Listening for your food search...",
          });
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
          toast({
            title: "Voice Recognition Error",
            description: "Please try again",
            variant: "destructive",
          });
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } else {
        toast({
          title: "Voice Recognition Not Supported",
          description: "Please use a supported browser like Chrome",
          variant: "destructive",
        });
      }
    } else {
      setIsListening(false);
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
            className="block w-full rounded-full py-4 pl-12 pr-20 search-gradient border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Search for food items..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={toggleVoiceAssistant}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-primary transition-colors"
          >
            {isListening ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}