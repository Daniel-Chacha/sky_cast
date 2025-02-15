

export interface BoardData {
    townName: string;
    time: string;
    townTemp: number;
    rain: number;
    surfacePressure: number;
    relativeHumidity: number;
    windSpeed: number;
    cloudCover: number;
}

export interface Todays_forecast{
    time: Date[],     
    rain: number[],
    temperature2m: number[],
    cloudCover: number[],
    // snowfall: number[],       
    // soilTemperature0cm: number[],    
    // sunshineDuration: number[]
}

export interface Air_condition{
    time: Date[],
    temperature2m: number[],
    // relativeHumidity2m: number[],
    precipitationProbability: number[],
    surfacePressure: number[],
    windSpeed10m: number[],
    visibility: number[],
    uvIndex: number[],
}

export interface Weekly_forecast{
    time: Date[],
    weatherCode: number[],
    apparentTemperatureMax: number[],
    // temperature2mMin: number[],
    // sunshineDuration: number[],
    // uvIndexMax:number[],
    // rainSum: number[],
    // precipitationProbabilityMax: number[],
    // windSpeed10mMax: number[],
    // windDirection10mDominant: number[]
}

export interface IconProps{
    // temp: number;
    rain: number;
    cloudCover: number; // % (0-100) 
}

