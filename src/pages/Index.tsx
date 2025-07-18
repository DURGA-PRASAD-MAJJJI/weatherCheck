
import { useState, useEffect } from 'react';
import { WeatherProvider } from '@/contexts/WeatherContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import WeatherDashboard from '@/components/WeatherDashboard';
import WeatherBackground from '@/components/WeatherBackground';

const Index = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <div className="min-h-screen transition-all duration-500">
          <WeatherBackground />
          <WeatherDashboard />
        </div>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default Index;
