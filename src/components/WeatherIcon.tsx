
import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const WeatherIcon = ({ condition, size = 'medium', className = '' }: WeatherIconProps) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8', 
    large: 'h-16 w-16'
  };

  const iconClass = `${sizeClasses[size]} ${className}`;

  switch (condition) {
    case 'sunny':
    case 'clear':
      return <Sun className={iconClass} />;
    case 'partly-cloudy':
    case 'cloudy':
      return <Cloud className={iconClass} />;
    case 'rainy':
    case 'rain':
      return <CloudRain className={iconClass} />;
    case 'drizzle':
      return <CloudDrizzle className={iconClass} />;
    case 'snow':
    case 'snowy':
      return <CloudSnow className={iconClass} />;
    case 'thunderstorm':
    case 'storm':
      return <Zap className={iconClass} />;
    default:
      return <Sun className={iconClass} />;
  }
};

export default WeatherIcon;
