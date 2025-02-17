// import React from "react";
import { CloudIcon, SunCloudIcon, SunIcon, RainIcon, SunRainIcon } from "./icons";
import { IconProps, } from "./types"; 

export function getWeatherIcon({ rain, cloudCover}:IconProps ,measure: number ): React.ReactElement {
    if(rain > 5){
        return cloudCover > 50 ? <RainIcon measure={measure} /> : <SunRainIcon measure={measure} />

    }else if(cloudCover > 70){
        return <CloudIcon measure={measure} />

    }else if(cloudCover < 30){
        return <SunCloudIcon measure={measure} /> 

    }else{
        return <SunIcon measure={measure} />
    }
}

export function displayWeatherIcon(weather_code:number){
    if(weather_code === 0){
        return {label: "Sunny", icon: <SunIcon />}

    }else if(weather_code >= 1 && weather_code <= 3){
        return { label: "Partly Cloudy",icon: <SunCloudIcon />}

    }else if(weather_code ===45 || weather_code === 48){
        return {label: "Cloudy",icon: <CloudIcon />}

    }else if (weather_code >=51 && weather_code <= 67){
        return {label: "Rainy",icon: <SunRainIcon />}

    }else if(weather_code >= 80 && weather_code <= 99){
        return {label:"Rainy",icon:<RainIcon />}

    }else{
        return {label: "Cloudy",icon: <CloudIcon />}    //Default to cloudy if unknown code
    }
} 