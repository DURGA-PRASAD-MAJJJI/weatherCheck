import { Moon, Sun, MapPin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useWeather } from '@/contexts/WeatherContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getCurrentLocationWeather, isLoading } = useWeather();

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between"
    >
      {/* Title + Date */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
          Weather Dashboard
        </h1>
        <p className="text-white/80 text-sm md:text-base">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">

        {/* Location Button */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="rounded-full"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={getCurrentLocationWeather}
            disabled={isLoading}
            className="text-white hover:bg-white/20"
          >
            <MapPin
              className={`h-5 w-5 ${isLoading ? 'animate-bounce' : ''}`}
            />
          </Button>
        </motion.div>

        {/* Theme Toggle Button */}
        <motion.div
          whileTap={{ rotate: 180, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:bg-white/20"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
