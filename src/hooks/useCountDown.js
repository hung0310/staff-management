import { useState, useEffect } from "react";

const TIME_RANGES = [
  {
    name: 'CHECKIN_MORNING',
    startHour: 8,
    startMinute: 0,
    endHour: 8,
    endMinute: 15,
    description: 'Check-in Ca Sáng'
  },
  {
    name: 'CHECKOUT_MORNING',
    startHour: 11,
    startMinute: 30,
    endHour: 12,
    endMinute: 0,
    description: 'Check-out Ca Sáng'
  },
  {
    name: 'CHECKIN_AFTERNOON',
    startHour: 13,
    startMinute: 30,
    endHour: 13,
    endMinute: 45,
    description: 'Check-in Ca Chiều'
  },
  {
    name: 'CHECKOUT_AFTERNOON',
    startHour: 17,
    startMinute: 0,
    endHour: 17,
    endMinute: 30,
    description: 'Check-out Ca Chiều'
  },
  {
    name: 'OVERTIME_1',
    startHour: 18,
    startMinute: 0,
    endHour: 19,
    endMinute: 0,
    description: 'Tăng ca (18h-19h)'
  },
  {
    name: 'OVERTIME_2',
    startHour: 20,
    startMinute: 0,
    endHour: 23,
    endMinute: 0,
    description: 'Tăng ca (20h-23h)'
  }
];

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0, description: '' });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      
      const currentTotalMinutes = currentHour * 60 + currentMinute;

      const currentRange = TIME_RANGES.find(range => {
        const rangeStartMinutes = range.startHour * 60 + range.startMinute;
        const rangeEndMinutes = range.endHour * 60 + range.endMinute;
        return currentTotalMinutes >= rangeStartMinutes && currentTotalMinutes <= rangeEndMinutes;
      });

      if (currentRange) {
        const rangeEndMinutes = currentRange.endHour * 60 + currentRange.endMinute;
        const timeRemainingInMinutes = rangeEndMinutes - currentTotalMinutes;
        const timeRemainingInSeconds = timeRemainingInMinutes * 60 - currentSecond;

        if (timeRemainingInSeconds > 0) {
          setTimeLeft({
            minutes: Math.floor(timeRemainingInSeconds / 60),
            seconds: timeRemainingInSeconds % 60,
            description: currentRange.description
          });
          return;
        }
      }

      setTimeLeft({ minutes: 0, seconds: 0, description: '' });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}