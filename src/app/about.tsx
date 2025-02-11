'use client'
import Image from "next/image"

export default function About(){
    return(
        <main>
            <h1>SKYCAST</h1>
            <h2>TECHNOLOGIES USED</h2>
            <div>
                <div>
                    <Image src={'https:'} alt="Next JS Logo"/>
                    <p>Next JS</p>
                </div>

                <div>
                    <Image src={'https'} alt="Tailwind CSS Logo "/>
                    <p>Tailwind CSS</p>
                </div>
            </div>

            <h2>SOURCE FOR WEATHER DATA </h2>
            <div>
                <Image src={'https'} alt="OpenWeatherMap Logo"/>
                <p>OpenWeatherMap</p>
            </div>

            <h2>DEVELOPER</h2>
            <div>
                <Image src={'https'} alt="Daniel Chacha"/>
                <p>DANIEL CHACHA MWITA</p>

                <div>
                    <h3>PROFILES</h3>
                    <div>
                        <Image src={''} alt="Instagram"></Image>
                        <Image src={''} alt="X"></Image>
                        <Image src={''} alt="LinkedIn"></Image>
                        <Image src={''} alt="Github" ></Image>
                        <Image src={''} alt="Discord"></Image>
                    </div>
                </div>
            </div>

        </main>
    )
}