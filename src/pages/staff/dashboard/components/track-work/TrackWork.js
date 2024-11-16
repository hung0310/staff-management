import React, { useEffect, useState } from 'react';
import styles from './TrackWork.module.scss'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCountdown } from '../../../../../hooks/useCountDown';

const TrackWork = () => {
    const [timeInMorning, setTimeInMorning] = useState('');
    const [timeOutMorning, setTimeOutMorning] = useState('');
    const [timeInAfternoon, setTimeInAfternoon] = useState('');
    const [timeOutAfternoon, setTimeOutAfternoon] = useState('');
    const [countOutDay, setCountOutDay] = useState(0);
    const [dateNow, setDateNow] = useState('');
    const [statusButton, setStatusButton] = useState(false);
    const { minutes, seconds } = useCountdown();

    const SetTime = (hour, minitue) => {
        const totalMinitues = hour * 60 + minitue;
        console.log(">Hello", totalMinitues);  
        // if(totalMinitues >= (8 * 60) && totalMinitues <= (8 * 60 + 15)) {
        //     const currentTime = `${hour}:${minitue} AM`;
        //     setTimeInMorning(currentTime);            
        // }
        if(totalMinitues >= (50) && totalMinitues <= (55)) {
            const currentTime = `${hour}:${minitue} AM`;
            setTimeInMorning(currentTime); 
            console.log(">Hello", currentTime);           
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

    useEffect(() => {
        const date = new Date();
        const date_now = `${date.getDate()}/${date.getMonth() + 1}`;
        setDateNow(date_now);
    }, []);

    useEffect(() => {
        const checkTime = () => {
            const date = new Date();
            const totalMinutes = date.getHours() * 60 + date.getMinutes();
            if (
                (totalMinutes >= 8 * 60 && totalMinutes <= 8 * 60 + 15) ||
                (totalMinutes >= 50 && totalMinutes <= 55) ||
                (totalMinutes >= 11 * 60 + 30 && totalMinutes <= 12 * 60) ||
                (totalMinutes >= 17 * 60 && totalMinutes <= 17 * 60 + 30)
            ) {
                setStatusButton(false);
            } else {
                setStatusButton(true);
            }
        };
        checkTime();
        const interval = setInterval(checkTime, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const CustomTimeKeeping = () => {
        const date = new Date();
        // if(dateNow === '17/11') {
        //     if()
        // }
    }

    return (
        <div className={`${styles.timesheet} `}>
            <div className={`${styles.timesheet_container} `}>
                <div className={`${styles.header_timesheet} `}>
                    <div className={`${styles.info_employ} `}>
                        <span><strong>Tên nhân viên: </strong>Lê Lý Thị Sầu</span>
                        <span><strong>Bộ phận nhân sự: </strong>Chuyên viên tư vấn</span>
                    </div>

                    <div className={`${styles.custom_btn} `}>
                        {statusButton && minutes > 0 ? <span>Time: {minutes}:{seconds}</span> : <span style={{ color: 'red' }}>Quá giờ chấm công!</span>}
                        <button    
                            onClick={handle_TimeKeeping} 
                            disabled={statusButton}
                            style={{
                                cursor: statusButton ? 'not-allowed' : ''
                            }}
                        >
                            Xác nhận chấm công {statusButton}
                        </button>
                    </div>
                </div>

                <div className={`${styles.content_timesheet} `}>
                    <div className={`${styles.table_info} `}>
                        <table className={`${styles.custom_table} `} role='table'>
                            <thead>
                                <tr className={`${styles.overview_table} `}>
                                    <th rowSpan={3} className={`${styles.day_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>DAY</span>
                                        </div>
                                    </th>

                                    <th rowSpan={3} className={`${styles.date_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>DATE</span>
                                        </div>
                                    </th>

                                    <th colSpan={6} className={`${styles.session_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span className='text-white'>.</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.actual_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>a</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.scheduled_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>b</span>
                                        </div>
                                    </th>
                                </tr>

                                <tr className={`${styles.title_table} `}>
                                    <th colSpan={2} className={`${styles.morning_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>MORNING</span>
                                        </div>
                                    </th>

                                    <th colSpan={2} className={`${styles.afternoon_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>AFTERNOON</span>
                                        </div>
                                    </th>

                                    <th colSpan={2} className={`${styles.afternoon_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>OVERTIME</span>
                                        </div>
                                    </th>

                                    <th rowSpan={2} className={`${styles.actual_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>ACTUAL HOURS</span>
                                        </div>
                                    </th>
                                    <th rowSpan={2} className={`${styles.scheduled_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>SCHEDULED HOURS</span>
                                        </div>
                                    </th>
                                </tr>

                                <tr>
                                    <th className={`${styles.in_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>IN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.out_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>OUT</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.in_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>IN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.out_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>OUT</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.in_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>IN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.out_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>OUT</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr 
                                    style={{
                                        backgroundColor: dateNow === '17/11' ? '#d8d7d7' : ''
                                    }}
                                >
                                    <td>
                                        <span>Thứ 2</span>
                                    </td>
                                    <td>
                                        <span>12</span>
                                    </td>
                                    <td>
                                        <span>{timeInMorning !== '' ? timeInMorning : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    <td>
                                        <span>{timeOutMorning !== '' ? timeInMorning : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    <td>
                                        <span>{timeInAfternoon !== '' ? timeInMorning : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    <td>
                                        <span>{timeOutAfternoon !== '' ? timeInMorning : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    <td>
                                        <span></span>
                                    </td>
                                    <td>
                                        <span></span>
                                    </td>
                                    <td>
                                        <span></span>
                                    </td>
                                    <td>
                                        <span></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackWork;