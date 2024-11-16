import React, { useState } from 'react';
import styles from './TimeKeeping.module.scss'

const TimeKeeping = () => {
    const [timeInMorning, setTimeInMorning] = useState('');
    const [timeOutMorning, setTimeOutMorning] = useState('');
    const [timeInAfternoon, setTimeInAfternoon] = useState('');
    const [timeOutAfternoon, setTimeOutAfternoon] = useState('');
    const [countOutDay, setCountOutDay] = useState(0);

    const SetTime = (hour, minitue) => {
        const totalMinitues = hour * 60 + minitue;
        if(totalMinitues >= (8 * 60) && totalMinitues <= (8 * 60 + 15)) {
            const currentTime = `${hour}:${minitue} AM`;
            setTimeInMorning(currentTime);            
        }

        if(totalMinitues >= (13 * 60 + 30) && totalMinitues <= (13 * 60 + 45)) {
            const currentTime = `${hour}:${minitue} PM`;
            setTimeInAfternoon(currentTime);            
        }

        if(countOutDay <= 2) {
            if(totalMinitues >= (11 * 60 + 30) && totalMinitues <= (12 * 60))  {
                if(totalMinitues === (12 * 60)) {
                    const currentTime = `${hour}:${minitue} PM`;
                    setTimeOutMorning(currentTime);
                } else {
                    const currentTime = `${hour}:${minitue} AM`;
                    setTimeOutMorning(currentTime);
                }
            }

            if(totalMinitues >= (17 * 60) && totalMinitues <= (17 * 60 + 30))  {
                const currentTime = `${hour}:${minitue} PM`;
                setTimeOutAfternoon(currentTime);
            }
        } else {
            if(totalMinitues >= (11 * 60 + 45) && totalMinitues <= (12 * 60))  {
                if(totalMinitues === (12 * 60)) {
                    const currentTime = `${hour}:${minitue} PM`;
                    setTimeOutMorning(currentTime);
                } else {
                    const currentTime = `${hour}:${minitue} AM`;
                    setTimeOutMorning(currentTime);
                }
            }

            if(totalMinitues >= (17 * 60 + 15) && totalMinitues <= (17 * 60 + 30))  {
                const currentTime = `${hour}:${minitue} PM`;
                setTimeOutAfternoon(currentTime);
            }
        }
    }

    const handle_TimeKeeping = () => {
        const date = new Date();
        // const currentTime = date.getHours() <= 12 ? `${date.getHours()}:${date.getMinutes()} AM` : `${date.getHours()}:${date.getMinutes()} PM`;
        SetTime(date.getHours(), date.getMinutes());
    }

    return (
        <div>
            
        </div>
    );
};

export default TimeKeeping;