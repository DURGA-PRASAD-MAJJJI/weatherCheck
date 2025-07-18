
import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useWeather } from '@/contexts/WeatherContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchWeather, isLoading } = useWeather();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await searchWeather(searchTerm.trim());
      setSearchTerm('');
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className="bg-white/20 hover:bg-white/30 text-white border-white/20"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchSection;
