'use client'
import Image from "next/image"


export const About = () => {
    return (
        <main className="mt-14 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:items-center h-[100vh]">
            {/* <h1>SKYCAST</h1> */}
            <h2 className="font-semibold text-center">TECHNOLOGIES USED</h2>
            <div className="flex flex-row justify-around w-full">
                <div>
                    <Image src={'/logos/NEXT.png'} width={200} height={250} alt="Next JS Logo" className="rounded-xl" />
                    {/* <p>Next JS</p> */}
                </div>

                <div>
                    <Image src={'/logos/tailwind.png'} width={100} height={180} alt="Tailwind CSS Logo " />
                    <p>Tailwind CSS</p>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-around w-full lg:my-12">

                <div className="mt-3 lg:mt-0 flex flex-col justify-center items-center">
                    {/* <h2>SOURCE FOR WEATHER DATA </h2> */}
                    <Image src={'/logos/open-meteo.jpeg'} width={85} height={100} alt="Open-meteo" />
                    <p>Open-Meteo  for the weather data</p>
                </div>

                <div className="mt-8 lg:mt-0 flex flex-col justify-center items-center">
                    {/* <h2>GEO-LOCATION AND POSITIONING </h2> */}
                    <Image src={'/logos/nominatim.png'} width={100} height={150} alt="Open-meteo" />
                    <p>Nominatim.openstreetmap for geo-location</p>
                </div>
            </div>



            <h2 className="font-semibold text-center lg:mt-0 mt-10">DEVELOPER</h2>
            <div>
                <p className="mt-4 lg:my-4 font-serif text-center"> <i>Daniel Chacha Mwita</i> </p>

                <div className="flex justify-center mt-3">
                    {/* <h3>PROFILES</h3> */}
                    <div className="flex flex-row lg:h-10 justify-between items-center  lg:w-[30vw] w-[50vw] ">
                        <a href="https://www.instagram.com/_daniel.chacha_/" target="blank" className="mr-3 lg:m-0">
                            <Image src={'/logos/instagram.jpeg'} width={50} height={40} alt="Instagram" className="rounded-xl " ></Image>
                        </a>

                        <a href="https://x.com/dan_mwita8" target="blank" className="mr-3 lg:m-0">
                            <Image src={'/logos/x.png'} width={50} height={40} alt="X" className="rounded-xl"></Image>
                        </a>

                        <a href="https://www.linkedin.com/in/daniel-mwita-5b58102b5/" target="blank" className="mr-3 lg:m-0">
                            <Image src={'/logos/linkedIn.png'} width={50} height={40} alt="LinkedIn" className="rounded-xl"></Image>
                        </a>

                        <a href="https://github.com/Daniel-Chacha" target="blank" className="mr-3 lg:m-0">
                            <Image src={'/logos/github.png'} width={50} height={40} alt="Github" className="rounded-xl "></Image>
                        </a>

                        <a href="https://discord.com/dan_mw8/" target="blank" >
                            <Image src={'/logos/discord.png'} width={50} height={40} alt="Discord" className="rounded-xl"></Image>
                        </a>

                    </div>
                </div>
            </div>

        </main>
    )
}