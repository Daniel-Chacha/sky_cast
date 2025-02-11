'use client'

export default function WeekForecast({week_data}:{week_data:string[]}){
    return(
        <div>
            {week_data.map((data, index) =>(
                <div key={index}>
                    <p></p>
                    <svg></svg>
                    <p></p>
                    <p></p>
                </div>
            ))}
        </div>
    )
}