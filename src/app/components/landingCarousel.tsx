
import { useEffect, useState } from "react";
import Image from "next/image";
import { ThreeDText } from "./slidingText";

export const LandingPageCarousel = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [slideDirection, setSlideDirection] = useState<string>('right');

    //Auto slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    //next sliding
    const handleNext = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setSlideDirection('right');
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
            setIsAnimating(false);
        }, 1000);  //the animation duration matches the css
    }

    //prev sliding
    const handlePrev = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setSlideDirection("left");
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
            setIsAnimating(false);
        }, 1000);
    };

    return (
        <div className="relative w-[100vw] h-[100vh] overflow-hidden">

            {/* Image Stack */}
            <div className="relative w-full h-full">
                {/* current image */}
                <div className="absolute inset-0 z-10 h-[100vh] w-[100vw]">
                    <Image src={images[currentIndex]} alt={`Slide ${currentIndex}`} fill className="object-cover brightness-75" />
                </div>

                {/* sliding Image */}
                {isAnimating && (
                    <div
                        className={`absolute inset-0 z-20 transition-transform duration-1000 ease-in-out
                                    ${slideDirection === 'right'
                                ? 'translate-x-full animate-slide-left'
                                : '-translate-x-full animate-slide-right'
                            }`
                        }>
                        <Image src={images[
                            slideDirection === 'right'
                                ? (currentIndex + 1) % images.length
                                : (currentIndex - 1 + images.length) % images.length
                        ]}

                            alt="Sliding image" fill className="object-cover brightness-75 " />
                    </div>
                )}
                <div className="top-[15%] absolute z-30 left-[10%] lg:top-[8%] sm:top-[10%]">
                    <h1 className="font-playfair  text-5xl my-4 text-transparent bg-clip-text tracking-widest sm:text-5xl lg:text-8xl font-semibold"
                        style={{
                            backgroundImage: `url('images/img2.avif')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitTextFillColor: 'transparent',
                        }}>MeteoSphere</h1>

                    <h2 className="flex flex-row justify-center items-center">
                        <svg className="inline mr-3" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 64 64"><path fill="#1e75bb" d="M64.03 32.02c0 17.686-14.335 32.02-32.02 32.02c-17.684 0-32.02-14.33-32.02-32.02C-.01 14.338 14.323 0 32.01 0c17.68 0 32.02 14.333 32.02 32.02"/><path fill="#186da3" d="M15.239 41.27C9.566 29.099 9.311 16 14.442 5.17C5.748 10.892.002 20.727.002 31.914c0 17.685 14.331 32.02 32.02 32.02c.316 0 .625-.039.937-.047c-7.34-6.177-13.525-13.61-17.716-22.609"/><g fill="#00a650"><path d="M50.37 44.701c-.206 1.701-1.862 1.95-2.669 3.05c.344 1.928-1.377 5.05.573 5.341c1.851.278 2.194-5.594 2.479-8.01c-.253-.004-.174-.336-.383-.383M47.594 3.931c-1.073.819-2.979-.319-4.065-.49c-1.118.469-2.111 1.068-3.436 1.335c-.214.555.043 1.379.193 2.096c1.21.751 2.871.432 4.575.382c-.359 1.919-.257 3.693-1.716 4.196c-1.794.617-4.172-1.058-6.098-1.143c-.841.18-.621 1.413-1.531 1.524c-1.494-.921-3.4-1.429-4.573-2.67c.354-.498.269-1.821-.192-2.098c-3.243-.169-6.102 1.796-8.581 1.145c-.309 1.093-1.25 1.547-1.906 2.289c.316 3.076-3.16 3.847-3.816 6.292c-.447 1.666.439 3.779-.38 5.721c2.01 1.787 2.12 5.727 5.149 6.103c2.033.252 3.721-.84 6.098-1.145c.914.72 1.163 1.602 2.863 1.145c.88 1.035-.356 3.704.383 4.768c1.392 2.01 2.438 3.416 2.096 5.911c-.143 1.043-1.013 1.975-.953 3.053c.043.821.737 1.536.953 2.286c.728 2.558.984 5.62 2.476 7.821c.142.581-.324.56-.19 1.143c1.096.847 4.482.293 5.532-.382c2.153-1.374 1.77-4.811 3.812-6.102c.316-.959-.158-1.737-.186-2.858c.684-1.097 1.93-1.629 2.858-2.48c.801-2.733-.743-4.535-.569-7.248c2.199-3.583 5.781-5.785 6.861-10.489a39 39 0 0 1-3.622.762c-1.622-1.68-2.852-3.757-4.192-5.72c.311-3.01-2.629-4.71-2.1-6.675c.392.054.174.712.569.762c.814-1.652 1.349 1.767 1.717 2.48c.146.281.771.428.955.762c.247.455.033 1.032.191 1.525c.384 1.217 1.692 1.755 1.906 3.052c.182 1.106-.087 1.556.384 2.097c3.58-1.374 7.341-2.57 8.581-6.292c-.989-.347-1.553-1.117-2.101-1.907c-.458.749-1.158 1.253-2.289 1.334c-.427-1.608-1.515-2.549-1.906-4.196c1.685-.757 1.918 1.491 3.053 1.907h1.717c.431 1.041 1.789 1.159 3.266 1.157c-2.906-4.649-6.955-8.513-11.786-11.153"/><path d="M24.84 2.106c-.387.055-.377.516-.765.571c-1.194.124-2.43-.548-3.435 0c.119 1.387-.142 2.396-.186 3.623c1.333 1.396 3.397 1.086 4.765-.188c-.111-.62.13-.89.19-1.336c1.362-.163 1.542-1.514 2.286-2.289c1.229.208 1.649-.391 2.483-.572c1.246 1.617 3.566 2.153 4.195 4.385c.253-.788.127-1.774.953-1.524c-1.341-.705-4.132-2.54-2.669-4.197c1.847 1.356 3.23 4.04 4.809 5.272c.02-.047.067-.091.15-.123c1.075.668-.519.676-.38 1.525c.623-.073.836-.558 1.333-.763c.035-.799-.938-.589-.766-1.524c.702-.574 2.122-.426 2.859-.954a3.6 3.6 0 0 1 .599-2.685a32 32 0 0 0-9-1.307c-2.575 0-5.06.336-7.457.908c.081.325.109.704.04 1.178"/></g></svg>
                        <span  className=" font-playfair font-normal text-xl  lg:text-3xl my-8 sm:text-4xl">Global weather data now within reach.</span>
                    </h2>

                    <ThreeDText />

                    {/* <h4 className="text-xl font-bold  sm:text-2xl ">Experience:</h4>
                    <ul className="font-bold  sm:text-xl  ">
                        <li className="ml-5 sm:ml-20">✔  Hyper-accurate predictions</li>
                        <li className="ml-5 sm:ml-20">✔  Global coverage forecast</li>
                        <li className="ml-5 sm:ml-20">✔  From your District to International level</li>
                    </ul> */}

                    {/* <h4 className="text-2xl mt-14 font-bold  lg:text-3xl  text-right lg:mt-8 tracking-widest bg-clip-text text-transparent"
                        style={{
                            backgroundImage: `url('images/img2.avif')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitTextFillColor: 'transparent',
                        }}>  WE GOT YOU COVERED</h4> */}
                </div>
            </div>

            {/* navigation buttons */}
            <div className="max-sm:hidden  absolute top-0 left-0 w-full h-full justify-between items-center flex text-white text-3xl px-2 z-10">
                <button onClick={handlePrev} disabled={isAnimating} className="font-bold font-2xl rounded-full hover:bg-gray-300 hover:text-black w-10 h-10"> {/* Disable during animation */}
                    {/* <FaArrowAltCircleLeft /> */} &lt;
                </button>
                <button onClick={handleNext} disabled={isAnimating} className="font-bold font-2xl rounded-full hover:bg-gray-300 hover:text-black w-10 h-10"> {/* Disable during animation */}
                    {/* <FaArrowAltCircleRight /> */} &gt;
                </button>
            </div>
        </div>
    )
}