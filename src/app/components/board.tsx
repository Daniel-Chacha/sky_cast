'use client'
import React from "react"
import { BoardData } from "./types"
import {getWeatherIcon} from "./getWeatherIcon"

//defining props types for the component
interface WeatherBoardProps{
    data: BoardData
}


export const  Board: React.FC<WeatherBoardProps> = ({data}) =>{
    return(
        <div className="bg-[#022D36] opacity-0">
            <div>
                <p>{data.townName}</p>
                <p>{data.time}</p>
                <p>{data.townTemp}</p>
                <p>{data.rain}</p>
                <p>{data.surfacePressure}</p>
                <p>{data.relativeHumidity}</p>
                <p>{data.cloudCover}</p>
                <p>{data.windSpeed}</p>
            </div>

            <div>
                {getWeatherIcon({rain :data.rain, cloudCover:data.cloudCover})}
            </div>
        </div>
    )
}