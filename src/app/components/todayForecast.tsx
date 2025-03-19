'use client'
import React from "react"
import { Todays_forecast } from "./types"
import { getWeatherIcon } from "./getWeatherIcon"

interface ForecastBoardProp {
    data: Todays_forecast
}


export const TodayForecast: React.FC<ForecastBoardProp> = ({ data }) => {
    const iconSize = 36
    console.log('DATA.TIME', data.time.toLocaleString())
    return (
        <div className="bg-[#919191] bg-opacity-[31%] rounded-lg">
            <h3 className="text-center py-2 opacity-75"> TODAY&apos;S FORECAST, {data.time.toLocaleString().split(',')[0].trim().split(' ')[0]}</h3>
            <div className="flex flex-row justify-evenly">
                {data.time.map((datum, index) => (
                    <div key={index} className="border-r border-gray-400 pr-5 ml-2 lg:pr-10 last:border-r-0 ">
                        <p className="text-sm mb-2"> {new Date(datum).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).replace(/^0/, "")}</p>
                        {getWeatherIcon({ rain: data.rain[index], cloudCover: data.cloudCover[index] }, iconSize)}
                        <p className="mt-2 font-bold">{Math.floor(data.temperature2m[index])}°C</p>
                    </div>
                ))}
            </div>
        </div>
    )
}