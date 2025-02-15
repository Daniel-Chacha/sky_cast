
'use client '
import React from "react"
import { ThermometerIcon, DropletIcon, WindIcon, UvIndexIcon, PressureIcon,VisibilityIcon } from "./icons"
import { Air_condition } from "./types"

interface AirConditionBoardProps{
    data:Air_condition
}

export const  AirCondition: React.FC<AirConditionBoardProps> =({data})=> {
    return(
        <div className="bg-[#919191] bg-opacity-[31%] mt-3">
            {data.time.map((datum, index) =>(
                        <div key={index}>
                            <h3>AIR CONDITION at {new Date(datum).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).replace(/^0/, "")}</h3>
                            <div>
                                
                                <div className="justify-around">
                                    <div className="relative">
                                        <ThermometerIcon />
                                        <span>Temp.</span>
                                        <p>{Math.floor(data.temperature2m[index])}°C</p>
                                    </div>
            
                                    <div className="relative">
                                        <WindIcon />
                                        <span>Wind</span>
                                        <p>{Math.floor(data.windSpeed10m[index])}</p>
                                    </div>
            
                                    <div className="relative">
                                        <VisibilityIcon />
                                        <span>Visibility</span>
                                        <p>{data.visibility[index]}m</p>
                                    </div>
                                </div>
            
                                <div className="justify-around">
                                    <div className="relative">
                                        <DropletIcon /> 
                                        <span>Precipitation Prob. </span>
                                        <p>{data.precipitationProbability[index]}</p>
                                    </div>
            
                                    <div className="relative">
                                        <UvIndexIcon />
                                        <span>UV Index</span>
                                        <p>{data.uvIndex[index]}</p>
                                    </div>
            
                                    <div className="relative">
                                        <PressureIcon />
                                        <span>Amt. Pressure</span>
                                        <p>{Math.floor(data.surfacePressure[index])} Pa.</p>
                                    </div>
                                </div>
            
                            </div>
                        </div>
            ))}


        </div>
    )
}