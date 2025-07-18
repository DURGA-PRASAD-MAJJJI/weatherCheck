import { useWeather } from '@/contexts/WeatherContext';
import WeatherIcon from './WeatherIcon';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

const ForecastSection = () => {
  const { forecast } = useWeather();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl"
    >
      <h3 className="text-xl font-semibold text-white mb-6">7-Day Forecast</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast.map((day, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-white/10 rounded-xl p-4 text-center shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <p className="text-sm font-medium text-white/80 mb-2">{day.date}</p>

            <motion.div
              className="flex justify-center mb-3"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 2,
                ease: 'easeInOut',
                delay: index * 0.05,
              }}
            >
              <WeatherIcon 
                condition={day.icon} 
                size="medium" 
                className="text-white w-10 h-10" 
              />
            </motion.div>

            <div className="space-y-1">
              <p className="text-lg font-semibold text-white">{day.high}°</p>
              <p className="text-sm text-white/60">{day.low}°</p>
            </div>

            <p className="text-xs text-white/60 mt-2 leading-tight">{day.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastSection;
