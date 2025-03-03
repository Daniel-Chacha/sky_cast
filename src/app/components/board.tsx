'use client'
import React, {useEffect, useState} from "react"
import { BoardData } from "./types"
import {getWeatherIcon} from "./getWeatherIcon"

//defining props types for the component
interface WeatherBoardProps{
    data: BoardData
}

export const  Board: React.FC<WeatherBoardProps> = ({data}) =>{
    const [time, setTime]  =useState(new Date)
    const iconSize = 110;

    useEffect(() =>{
        const interval =setInterval(() =>{
            setTime(new Date()) //get current browser date
        }, 1000)

        return () =>clearInterval(interval) //clean up interval on mount
    },[])
    return(
        <div className=" flex flex-row justify-around ">
            <div>
                <p className="text-5xl">{data.townName}</p>
                <p className=" font-semibold text-sm">{time.toLocaleTimeString("en-US", { 
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit", 
                hour12: true 
                })}</p>
                <p className="text-4xl mt-8">{Math.floor(data.townTemp)}°C</p>
                {/* <p>{data.rain}</p> */}
                {/* <p>{data.surfacePressure}</p> */}
                {/* <p>{data.relativeHumidity}</p> */}
                {/* <p>{data.cloudCover}</p> */}
                {/* <p>{data.windSpeed}</p> */}
            </div>

            <div className=" flex justify-center items-center">
            {/* <span className="h-24 w-24"> */}
                 {getWeatherIcon({rain :data.rain, cloudCover:data.cloudCover}, iconSize)}
                 {/* {console.log()} */}
            {/* </span> */}
                
            </div>
        </div>
    )
}