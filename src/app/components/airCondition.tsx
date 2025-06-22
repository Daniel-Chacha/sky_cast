
'use client'
import React, { useEffect, useRef } from "react"
import { ThermometerIcon, DropletIcon, WindIcon, UvIndexIcon, PressureIcon, VisibilityIcon } from "./icons"
import { Air_condition } from "./types"

interface AirConditionBoardProps {
    data: Air_condition
}

export const AirCondition: React.FC<AirConditionBoardProps> = ({ data }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollContainerRef.current) {
            const currentTime = new Date()
            const targetIndex = data.time.findIndex(
                (datum) => new Date(datum) >= currentTime
            )
            const scrollIndex = targetIndex === -1 ? 0 : targetIndex
            const container = scrollContainerRef.current
            const childWidth = container.scrollWidth / data.time.length
            container.scrollTo({
                left: childWidth * scrollIndex,
                behavior: 'smooth'
            })
        }
    }, [data.time])

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const childWidth = container.scrollWidth / data.time.length
            container.scrollBy({
                left: -childWidth,
                behavior: 'smooth'
            })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current
            const childWidth = container.scrollWidth / data.time.length
            container.scrollBy({
                left: childWidth,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="mt-3 rounded-xl ">
            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute text-white font-bold text-[30px] h-10 w-10 bg-slate-400 bg-opacity-50 left-0 top-1/2 -translate-y-1/2 z-10  rounded-full  transition-opacity"
                >
                    &lt;
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar "

                >
                    {data.time.map((datum, index) => (
                        <div
                            key={index}
                            className="h-full min-w-[100%] snap-start bg-[#919191] bg-opacity-[31%] p-4 rounded-lg"
                        >
                            <h3 className="text-center opacity-75">
                                AIR CONDITION FORECAST at{" "}
                                <span className="font-semibold underline decoration-2 underline-offset-2">
                                    {new Date(datum).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    }).replace(/^0/, "")}
                                </span>
                            </h3>
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

                                <div className="mt-10 flex flex-row flex-wrap justify-around lg:mt-5 mb-10">
                                    <div className="relative">
                                        <DropletIcon />
                                        <span className="text-sm opacity-[80%]">Precipitation Prob.</span>
                                        <p className="text-right font-bold">{data.precipitationProbability[index]} %</p>
                                    </div>

                                    <div className="relative">
                                        <UvIndexIcon />
                                        <span className="text-sm opacity-[80%]">UV Index</span>
                                        <p className="text-right font-bold">{Math.floor(data.uvIndex[index])}</p>
                                    </div>

                                    <div className="relative max-sm:mt-3">
                                        <PressureIcon />
                                        <span className="text-sm opacity-[80%]">Atm. Pressure</span>
                                        <p className="text-right font-bold">{Math.floor(data.surfacePressure[index])} Pa.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={scrollRight}
                    className="absolute text-center font-bold text-[30px] text-white right-0 top-1/2 -translate-y-1/2 z-10   rounded-full h-10 w-10 bg-slate-400 bg-opacity-50 transition-opacity"
                >
                    &gt;
                </button>
            </div>
        </div>
    )
}