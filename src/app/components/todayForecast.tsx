'use client'
export default function TodayForecast({todays_forecast}:{todays_forecast:string[]}){
    return(
        <div>
            <h3>TODAY&apos;S FORECAST</h3>
            <div>
                {todays_forecast.map((info:string, index:number) =>(
                    <div key={index}>
                        <p>6:00 AM</p>
                        <svg></svg>
                        <p>{}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}