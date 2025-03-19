'use client'
import React, { useState, useEffect } from "react"
import Menu from "./menu"
import { TodayForecast } from "./todayForecast"
import { AirCondition } from "./airCondition"
import { WeekForecast } from "./weekForecast"
import { Board } from "./board"
import fetchWeatherData from "../api/weatherapi"
import { BoardData, Todays_forecast, Air_condition, Weekly_forecast } from "./types"
import { LoadingIcon } from "./icons"

export default function Dashboard() {
    const initialState = {
        current: {
            time: null as Date | null, // Allow Date type
            temperature2m: null as number | null,
            relativeHumidity2m: null as number | null,
            rain: null as number | null,
            cloudCover: null as number | null,
            surfacePressure: null as number | null,
            windSpeed10m: null as number | null,
        },

        hourly: {
            time: [] as Date[],
            temperature2m: [] as number[],
            // relativeHumidity2m: [],
            precipitationProbability: [] as number[],
            rain: [] as number[],
            // snowfall: [],
            surfacePressure: [] as number[],
            cloudCover: [] as number[],
            visibility: [] as number[],
            windSpeed10m: [] as number[],
            // soilTemperature0cm: [],
            uvIndex: [] as number[],
            // sunshineDuration:[],
        },

        daily: {
            time: [] as Date[],
            weatherCode: [] as number[],
            apparentTemperatureMax: [] as number[],
            // temperature2mMin:[],
            // sunShineDuration:[],
            // uvIndexMax:[],
            // rainSum: [],
            // precipitationProbabilityMax:[],
            // windSpeed10mMax:[],
            // windDirection10mDorminant:[],
        }
    }

    type locationData = {
        city: string;
        country: string;
        latitude: number;
        longitude: number
    }

    const [location, setLocation] = useState<locationData | null>(null)
    const [weatherData, setWeatherData] = useState(initialState)
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [town, setTown] = useState<string | null>(null)


    //take input change in real time
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    //get user location upon loading
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch("/api/location")
                const data: locationData = await response.json();
                setLocation(data)
                setLatitude(data.latitude)
                setLongitude(data.longitude)
                setTown(data.city)
                // console.log('DATA', data)

            } catch (error) {
                console.error('Error fetching location', error)

            } finally {
                setLoading(false)
            }
        }
        fetchLocation()
    }, []);

    //fetch suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length > 3) { //Only fetch when input is at least 1 characters
                try {  // Limit to 5 suggestions
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&limit=3`)

                    const data = await response.json();
                    setSuggestions(data)
                    // setTown(searchTerm)
                    // console.log("NOMINATIM DATA", data)
                } catch (error) {
                    console.error("Error fetching suggestions", error)
                    setSuggestions([])   //clear suggestions on error
                }
            } else {
                setSuggestions([]) //clear suggestions if input is too short
            }
        }

        const debounce = setTimeout(fetchSuggestions, 10)          //debounce to prevent excessive requests

        return () => clearTimeout(debounce)         //clear timeout on input change
    }, [searchTerm])

    //fetch the latitude and longitude incase the user decides to press enter on their input instead of picking a suggestion
    const fetchLatLon = async (place: string) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${place}&format=json&limit=1`)

            const data: Suggestion[] = await response.json()

            if (data.length > 0) {
                const lanLonDetails = data[0]
                setLatitude(parseFloat(lanLonDetails.lat))
                setLongitude(parseFloat(lanLonDetails.lon))
                setTown(place)
                // setLocation(null)
            } else {
                console.error('No results found for ', place)
            }
        } catch (error) {
            console.error("Error fetching location", error)
        }
    }

    // Define a type for the suggestion object
    interface Suggestion {
        display_name: string;
        lat: string;
        lon: string;
    }

    // Set the latitude and longitude when a suggestion is clicked
    const handleSuggestionClick = (suggestion: Suggestion) => {
        setLatitude(parseFloat(suggestion.lat)); // Convert to number
        setLongitude(parseFloat(suggestion.lon)); // Convert to number
        setTown(suggestion.display_name.split(",")[0].trim());
        setSuggestions([]);
    };


    //Fetch weather data from NOMINATIM
    useEffect(() => {
        async function fetchData() {
            if (latitude && longitude) {
                try {
                    const req = [latitude, longitude]
                    const data = await fetchWeatherData({ req })
                    setWeatherData(data)
                    // console.log('WeatherData State', weatherData)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }

            }
        }
        fetchData()
        setSuggestions([])
    }, [latitude, longitude])

    //the handlekeydown function
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()

            if (searchTerm.trim().length > 3) {
                fetchLatLon(searchTerm)
            }
        }
        setSuggestions([]);
    }

    const boardData: BoardData = {
        townName: town || "Unknown",
        time: weatherData.current.time ? String(weatherData.current.time) : "N/A",
        townTemp: weatherData.current.temperature2m ?? 0,
        rain: weatherData.current.rain ?? 0,
        surfacePressure: weatherData.current.surfacePressure ?? 0,
        relativeHumidity: weatherData.current.relativeHumidity2m ?? 0,
        windSpeed: weatherData.current.windSpeed10m ?? 0,
        cloudCover: weatherData.current.cloudCover ?? 0
    }

    const todaysForecastData: Todays_forecast = {
        time: weatherData.hourly.time,
        temperature2m: weatherData.hourly.temperature2m,
        // relativeHumidity2m: weatherData.hourly.relativeHumidity2m,        
        rain: weatherData.hourly.rain,
        // snowfall: weatherData.hourly.snowfall,        
        cloudCover: weatherData.hourly.cloudCover,
        // soilTemperature0cm: weatherData.hourly.soilTemperature0cm,        
        // sunshineDuration: weatherData.hourly.sunshineDuration
    }

    const airConditionData: Air_condition = {
        time: weatherData.hourly.time,
        temperature2m: weatherData.hourly.temperature2m,
        precipitationProbability: weatherData.hourly.precipitationProbability,
        surfacePressure: weatherData.hourly.surfacePressure,
        visibility: weatherData.hourly.visibility,
        windSpeed10m: weatherData.hourly.windSpeed10m,
        uvIndex: weatherData.hourly.uvIndex,
    }

    const weeklyForecast: Weekly_forecast = {
        time: weatherData.daily.time,
        weatherCode: weatherData.daily.weatherCode,
        apparentTemperatureMax: weatherData.daily.apparentTemperatureMax,
        // temperature2mMin:  weatherData.daily.temperature2mMin,
        // sunshineDuration:  weatherData.daily.sunShineDuration,
        // uvIndexMax: weatherData.daily.uvIndexMax,
        // rainSum:  weatherData.daily.rainSum,
        // precipitationProbabilityMax:  weatherData.daily.precipitationProbabilityMax,
        // windSpeed10mMax:  weatherData.daily.windSpeed10mMax,
        // windDirection10mDominant:  weatherData.daily.windDirection10mDorminant
    }

    return (
        <main>
            {loading ? (
                <div className="flex flex-col justify-center items-center h-[100vh] ">
                    <LoadingIcon /> 
                    <p className="text-2xl font-semibold mt-3">Loading...</p>
                </div>
            ) : location ? (
                <div className="  h-[100vh] w-[100vw] relative " >

                    <header className="  lg:p-5 items-center relative w-[100vw] ">
                        <div className="block lg:hidden mb-5 "><Menu /></div>
                        <div className="flex flex-row justify-center items-center">
                            <input type="text" placeholder=" Search ..." onKeyDown={handleKeyDown} value={searchTerm} onChange={handleInputChange}
                                className="bg-[#919191] bg-opacity-[31%] rounded-md sm:w-[50vw] lg:w-[30vw] h-9  sm:pl-5 ">
                            </input>
                        </div>

                        {suggestions.length > 0 && (
                            <ul className="border border-gray-300 rounded bg-black text-white  z-30 absolute  sm:w-[30vw]  top-full left-[40%]">
                                {suggestions.map((suggestion, index) => (
                                    <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="px-3 py-2 hover:bg-gray-300 hover:bg-opacity-[40%] hover:font-semibold cursor-pointer overflow-hidden h-9">{suggestion.display_name}</li>
                                ))}
                            </ul>
                        )}
                    </header>

                    <div className="lg:flex lg:w-[100vw] lg:mx-0 relative w-[94.5vw] mx-2 sm:ml-5 lg:ml-0">
                        <div className="hidden lg:block"><Menu /></div>



                        <div className="w-[94.5vw]  flex flex-col justify-center lg:w-[64vw] lg:mx-8">
                            <Board data={boardData} />
                            <TodayForecast data={todaysForecastData} />
                            <AirCondition data={airConditionData} />
                        </div>
                        <WeekForecast data={weeklyForecast} />
                    </div>
                </div>
            ) : (
                <p className="text-center font-bold mt-10">A Problem Occurred Please Refresh The Page</p>
            )}
        </main>
    )
}