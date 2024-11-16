import { useState, useEffect } from "react";

export function useCountdown() {
    const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentSecond = now.getSeconds();

            let timeRemainingInSeconds = 0;

            if (currentHour === 8 && currentMinute <= 15) {
                timeRemainingInSeconds = (15 - currentMinute) * 60 - currentSecond;
            } else if (currentHour === 12 && currentMinute >= 30 && currentMinute <= 45) {
                timeRemainingInSeconds = (45 - currentMinute) * 60 - currentSecond;
            }

            if (timeRemainingInSeconds > 0) {
                const minutes = Math.floor(timeRemainingInSeconds / 60);
                const seconds = timeRemainingInSeconds % 60;
                setTimeLeft({ minutes, seconds });
            } else {
                setTimeLeft({ minutes: 0, seconds: 0 });
            }
        };

        calculateCountdown();

        const interval = setInterval(calculateCountdown, 1000);

        return () => clearInterval(interval);
    }, []);

    return timeLeft;
}