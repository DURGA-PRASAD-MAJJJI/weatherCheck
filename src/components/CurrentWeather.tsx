import { useEffect } from 'react';
import { Thermometer, Droplets, Wind, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherIcon from './WeatherIcon';
import LoadingSkeleton from './LoadingSkeleton';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const CurrentWeather = () => {
  const { currentWeather, isLoading, error } = useWeather();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load weather data", {
        description: error,
      });
    }
  }, [error]);

  if (isLoading) return <LoadingSkeleton />;
  if (!currentWeather) return null;

  const metricCards = [
    {
      icon: <Thermometer className="h-6 w-6 text-white/80 mx-auto mb-2" />,
      label: 'Feels like',
      value: `${currentWeather.temperature + 2}°`,
    },
    {
      icon: <Droplets className="h-6 w-6 text-white/80 mx-auto mb-2" />,
      label: 'Humidity',
      value: `${currentWeather.humidity}%`,
    },
    {
      icon: <Wind className="h-6 w-6 text-white/80 mx-auto mb-2" />,
      label: 'Wind',
      value: `${currentWeather.windSpeed} km/h`,
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className="backdrop-blur-md bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: City + Temp + Icon */}
        <motion.div 
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
            <MapPin className="w-5 h-5 text-white/70" />
            {currentWeather.city}
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <span className="text-5xl md:text-6xl font-light text-white">
              {currentWeather.temperature}°
            </span>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
            >
              <WeatherIcon 
                condition={currentWeather.icon} 
                size="large"
                className="text-white w-16 h-16" 
              />
            </motion.div>
          </div>

          <p className="text-xl text-white/80 capitalize">
            {currentWeather.description}
          </p>
        </motion.div>

        {/* Right: Metric Cards */}
        <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
          {metricCards.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/10 rounded-xl p-4 text-center shadow-md hover:scale-105 transition-transform duration-300"
            >
              {item.icon}
              <p className="text-sm text-white/60">{item.label}</p>
              <p className="text-lg font-semibold text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;
