import { useEffect, useState } from "react"
import Link from "next/link";

const themes = {
    green: "#022D36",
    black: "#050100",
    blue: "#0A1172",
    purple: "#311432",
    maroon: "#4D0F28"
  };

const THEME_STORAGE_KEY ="selectedTheme"

export default function Menu(){
    const [showTooltip, setShowTooltip] =useState(false)
    const [selectedTheme, setSelectedTheme] =useState<string>(themes.green)

    useEffect(()=>{
        const savedTheme =localStorage.getItem(THEME_STORAGE_KEY);
        if(savedTheme && Object.values(themes).includes(savedTheme)){
            setSelectedTheme(savedTheme)
            document.documentElement.style.setProperty("--background", savedTheme);
        }else{
            document.documentElement.style.setProperty("--background", selectedTheme)
        }
    },[])

    //function to handle theme selection
    const handleThemeChange =(theme:string) =>{
        setSelectedTheme(theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme)
        document.documentElement.style.setProperty("--background", theme);

    }
    return(
        <div className="flex flex-col justify-around bg-[#919191] ml-3 h-[82vh] rounded-xl bg-opacity-[31%] items-center">
            {/* <div>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48">
                    <path fill="currentColor" d="M21.503 40a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m-13.5-2a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M26 12.01c6.337 0 9.932 4.194 10.455 9.26h.16c4.078 0 7.384 3.297 7.384 7.365s-3.306 7.364-7.385 7.364H15.386c-4.078 0-7.384-3.297-7.384-7.365s3.306-7.365 7.384-7.365h.16c.526-5.099 4.118-9.26 10.455-9.26M7.569 20.19a1.75 1.75 0 0 1-.499 2.3l-.142.09l-1.299.75a1.75 1.75 0 0 1-1.892-2.94l.142-.09l1.3-.75a1.75 1.75 0 0 1 2.39.64m14.14-9.528c-3.801 1.22-6.509 4.09-7.62 7.922l-.094.34l-.116.476l-.412.077a9.3 9.3 0 0 0-3.341 1.43A7.883 7.883 0 0 1 21.71 10.662M5.505 9.978l.132.056l1.36.634a1.75 1.75 0 0 1-1.347 3.227l-.132-.055l-1.36-.634a1.75 1.75 0 0 1 1.347-3.228m19.11-5.762a1.75 1.75 0 0 1 .508 2.317l-.078.12l-.86 1.23a1.75 1.75 0 0 1-2.945-1.887l.078-.121l.86-1.229a1.75 1.75 0 0 1 2.438-.43m-10.291-.419l.065.156l.513 1.41a1.75 1.75 0 0 1-3.224 1.352l-.065-.156l-.513-1.41a1.75 1.75 0 0 1 3.224-1.352"></path>
                </svg>
                <p className="mt-0 text-xs">Weather</p>
            </div> */}

            <div className="relative" onMouseEnter={()=>setShowTooltip(true)} onMouseLeave={()=>setTimeout(() => setShowTooltip(false), 200)}>
                <div className="cursor-pointer " >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14.647 4.081a.724.724 0 0 0 1.08.448c2.439-1.485 5.23 1.305 3.745 3.744a.724.724 0 0 0 .447 1.08c2.775.673 2.775 4.62 0 5.294a.724.724 0 0 0-.448 1.08c1.485 2.439-1.305 5.23-3.744 3.745a.724.724 0 0 0-1.08.447c-.673 2.775-4.62 2.775-5.294 0a.724.724 0 0 0-1.08-.448c-2.439 1.485-5.23-1.305-3.745-3.744a.724.724 0 0 0-.447-1.08c-2.775-.673-2.775-4.62 0-5.294a.724.724 0 0 0 .448-1.08c-1.485-2.439 1.305-5.23 3.744-3.745a.722.722 0 0 0 1.08-.447c.673-2.775 4.62-2.775 5.294 0M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6"></path>
                    </svg>
                    <p className="mt-0 text-xs">Theme</p>
                </div>

                {/* tooltip with theme colors */}
                {showTooltip && (
                    <div className=" absolute top-10 left-1/2  transform -translate-x-1/2 bg-white shadow-lg rounded-md p-2 z-50 flex flex-col space-y-2" >
                        {Object.entries(themes).map(([key, color]) =>(
                            <div 
                            key={key} 
                            className={`w-8 h-8 rounded-full cursor-pointer hover:scale-110 translation`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleThemeChange(color)}
                            ></div>
                        ))}
                    </div>
                )}
            </div>

            <Link href={"/about"}>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"></path>
                    </svg>
                    <p className="mt-0 text-xs">About</p>
                </div>
            </Link>

        </div>
    )
}