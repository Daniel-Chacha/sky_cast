

export default function AirCondition(){
    return(
        <div>
            <h3>AIR CONDITION</h3>
            <div>
                
                <div className="justify-around">
                    <div className="relative">
                        <svg></svg>
                        <p>Temp.</p>
                        <p></p>
                    </div>

                    <div className="relative">
                        <svg></svg>
                        <p>Wind</p>
                        <p></p>
                    </div>
                </div>

                <div className="justify-around">
                    <div className="relative">
                        <svg></svg>
                        <p>Cloud Cover</p>
                        <p></p>
                    </div>

                    <div className="relative">
                        <svg></svg>
                        <p>UV Index</p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    )
}