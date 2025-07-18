const API_KEY = "YOUR_OPENWEATHER_API_KEY";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherByCity = async (city: string) => {
    const res = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("City not found");
    return res.json();
};

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
    const res = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("Failed to fetch weather for location");
    return res.json();
};

export const fetchForecastByCity = async (city: string) => {
    const res = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("Forecast not found");
    return res.json();
};

export const fetchForecastByCoords = async (lat: number, lon: number) => {
    const res = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    if (!res.ok) throw new Error("Forecast not found");
    return res.json();
};
