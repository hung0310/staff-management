import React, { useEffect, useState } from 'react';
import styles from './DetailTimesheet.module.scss'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Get_Current_Month_Timesheet } from '../../../../../apis/staffAPI';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';

const DetailTimesheet = () => {
    const [dataTimesheet, setDataTimesheet] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage, totalRows);

    function getWeekdayFromDate(dateString) {
        const date = new Date(dateString); 
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        return daysOfWeek[date.getDay()];
    }

    const fetchData = async () => {
        try {
            const result = await Get_Current_Month_Timesheet(currentPage);
            const total = Math.ceil(result.data.totalRows / result.data.page_size);
            setTotalPage(total);
            setTotalRows(result.data.totalRows);
            setDataTimesheet(result.data.results);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage, setTotalPage, setTotalRows, setDataTimesheet]);

    return (
        <div className={`${styles.timesheet} `}>
            <div className={`${styles.timesheet_container} `}>
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
                                </tr>

                                <tr className={`${styles.title_table} `}>
                                    <th colSpan={2} className={`${styles.morning_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>CA SÁNG</span>
                                        </div>
                                    </th>

                                    <th colSpan={2} className={`${styles.afternoon_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>CA CHIỀU</span>
                                        </div>
                                    </th>

                                    <th colSpan={2} className={`${styles.afternoon_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>CA TỐI</span>
                                        </div>
                                    </th>
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
                                {dataTimesheet.map((item, index) => (
                                    getWeekdayFromDate(item.date) !== 'Chủ Nhật' ? (
                                        <tr>
                                            <td>
                                                <span>{getWeekdayFromDate(item.date)}</span>
                                            </td>
                                            <td>
                                                <span>{item.date.split('-').reverse().join('/')}</span>
                                            </td>
                                            <td>
                                                <span>{item?.morning_shift !== null ? item.morning_shift?.check_in_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                            </td>
                                            <td>
                                                <span>{item?.morning_shift !== null ? item.morning_shift?.check_out_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                            </td>
                                            <td>
                                                <span>{item?.afternoon_shift !== null ? item.afternoon_shift?.check_in_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                            </td>
                                            <td>
                                                <span>{item?.afternoon_shift !== null ? item.afternoon_shift?.check_out_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                            </td>
                                            <td>
                                                <span>{item?.overtime_shift !== null ? item.overtime_shift?.check_in_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                            </td>
                                            <td>
                                                <span>{item?.overtime_shift !== null ? item.overtime_shift?.check_out_time?.substring(0, 5) : <FontAwesomeIcon icon={faClock} style={{color: '#f77846'}}/>}</span>
                                            </td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={`${styles.paginnate} mt-5`}>
                    <PaginationComponent/>
                </div>
            </div>
        </div>
    );
};

export default DetailTimesheet;