const apiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;

export async function getCurrentWeather(city: string, countryCode: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}${countryCode ? ',' + countryCode : ''}&appid=${apiKey}&lang=ru&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
    return response.json();
}
