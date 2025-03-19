import { useEffect, useState } from "react"
import Link from "next/link";

const themes = {
    green: "#022D36",
    black: "#050100",
    blue: "#0A1172",
    purple: "#311432",
    maroon: "#4D0F28"
};

const THEME_STORAGE_KEY = "selectedTheme"

export default function Menu() {
    const [showTooltip, setShowTooltip] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState<string>(themes.green)

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && Object.values(themes).includes(savedTheme)) {
            setSelectedTheme(savedTheme)
            document.documentElement.style.setProperty("--background", savedTheme);
        } else {
            document.documentElement.style.setProperty("--background", selectedTheme)
        }
    }, [])

    //function to handle theme selection
    const handleThemeChange = (theme: string) => {
        setSelectedTheme(theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme)
        document.documentElement.style.setProperty("--background", theme);

    }
    return (
        <div className="flex p-2 lg:flex-col justify-around lg:bg-[#919191] bg-black lg:ml-3 lg:h-[82vh] lg:rounded-xl lg:bg-opacity-[31%] items-center ">

            <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setTimeout(() => setShowTooltip(false), 200)}>
                <div className="cursor-pointer " >
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14.647 4.081a.724.724 0 0 0 1.08.448c2.439-1.485 5.23 1.305 3.745 3.744a.724.724 0 0 0 .447 1.08c2.775.673 2.775 4.62 0 5.294a.724.724 0 0 0-.448 1.08c1.485 2.439-1.305 5.23-3.744 3.745a.724.724 0 0 0-1.08.447c-.673 2.775-4.62 2.775-5.294 0a.724.724 0 0 0-1.08-.448c-2.439 1.485-5.23-1.305-3.745-3.744a.724.724 0 0 0-.447-1.08c-2.775-.673-2.775-4.62 0-5.294a.724.724 0 0 0 .448-1.08c-1.485-2.439 1.305-5.23 3.744-3.745a.722.722 0 0 0 1.08-.447c.673-2.775 4.62-2.775 5.294 0M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6"></path>
                    </svg>
                    <p className="mt-0 text-xs">Theme</p>
                </div>

                {/* tooltip with theme colors */}
                {showTooltip && (
                    <div className=" absolute top-10 left-1/2  transform -translate-x-1/2 bg-white shadow-lg rounded-md p-2 z-50 flex flex-col space-y-2" >
                        {Object.entries(themes).map(([key, color]) => (
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