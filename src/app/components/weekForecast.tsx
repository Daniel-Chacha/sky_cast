// 'use client'
// import { displayWeatherIcon } from "./getWeatherIcon"
// import { Weekly_forecast } from "./types"

// interface weeklyForecastBoardProps{
//     data:Weekly_forecast
// }

// export const  WeekForecast: React.FC<weeklyForecastBoardProps> =({data}) =>{
//     return(
//         <div className="bg-[#919191]">
//             {data.time.map((time, index) =>(   
//                 const {label, icon} = {displayWeatherIcon(data.weatherCode[index])} 
                
//                 return(
//                     <div key={index}>
//                         <p>{time}</p>
//                         {icon}
//                         <p>{label}</p>
//                         <p>{data.temperature2mMax[index]}°C</p>
//                     </div>
//                 )

//             ))}
//         </div>
//     )
// }

'use client'
import React from "react";
import { displayWeatherIcon } from "./getWeatherIcon";
import { Weekly_forecast } from "./types";

interface WeeklyForecastBoardProps {
    data: Weekly_forecast;
}

export const WeekForecast: React.FC<WeeklyForecastBoardProps> = ({ data }) => {
    // console.log('DAYS', data.time.toLocaleString())

    const DAYS =data.time.toLocaleString()

    //extract unique dates
    const dates =[...new Set(DAYS.match(/\d{1,2}\/\d{1,2}\/\d{4}/g))]

    // convert dates to week days
    const weekdays =dates.map(date => new Date(date).toLocaleDateString('en-US',{weekday: "short"}))

    // weekdays[0]= "Today"    //replace the first day with today
    // console.log("Weekdays", weekdays)
    return (
        <div className="bg-[#919191] bg-opacity-[31%] p-4 h-[82vh] rounded-xl flex flex-col justify-evenly">
            <h3 className="text-center mt-0 pt-0 opacity-75">7-DAY FORECAST</h3>
            {weekdays.map((weekday, index) => {
                const { label, icon } = displayWeatherIcon(data.weatherCode[index]);

                return (
                    <div key={index} className="flex  justify-evenly relative " >
                        <span className=" mr-5 font-semibold">{weekday}</span>  {/* Time */}
                        <div className="inline-block"> {icon}  </div> {/* Weather Icon */}
                        <span className="mx-4 w-32 font-extralight">{label}</span>  {/* Weather Condition Name */}
                        <p className="text-right font-bold">{Math.floor(data.apparentTemperatureMax[index])}°C</p>  {/* Temperature */}
                    </div>
                );
            })}
        </div>
    );
};
