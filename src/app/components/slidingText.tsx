import { useEffect, useState } from "react";


export const ThreeDText =() =>{
    const words =['REAL-TIME', 'ACCURATE', 'RELIABLE', 'TRUSTED', 'DETAILED','CREDIBLE'];
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [isTextAnimating, setIsTextAnimating] = useState<boolean>(false);
    // const textContainerRef = useRef<HTMLSpanElement | null >(null);

    useEffect(() =>{
        //start after 1 second
        const initialTimer = setTimeout(() =>{
            setIsTextAnimating(true);
        }, 1000);

        //handle word sequence
        const interval = setInterval(() =>{
            setIsTextAnimating(true);
            setTimeout(() =>{
                setCurrentWordIndex((prev) =>(prev + 1) % words.length);
                setIsTextAnimating(false);
            }, 500);    //half of animation duration
        }, 2000);       //2 sec per word

        return() =>{
            clearTimeout(initialTimer);
            clearInterval(interval);
        }
    }, []);

    return(
        <h3 className="font-bold  text-4xl my-4 tracking-widest flex flex-row items-center">
            <span className={`relative inline-block overflow-hidden transition-all duration-1000 w-60 text-[#c77826] text-transparent bg-clip-text text-stroke-white
                            ${isTextAnimating ? 'animate-3d-flip' : ''}`}
                            key={currentWordIndex}
                            style={{
                                backgroundImage: `url('images/img2.avif')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                WebkitTextFillColor: 'transparent',
                            }}
                            >
                            {words[currentWordIndex]}
              
            </span>

            <span>FORECASTS</span>
        </h3>

    )
}