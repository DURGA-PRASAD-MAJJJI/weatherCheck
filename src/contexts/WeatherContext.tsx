import React, { createContext, useContext, useState, useEffect } from 'react';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  condition: string;
}

interface ForecastDay {
  date: string;
  high: number;
  low: number;
  description: string;
  icon: string;
}

interface HourlyData {
  time: string;
  temperature: number;
  icon: string;
}

interface WeatherContextType {
  currentWeather: WeatherData | null;
  forecast: ForecastDay[];
  hourlyForecast: HourlyData[];
  searchHistory: string[];
  isLoading: boolean;
  error: string | null;
  searchWeather: (city: string) => Promise<void>;
  getCurrentLocationWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyData[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('weatherSearchHistory') || '[]');
    setSearchHistory(history);
  }, []);

  const fetchWeatherByCity = async (city: string) => {
    const weatherRes = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!weatherRes.ok) throw new Error('City not found');
    const weather = await weatherRes.json();
    const forecastRes = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!forecastRes.ok) throw new Error('Forecast not found');
    const forecast = await forecastRes.json();
    return { weather, forecast };
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    const weatherRes = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!weatherRes.ok) throw new Error('Location fetch failed');
    const weather = await weatherRes.json();
    const forecastRes = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!forecastRes.ok) throw new Error('Forecast fetch failed');
    const forecast = await forecastRes.json();
    return { weather, forecast };
  };

  const parseWeatherData = (data: any): WeatherData => ({
    city: data.name,
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6),
    icon: data.weather[0].icon,
    condition: data.weather[0].main
  });

  const parseHourly = (list: any[]): HourlyData[] =>
    list.slice(0, 8).map(entry => ({
      time: new Date(entry.dt_txt).toLocaleTimeString([], { hour: 'numeric' }),
      temperature: Math.round(entry.main.temp),
      icon: entry.weather[0].icon
    }));

  const getDayLabel = (date: string) => {
    const today = new Date();
    const d = new Date(date);
    const diff = (d.getTime() - today.setHours(0, 0, 0, 0)) / 86400000;
    return diff === 0 ? 'Today' : diff === 1 ? 'Tomorrow' : d.toLocaleDateString(undefined, { weekday: 'short' });
  };

  const parseDaily = (list: any[]): ForecastDay[] => {
    const map = new Map<string, ForecastDay>();
    list.forEach(entry => {
      const date = entry.dt_txt.split(' ')[0];
      if (!map.has(date)) {
        map.set(date, {
          date: getDayLabel(date),
          high: Math.round(entry.main.temp_max),
          low: Math.round(entry.main.temp_min),
          description: entry.weather[0].description,
          icon: entry.weather[0].icon
        });
      }
    });
    return Array.from(map.values()).slice(0, 7);
  };

  const searchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { weather, forecast } = await fetchWeatherByCity(city);
      setCurrentWeather(parseWeatherData(weather));
      setHourlyForecast(parseHourly(forecast.list));
      setForecast(parseDaily(forecast.list));
      const newHistory = [city, ...searchHistory.filter(h => h !== city)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocationWeather = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!navigator.geolocation) throw new Error('Geolocation not supported');
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        try {
          const { weather, forecast } = await fetchWeatherByCoords(coords.latitude, coords.longitude);
          setCurrentWeather(parseWeatherData(weather));
          setHourlyForecast(parseHourly(forecast.list));
          setForecast(parseDaily(forecast.list));
        } catch (err: any) {
          setError(err.message || 'Location fetch failed');
        } finally {
          setIsLoading(false);
        }
      }, () => {
        setError('Unable to get your location');
        setIsLoading(false);
      });
    } catch (err) {
      setError('Geolocation failed');
      setIsLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{
      currentWeather,
      forecast,
      hourlyForecast,
      searchHistory,
      isLoading,
      error,
      searchWeather,
      getCurrentLocationWeather
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within WeatherProvider');
  return context;
};
