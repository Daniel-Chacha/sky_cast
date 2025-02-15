'use client'
import { useState, useEffect } from "react"
import Menu from "./menu"
import {TodayForecast} from "./todayForecast"
import {AirCondition} from "./airCondition"
import {WeekForecast} from "./weekForecast"
import {Board }from "./board"
import fetchWeatherData from "../api/weatherapi"
import { BoardData,Todays_forecast,Air_condition, Weekly_forecast } from "./types"

export default function Dashboard(){
    const initialState ={
        current: {
            time: null as Date | null, // Allow Date type
            temperature2m: null as number | null,
            relativeHumidity2m: null as number | null,
            rain: null as number | null,
            cloudCover: null as number | null,
            surfacePressure: null as number | null,
            windSpeed10m: null as number | null,
        },
        
        hourly:{
            time: [] as Date[],
            temperature2m: [] as number[],
            // relativeHumidity2m: [],
            precipitationProbability: [] as number[],
            rain: [] as number[],
            // snowfall: [],
            surfacePressure: [] as number[],
            cloudCover :[] as number[],
            visibility:  [] as number[],
            windSpeed10m: [] as number[],
            // soilTemperature0cm: [],
            uvIndex :[] as number[],
            // sunshineDuration:[],
        },

        daily:{
            time:[] as Date[],
            weatherCode:[]as number[],
            apparentTemperatureMax:[] as number[],
            // temperature2mMin:[],
            // sunShineDuration:[],
            // uvIndexMax:[],
            // rainSum: [],
            // precipitationProbabilityMax:[],
            // windSpeed10mMax:[],
            // windDirection10mDorminant:[],
        }
    }

    const [weatherData, setWeatherData] = useState(initialState)
    const [latitude, setLatitude] =useState<number | null>(-1.2864)
    const [longitude, setLongitude] =useState<number | null>(36.8172)
    const [town, setTown] =useState<string | null>("NAIROBI")

    useEffect(() =>{
        async function fetchData(){
            if(latitude && longitude){
                try{
                    const req =[latitude, longitude]
                    const data =await fetchWeatherData({req})
                    setWeatherData(data)
                    console.log('WeatherData State', weatherData)
                }catch(error){
                    console.error('Error fetching data:', error);
                }

            }
        }
        fetchData()
    },[latitude,longitude])

    const boardData:BoardData={
        townName: town || "Unknown",
        time: weatherData.current.time ? String(weatherData.current.time) : "N/A",
        townTemp :weatherData.current.temperature2m ?? 0,
        rain: weatherData.current.rain ?? 0,
        surfacePressure: weatherData.current.surfacePressure ?? 0,
        relativeHumidity:weatherData.current.relativeHumidity2m ?? 0,
        windSpeed: weatherData.current.windSpeed10m ?? 0,
        cloudCover: weatherData.current.cloudCover ?? 0
    }

    const todaysForecastData:Todays_forecast={
        time: weatherData.hourly.time,
        temperature2m: weatherData.hourly.temperature2m,
        // relativeHumidity2m: weatherData.hourly.relativeHumidity2m,        
        rain: weatherData.hourly.rain,
        // snowfall: weatherData.hourly.snowfall,        
        cloudCover: weatherData.hourly.cloudCover,
        // soilTemperature0cm: weatherData.hourly.soilTemperature0cm,        
        // sunshineDuration: weatherData.hourly.sunshineDuration
    }

    const airConditionData:Air_condition ={
        time: weatherData.hourly.time,
        temperature2m: weatherData.hourly.temperature2m,
        precipitationProbability: weatherData.hourly.precipitationProbability,
        surfacePressure: weatherData.hourly.surfacePressure,
        visibility: weatherData.hourly.visibility,
        windSpeed10m: weatherData.hourly.windSpeed10m,
        uvIndex: weatherData.hourly.uvIndex,
    }

    const weeklyForecast:Weekly_forecast={
        time: weatherData.daily.time,
        weatherCode: weatherData.daily.weatherCode,
        apparentTemperatureMax:  weatherData.daily.apparentTemperatureMax,
        // temperature2mMin:  weatherData.daily.temperature2mMin,
        // sunshineDuration:  weatherData.daily.sunShineDuration,
        // uvIndexMax: weatherData.daily.uvIndexMax,
        // rainSum:  weatherData.daily.rainSum,
        // precipitationProbabilityMax:  weatherData.daily.precipitationProbabilityMax,
        // windSpeed10mMax:  weatherData.daily.windSpeed10mMax,
        // windDirection10mDominant:  weatherData.daily.windDirection10mDorminant
    } 

    return(
        <main className="bg-[#022D36]  h-[100vh] w-[100vw]">
            <header className="flex flex-row items-center justify-center">
                <input type="text" placeholder=" Search city..." className="bg-[#919191] ">             
                </input>
                <p>SKYCAST</p>
            </header>

            <div className="flex ">
                <Menu />

                <div className="w-[50vw] mx-8">
                    <Board data={boardData}/>
                    <TodayForecast data={todaysForecastData}/>
                    <AirCondition data={airConditionData}/>                    
                </div>
                <WeekForecast data={weeklyForecast}/>
            </div>
        </main>
    )
}