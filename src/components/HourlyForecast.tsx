import { useWeather } from '@/contexts/WeatherContext';
import WeatherIcon from './WeatherIcon';

const HourlyForecast = () => {
  const { hourlyForecast } = useWeather();

  return (
    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl">
      <h3 className="text-xl font-semibold text-white mb-6">Hourly Forecast</h3>

      <div className="overflow-x-auto">
        {hourlyForecast.length === 0 ? (
          <p className="text-white/70">No hourly forecast available.</p>
        ) : (
          <div className="flex gap-4 pb-2">
            {hourlyForecast.map((hour, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-200 cursor-pointer min-w-[80px] flex-shrink-0"
              >
                <p className="text-sm font-medium text-white/80 mb-2">
                  {hour.time}
                </p>

                <div className="flex justify-center mb-3">
                  <WeatherIcon 
                    condition={hour.icon} 
                    size="small" 
                    className="text-white" 
                  />
                </div>

                <p className="text-lg font-semibold text-white">
                  {hour.temperature}°
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HourlyForecast;
