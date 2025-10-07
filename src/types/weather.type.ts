export interface Weather {
    cod: number
    name: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
    },
    weather: [
        {
            description: string,
            icon: string,
            id: number,
            main: string
        }
    ],
    sys:{
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    visibility: number,
    wind: {
        deg: number,
        speed: number,
    }
}