
'use client'

import { fetchWeatherApi } from "openmeteo";

export default async function fetchWeatherData({req}:{req:number[]}){

    const params = {
        "latitude": req[0],
        "longitude": req[1],
        "current": ["temperature_2m", "relative_humidity_2m", "rain", "cloud_cover", "surface_pressure", "wind_speed_10m"],
        "hourly": ["temperature_2m", "relative_humidity_2m", "precipitation_probability", "rain", "snowfall", "surface_pressure", "cloud_cover", "visibility", "wind_speed_10m", "soil_temperature_0cm", "uv_index", "sunshine_duration"],
        "daily": ["weather_code", "apparent_temperature_max"],
        "timezone": "auto",
        "temporal_resolution": "hourly_3",
        "models": "best_match"
    };
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    
    // Helper function to form time ranges
    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    
    // Process first location. Add a for-loop for multiple locations or weather models
    const response = responses[0];
    
    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();
    
    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;
    
    // Note: The order of weather variables in the URL query and the indices below need to match!
    // const weatherData = {
    
    //     current: {
    //         time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    //         temperature2m: current.variables(0)!.value(),
    //         relativeHumidity2m: current.variables(1)!.value(),
    //         rain: current.variables(2)!.value(),
    //         cloudCover: current.variables(3)!.value(),
    //         surfacePressure: current.variables(4)!.value(),
    //         windSpeed10m: current.variables(5)!.value(),
    //     },
    //     hourly: {
    //         time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
    //             (t) => new Date((t + utcOffsetSeconds) * 1000)
    //         ),
    //         temperature2m: hourly.variables(0)!.valuesArray()!,
    //         // relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
    //         precipitationProbability: hourly.variables(2)!.valuesArray()!,
    //         rain: hourly.variables(3)!.valuesArray()!,
    //         // snowfall: hourly.variables(4)!.valuesArray()!,
    //         surfacePressure: hourly.variables(5)!.valuesArray()!,
    //         cloudCover: hourly.variables(6)!.valuesArray()!,
    //         visibility: hourly.variables(7)!.valuesArray()!,
    //         windSpeed10m: hourly.variables(8)!.valuesArray()!,
    //         // soilTemperature0cm: hourly.variables(9)!.valuesArray()!,
    //         uvIndex: hourly.variables(10)!.valuesArray()!,
    //         // sunshineDuration: hourly.variables(11)!.valuesArray()!,
    //     },
    
    //     daily: {
    //         time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
    //             (t) => new Date((t + utcOffsetSeconds) * 1000)
    //         ),
    //         weatherCode: daily.variables(0)!.valuesArray()!,
    //         apparentTemperatureMax: daily.variables(1)!.valuesArray()!,
    //     },
    
    // };
    const weatherData = {
        current: {
            time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
            temperature2m: current.variables(0)!.value(),
            relativeHumidity2m: current.variables(1)!.value(),
            rain: current.variables(2)!.value(),
            cloudCover: current.variables(3)!.value(),
            surfacePressure: current.variables(4)!.value(),
            windSpeed10m: current.variables(5)!.value(),
        },
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ).slice(1, 7),
            temperature2m: [...hourly.variables(0)!.valuesArray()!].slice(1, 7),  // ✅ Convert Float32Array to number[]
            precipitationProbability: [...hourly.variables(2)!.valuesArray()!].slice(1, 7),  // ✅ Fix here
            rain: [...hourly.variables(3)!.valuesArray()!].slice(1, 7),
            surfacePressure: [...hourly.variables(5)!.valuesArray()!].slice(1, 7),
            cloudCover: [...hourly.variables(6)!.valuesArray()!].slice(1, 7),
            visibility: [...hourly.variables(7)!.valuesArray()!].slice(1, 7),
            windSpeed10m: [...hourly.variables(8)!.valuesArray()!].slice(1, 7),
            uvIndex: [...hourly.variables(10)!.valuesArray()!].slice(1,7),  // ✅ Fix here
        },
        daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            weatherCode: [...daily.variables(0)!.valuesArray()!],  // ✅ Fix here
            apparentTemperatureMax: [...daily.variables(1)!.valuesArray()!],
        },
    };
    
    console.log('CURRENT DATA', weatherData.current)
    console.log('HOURLY DATA', weatherData.hourly)
    console.log('DAILY DATA', weatherData.daily)
    
    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    // for (let i = 0; i < weatherData.hourly.time.length; i++) {
    //     console.log("HOURLY DATA",
    //         weatherData.hourly.time[i].toISOString(),
    //         weatherData.hourly.temperature2m[i],
    //         // weatherData.hourly.relativeHumidity2m[i],
    //         weatherData.hourly.precipitationProbability[i],
    //         weatherData.hourly.rain[i],
    //         // weatherData.hourly.snowfall[i],
    //         weatherData.hourly.surfacePressure[i],
    //         weatherData.hourly.cloudCover[i],
    //         weatherData.hourly.visibility[i],
    //         weatherData.hourly.windSpeed10m[i],
    //         // weatherData.hourly.soilTemperature0cm[i],
    //         weatherData.hourly.uvIndex[i],
    //         // weatherData.hourly.sunshineDuration[i]
    //     );
    // }
    // for (let i = 0; i < weatherData.daily.time.length; i++) {
    //     console.log("DAILY DATA",
    //         weatherData.daily.time[i].toISOString(),
    //         weatherData.daily.weatherCode[i],
    //         weatherData.daily.apparentTemperatureMax[i],
    //     );
    // }

    return weatherData;
}