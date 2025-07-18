
import { useWeather } from '@/contexts/WeatherContext';
import { useTheme } from '@/contexts/ThemeContext';

const WeatherBackground = () => {
  const { currentWeather } = useWeather();
  const { isDark } = useTheme();

  const getBackgroundClass = () => {
    if (!currentWeather) return isDark ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
    
    const condition = currentWeather.condition;
    
    if (isDark) {
      switch (condition) {
        case 'sunny':
          return 'bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-900';
        case 'rainy':
          return 'bg-gradient-to-br from-slate-900 via-gray-800 to-blue-900';
        case 'cloudy':
          return 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900';
        case 'thunderstorm':
          return 'bg-gradient-to-br from-purple-900 via-gray-900 to-slate-900';
        default:
          return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900';
      }
    } else {
      switch (condition) {
        case 'sunny':
          return 'bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400';
        case 'rainy':
          return 'bg-gradient-to-br from-gray-400 via-blue-500 to-blue-600';
        case 'cloudy':
          return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
        case 'thunderstorm':
          return 'bg-gradient-to-br from-purple-600 via-gray-700 to-gray-800';
        default:
          return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
      }
    }
  };

  return (
    <div className={`fixed inset-0 transition-all duration-1000 ${getBackgroundClass()}`}>
      <div className="absolute inset-0 bg-black/20" />
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherBackground;
