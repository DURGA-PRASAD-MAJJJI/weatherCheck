
import { useTheme } from '@/contexts/ThemeContext';
import Header from './Header';
import CurrentWeather from './CurrentWeather';
import SearchSection from './SearchSection';
import ForecastSection from './ForecastSection';
import HourlyForecast from './HourlyForecast';
import SearchHistory from './SearchHistory';

const WeatherDashboard = () => {
  const { isDark } = useTheme();

  return (
    <div className="relative z-10 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        <div className="mt-8 space-y-8">
          <SearchSection />
          <CurrentWeather />
          <HourlyForecast />
          <ForecastSection />
          <SearchHistory />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
