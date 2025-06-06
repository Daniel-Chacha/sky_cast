    import { NextResponse } from "next/server";

    export async function GET() {
        console.log('connected ')
    try {
        const response = await fetch("http://ipapi.co/json/");
        
        // Check if response is OK (status 200)
        if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({
        city: data.city,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        });
    } catch (error) {
        console.error("Error fetching location:", error);
        return NextResponse.json(
        { error: "Failed to fetch location" },
        { status: 500 }
        );
    }
    }
