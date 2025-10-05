const apiKey = process.env.VUE_APP_OPENWEATHER_API_KEY;

export async function getLocations(cityName: string) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`);
    if (!response.ok) throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    return response.json();
}

export async function getIp() {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) throw new Error(`IP API error:: ${response.status}`);
    return response.json();
}

export async function getGeoByIp(ip: string) {
    const response = await fetch(`https://ipwho.is/${ip}`);
    if (!response.ok) throw new Error(`Geo API error:: ${response.status}`);
    return response.json();
}

export async function getCurrentWeather(city: string, countryCode: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}${countryCode ? ',' + countryCode : ''}&appid=${apiKey}&lang=ru&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
    return response.json();
}

export async function getForecastWeather(city: string, countryCode: string) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}&lang=ru&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Weather Forecast error: ${response.status}`);
    return response.json();
}