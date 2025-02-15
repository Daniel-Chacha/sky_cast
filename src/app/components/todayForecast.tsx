'use client'
import React from "react"
import { Todays_forecast } from "./types"
import {getWeatherIcon} from "./getWeatherIcon"

interface ForecastBoardProp{
    data: Todays_forecast
}


export  const TodayForecast: React.FC<ForecastBoardProp> =({data}) =>{
    console.log('DATA.TIME',data.time.toLocaleString())
    return(
        <div className="bg-[#919191] bg-opacity-[31%]">
            <h3 className="text-center"> TODAY&apos;S FORECAST, {data.time.toLocaleString().split(',')[0].trim().split(' ')[0]}</h3>
            <div className="flex flex-row justify-evenly">
                {data.time.map((datum, index) =>(
                    <div key={index}>
                        <p> {new Date(datum).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).replace(/^0/, "")}</p>
                         {getWeatherIcon({rain: data.rain[index], cloudCover:data.cloudCover[index]})}
                        <p>{Math.floor(data.temperature2m[index])}°C</p>
                    </div>
                ))}
            </div>
        </div>
    )
}