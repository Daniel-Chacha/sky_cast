
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
                    <h1 className="font-bold  text-4xl my-4 text-transparent bg-clip-text tracking-widest sm:text-5xl lg:text-4xl"
                        style={{
                            backgroundImage: `url('images/img2.avif')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitTextFillColor: 'transparent',
                        }}>SKYCAST</h1>

                    <h2 className="text-xl font-bold  lg:text-5xl my-5 sm:text-4xl">STAY AHEAD OF THE WEATHER</h2>

                    <ThreeDText />

                    <h4 className="text-xl font-bold  sm:text-2xl ">Experience:</h4>
                    <ul className="font-bold  sm:text-xl  ">
                        <li className="ml-5 sm:ml-20">✔  Hyper-accurate predictions</li>
                        <li className="ml-5 sm:ml-20">✔  Global coverage forecast</li>
                        <li className="ml-5 sm:ml-20">✔  From your District to International level</li>
                    </ul>

                    <h4 className="text-2xl mt-14 font-bold  lg:text-3xl  text-right lg:mt-8 tracking-widest bg-clip-text text-transparent"
                        style={{
                            backgroundImage: `url('images/img2.avif')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitTextFillColor: 'transparent',
                        }}>  WE GOT YOU COVERED</h4>
                </div>
            </div>

            {/* navigation buttons */}
            <div className="absolute top-0 left-0 w-full h-full justify-between items-center flex text-white text-3xl px-2 z-10">
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