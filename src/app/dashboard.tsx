'use client'
import Menu from "./components/menu"
import TodayForecast from "./components/todayForecast"
import AirCondition from "./components/airCondition"
import WeekForecast from "./components/weekForecast"
import Board from "./components/board"

export default function Dashboard(){
    return(
        <main>
            <header>
                <search>
                    Search city...
                </search>
                <p>SKYCAST</p>
            </header>

            <div>
                <Menu />

                <div>
                    <Board />
                    <TodayForecast todays_forecast={}/>
                    <AirCondition />
                    <WeekForecast week_data={}/>
                </div>
            </div>
        </main>
    )
}