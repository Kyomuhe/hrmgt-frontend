import { useEffect, useState } from "react"

export const useGreetings = () => {
    const [greetings, setGreetings] = useState("");
    useEffect(
        () => {
            const hour = new Date().getHours();

            if (hour < 12) {
                setGreetings("Good morning");
            }
            if (hour < 18) {
                setGreetings("Good Afternoon");
            } else {
                setGreetings("Good evening")
            }
        }, []
    );

    return greetings
};