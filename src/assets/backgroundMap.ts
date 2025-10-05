import sunny from '@/assets/weather-backgrounds/sunny.jpg';
import clearNight from '@/assets/weather-backgrounds/clear-night.jpg';
import fewClouds from '@/assets/weather-backgrounds/few-clouds.jpg';
import fewCloudsNight from '@/assets/weather-backgrounds/few-clouds-night.jpg';
import cloudy from '@/assets/weather-backgrounds/cloudy.jpg';
import cloudyNight from '@/assets/weather-backgrounds/cloudy-night.jpg';
import brokenClouds from '@/assets/weather-backgrounds/broken-clouds.jpg';
import showerRain from '@/assets/weather-backgrounds/shower-rain.jpg';
import showerRainNight from '@/assets/weather-backgrounds/shower-rain-night.jpg';
import rain from '@/assets/weather-backgrounds/rain.jpg';
import rainNight from '@/assets/weather-backgrounds/rain-night.jpg';
import thunderstorm from '@/assets/weather-backgrounds/thunderstorm.jpg';
import thunderstormNight from '@/assets/weather-backgrounds/thunderstorm-night.jpg';
import snow from '@/assets/weather-backgrounds/snow.jpg';
import mist from '@/assets/weather-backgrounds/mist.jpg';
import defaultBg from '@/assets/weather-backgrounds/default.jpg';

const backgroundMap = {
    '01d': sunny,
    '01n': clearNight,
    '02d': fewClouds,
    '02n': fewCloudsNight,
    '03d': cloudy,
    '03n': cloudyNight,
    '04d': brokenClouds,
    '04n': brokenClouds,
    '09d': showerRain,
    '09n': showerRainNight,
    '10d': rain,
    '10n': rainNight,
    '11d': thunderstorm,
    '11n': thunderstormNight,
    '13d': snow,
    '13n': snow,
    '50d': mist,
    '50n': mist
};

export { backgroundMap, defaultBg };