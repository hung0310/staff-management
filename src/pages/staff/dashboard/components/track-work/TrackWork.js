import React, { useEffect, useState } from 'react';
import styles from './TrackWork.module.scss'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCountdown } from '../../../../../hooks/useCountDown';
import { CheckIn, CheckInOvertime, CheckOut, CheckOutOvertime, Get_Daily_Timesheet, Get_Profile_Emp } from '../../../../../apis/staffAPI';
import { UseToast } from '../../../../../hooks/ToastProvider';

const TrackWork = ({setSelectedContent}) => {
    const [timeInMorning, setTimeInMorning] = useState('');
    const [timeOutMorning, setTimeOutMorning] = useState('');
    const [timeInAfternoon, setTimeInAfternoon] = useState('');
    const [timeOutAfternoon, setTimeOutAfternoon] = useState('');
    const [timeInOvertime, setTimeInOvertime] = useState('');
    const [timeOutOvertime, setTimeOutOvertime] = useState('');
    const [colorMorning, setColorMorning] = useState(false);
    const [colorAfternoon, setColorAfternoon] = useState(false);
    const [colorOvertime, setColorOvertime] = useState(false);
    const [countOutDay, setCountOutDay] = useState(0);
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [dailyTimesheet, setDailyTimesheet] = useState({});
    const { showToast } = UseToast();
    const [dateNow, setDateNow] = useState('');
    const [statusButton, setStatusButton] = useState(true);
    const [dataProfile, setDataProfile] = useState({});
    const { minutes, seconds } = useCountdown();

    const SetTime = async (hour, minitue) => {
        const totalMinitues = hour * 60 + minitue;
        let status = true;
        let result;

        if(totalMinitues >= (8 * 60) && totalMinitues <= (8 * 60 + 15)) {
            try {
                result = await CheckIn({'shift_type': 'MORNING'});
            } catch(error) {
                console.log(error);
            }         
        }

        if(totalMinitues >= (13 * 60 + 30) && totalMinitues <= (13 * 60 + 45)) {
            try {
                result = await CheckIn({'shift_type': 'AFTERNOON'});
            } catch(error) {
                console.log(error);
            }         
        }

        if(totalMinitues >= (18 * 60) && totalMinitues <= (19 * 60)) {
            try {
                result = await CheckInOvertime();
            } catch(error) {
                console.log(error);
            }           
        }

        if(totalMinitues >= (20 * 60) && totalMinitues <= (23 * 60)) {
            try {
                result = await CheckOutOvertime();
            } catch(error) {
                console.log(error);
            }             
        }

        if(countOutDay < 2) {
            if(totalMinitues >= (11 * 60 + 30) && totalMinitues <= (12 * 60))  {
                try {
                    result = await CheckOut({'shift_type': 'MORNING'});
                } catch(error) {
                    console.log(error);
                }     
            }

            if(totalMinitues >= (17 * 60) && totalMinitues <= (17 * 60 + 30))  {
                try {
                    result = await CheckOut({'shift_type': 'AFTERNOON'});
                } catch(error) {
                    console.log(error);
                }     
            }
        } else {
            if(totalMinitues >= (11 * 60 + 45) && totalMinitues <= (12 * 60))  {
                try {
                    result = await CheckOut({'shift_type': 'MORNING'});
                } catch(error) {
                    console.log(error);
                }     
            }

            if(totalMinitues >= (17 * 60 + 15) && totalMinitues <= (17 * 60 + 30))  {
                try {
                    result = await CheckOut({'shift_type': 'AFTERNOON'});
                } catch(error) {
                    console.log(error);
                }     
            }

            if((totalMinitues >= (11 * 60 + 30) && totalMinitues < (11 * 60 + 45)) || (totalMinitues >= (17 * 60) && totalMinitues < (17 * 60 + 15)))
                status = false;
        }

        if(result?.status === 200) {
            showToast("Chấm công thành công!", "success");
            setStatusButton(true);
        } else {
            if(!status)
                showToast("Bạn đã hết phép về sớm trong tháng này!", "error");
            else showToast("Bạn đã chấm công ca này rồi!", "error"); 
            
            setStatusButton(true);
        }
    }

    const handle_TimeKeeping = () => {
        const date = new Date();
        setStatusButton(true);
        SetTime(date.getHours(), date.getMinutes());
        fetchDailyTimeSheet();
    }

    useEffect(() => {
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const date = new Date();
        setDayOfWeek(daysOfWeek[date.getDay()]);
        const date_now = `${date.getDate()}/${date.getMonth() + 1}`;
        setDateNow(date_now);
    }, []);

    const fetchDailyTimeSheet = async () => {
        try {
            const result = await Get_Daily_Timesheet();
            if(result.status === 200) {
                setDailyTimesheet(result.data);
                setCountOutDay(result.data.early_leave_count);
            }
        } catch(error) {
            console.log(error);
        }
    }

    const fetchDataProfile = async () => {
        try {
            const result = await Get_Profile_Emp();
            if(result.status === 200)
                setDataProfile(result.data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDataProfile();
        fetchDailyTimeSheet();
    }, []);

    useEffect(() => {
        const checkTime = () => {
            const date = new Date();
            const totalMinutes = date.getHours() * 60 + date.getMinutes();
            const dayOfWeek = date.getDay();

            if(totalMinutes >= 8 * 60 && totalMinutes <= 11 * 60 + 30) {
                setColorMorning(true);
            } else if(totalMinutes >= 13 * 60 + 30 && totalMinutes <= 17 * 60 + 30) {
                setColorAfternoon(true);
            } else if(totalMinutes >= 18 * 60 && totalMinutes <= 23 * 60) {
                setColorOvertime(true);
            } else {
                setColorMorning(false);
                setColorAfternoon(false);
                setColorOvertime(false);
            }

            if(dayOfWeek !== 0 && (dayOfWeek !== 6 || (totalMinutes >= 13 * 60 + 30))) {
                if (
                    (totalMinutes >= 8 * 60 && totalMinutes <= 8 * 60 + 15) ||
                    (totalMinutes >= 11 * 60 + 30 && totalMinutes <= 12 * 60) ||
                    (totalMinutes >= 13 * 60 + 30 && totalMinutes <= 13 * 60 + 45) ||
                    (totalMinutes >= 17 * 60 && totalMinutes <= 17 * 60 + 30) ||
                    (totalMinutes >= 18 * 60 && totalMinutes <= 19 * 60) ||
                    (totalMinutes >= 20 * 60 && totalMinutes <= 23 * 60)
                ) {
                    setStatusButton(false);
                } else {
                    setStatusButton(true);
                }                
            } else 
                setStatusButton(true);
        };
        checkTime();
        const interval = setInterval(checkTime, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`${styles.timesheet} `}>
            <div className={`${styles.timesheet_container} `}>
                <div className={`${styles.header_timesheet} `}>
                    <div className={`${styles.info_employ} `}>
                        <span><strong>Tên nhân viên: </strong>{dataProfile.full_name}</span>
                        <span><strong>Phòng ban: </strong>{dataProfile.department}</span>
                    </div>

                    <div className={`${styles.custom_btn} `}>
                        {minutes > 0 || seconds > 0 ? (
                            <span>Thời gian còn lại: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
                        ) : (
                            <span style={{ color: 'red' }}>Quá giờ chấm công!</span>
                        )}
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
                                            <span>Thứ</span>
                                        </div>
                                    </th>

                                    <th rowSpan={3} className={`${styles.date_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>Ngày</span>
                                        </div>
                                    </th>

                                    <th colSpan={6} className={`${styles.session_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span className='text-white'>.</span>
                                        </div>
                                    </th>

                                    {/* <th className={`${styles.actual_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>a</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.scheduled_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>b</span>
                                        </div>
                                    </th> */}
                                </tr>

                                <tr className={`${styles.title_table} `}>
                                    <th 
                                        colSpan={2} 
                                        className={`${styles.morning_tb} `}
                                        style={{
                                            backgroundColor: colorMorning ? '#a6cffd' : 'transparent'
                                        }}
                                    >
                                        <div className={`${styles.title} `}>
                                            <span>CA SÁNG</span>
                                        </div>
                                    </th>

                                    <th 
                                        colSpan={2} 
                                        className={`${styles.afternoon_tb} `}
                                        style={{
                                            backgroundColor: colorAfternoon ? '#a6cffd' : 'transparent'
                                        }}
                                    >
                                        <div className={`${styles.title} `}>
                                            <span>CA CHIỀU</span>
                                        </div>
                                    </th>

                                    <th 
                                        colSpan={2} 
                                        className={`${styles.afternoon_tb} `}
                                        style={{
                                            backgroundColor: colorOvertime ? '#a6cffd' : 'transparent'
                                        }}
                                    >
                                        <div className={`${styles.title} `}>
                                            <span>CA TỐI</span>
                                        </div>
                                    </th>

                                    {/* <th rowSpan={2} className={`${styles.actual_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>ACTUAL HOURS</span>
                                        </div>
                                    </th>
                                    <th rowSpan={2} className={`${styles.scheduled_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>SCHEDULED HOURS</span>
                                        </div>
                                    </th> */}
                                </tr>

                                <tr>
                                    <th className={`${styles.in_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ VÀO</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.out_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ RA</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.in_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ VÀO</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.out_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ RA</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.in_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ VÀO</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.out_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ RA</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <span>{dayOfWeek}</span>
                                    </td>
                                    <td>
                                        <span>{dateNow}</span>
                                    </td>
                                    <td>
                                        <span>{dailyTimesheet?.morning_shift !== null ? dailyTimesheet.morning_shift?.check_in_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    <td>
                                        <span>{dailyTimesheet?.morning_shift !== null ? dailyTimesheet.morning_shift?.check_out_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    <td>
                                        <span>{dailyTimesheet?.afternoon_shift !== null ? dailyTimesheet.afternoon_shift?.check_in_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    <td>
                                        <span>{dailyTimesheet?.afternoon_shift !== null ? dailyTimesheet.afternoon_shift?.check_out_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    <td>
                                        <span>{dailyTimesheet?.overtime_shift !== null ? dailyTimesheet.overtime_shift?.check_in_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    <td>
                                        <span>{dailyTimesheet?.overtime_shift !== null ? dailyTimesheet.overtime_shift?.check_out_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                    </td>
                                    {/* <td>
                                        <span></span>
                                    </td>
                                    <td>
                                        <span></span>
                                    </td> */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={`${styles.detail_timesheet} `} onClick={() => setSelectedContent('detail_timesheet')}>
                    <span>Xem chi tiết lịch chấm công</span>
                </div>
            </div>
        </div>
    );
};

export default TrackWork;