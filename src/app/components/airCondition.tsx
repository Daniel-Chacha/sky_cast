
'use client '
import React from "react"
import { ThermometerIcon, DropletIcon, WindIcon, UvIndexIcon, PressureIcon,VisibilityIcon } from "./icons"
import { Air_condition } from "./types"
import { Carousel } from "@material-tailwind/react"

interface AirConditionBoardProps{
    data:Air_condition
}

export const  AirCondition: React.FC<AirConditionBoardProps> =({data})=> {
    return(
        // <div className="bg-[#919191] bg-opacity-[31%] mt-3">
            <Carousel className=" mt-3 rounded-xl h-auto" >
                {data.time.map((datum, index) =>(
                    <div key={index} className="h-full w-full bg-[#919191] bg-opacity-[31%]">
                        <h3 className="text-center opacity-75">AIR CONDITION FORECAST at <span className="font-semibold underline decoration-2 underline-offset-2">{new Date(datum).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).replace(/^0/, "")}</span> </h3>
                        <div className="flex flex-col justify-around">
                            
                            <div className="justify-around flex flex-row mt-3">
                                <div className="relative">
                                    <ThermometerIcon />
                                    <span className="text-sm opacity-[80%]">Temp.</span>
                                    <p className="text-right font-bold">{Math.floor(data.temperature2m[index])}°C</p>
                                </div>
        
                                <div className="relative">
                                    <WindIcon />
                                    <span className="text-sm opacity-[80%]">Wind</span>
                                    <p className="text-right font-bold">{Math.floor(data.windSpeed10m[index])} Km/hr</p>
                                </div>
        
                                <div className="relative">
                                    <VisibilityIcon />
                                    <span className="text-sm opacity-[80%]">Visibility</span>
                                    <p className="text-right font-bold">{data.visibility[index]} m</p>
                                </div>
                            </div>
        
                            <div className="flex flex-row    justify-around mt-5 mb-10">
                                <div className="relative">
                                    <DropletIcon /> 
                                    <span className="text-sm opacity-[80%]">Precipitation Prob. </span>
                                    <p className="text-right font-bold"> {data.precipitationProbability[index]} %</p>
                                </div>
        
                                <div className="relative">
                                    <UvIndexIcon />
                                    <span className="text-sm opacity-[80%]">UV Index</span>
                                    <p className="text-right font-bold">{data.uvIndex[index]}</p>
                                </div>
        
                                <div className="relative">
                                    <PressureIcon />
                                    <span className="text-sm opacity-[80%]">Atm. Pressure</span>
                                    <p className="text-right font-bold">{Math.floor(data.surfacePressure[index])} Pa.</p>
                                </div>
                            </div>
        
                        </div>
                    </div>
                ))}
            </Carousel>



        // </div>
    )
}