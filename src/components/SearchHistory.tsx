
import { Clock, X } from 'lucide-react';
import { useWeather } from '@/contexts/WeatherContext';
import { Button } from '@/components/ui/button';

const SearchHistory = () => {
  const { searchHistory, searchWeather } = useWeather();

  if (searchHistory.length === 0) return null;

  const clearHistory = () => {
    localStorage.removeItem('weatherSearchHistory');
    window.location.reload(); // Simple way to update context
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Searches
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-white/60 hover:text-white hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {searchHistory.map((city, index) => (
          <button
            key={index}
            onClick={() => searchWeather(city)}
            className="bg-white/10 hover:bg-white/20 rounded-lg px-3 py-2 text-sm text-white transition-all duration-200 border border-white/20"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
