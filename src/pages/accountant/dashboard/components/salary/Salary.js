import React, { useEffect, useState } from 'react';
import styles from './Salary.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';
import ButtonExport from '../../../../../components/ButtonExport/ButtonExport';
import { Get_DropDown_Department, Get_Salary_Month, Get_Tracking_Time_Employee } from '../../../../../apis/staffAPI';

const Salary = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [departmentData, setDepartmentData] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage, totalRows);
    const [monthChoose, setMonthChoose] = useState('');
    const [departmentChoose, setDepartmentChoose] = useState('all');
    const [dataMain, setDataMain] = useState([]);
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await Get_DropDown_Department();
                if(result.status === 200) {
                    setDepartmentData(result.data);
                }
            }
            fetchData();
        } catch(error) {
            console.log(error);
        }
    }, [setDepartmentData]);

    const handleChooseDepartment = (e) => {
        const selectedDepartment = e.target.value;
        setDepartmentChoose(selectedDepartment);
    }

    const handleChooseMonth = (e) => {
        const selectedMonth = e.target.value;
        setMonthChoose(selectedMonth);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result1 = await Get_Salary_Month(departmentChoose === 'all' ? '' : departmentChoose, monthChoose ? monthChoose : currentMonth, currentYear, currentPage);
            const result2 = await Get_Tracking_Time_Employee('', '');
            if(result1.status === 200 && result2.status === 200) {
                const salaryData = result1.data.results || [];
                const trackingData = result2.data.results || [];

                const mergeData = salaryData.map((salary)=> {
                    const tracking = trackingData.find(
                        (track) => track.employee?.employee_id === salary.employee?.employee_id
                    )

                    return {
                        employee_id: salary.employee?.employee_id,
                        full_name: salary.employee?.full_name,
                        department: salary.employee?.department,
                        base_salary: salary?.base_salary,
                        overtime_pay: salary?.overtime_pay,
                        attendance_bonus: salary?.attendance_bonus,
                        gross_salary: salary?.gross_salary,
                        working_days: tracking?.working_days || 0,
                        regular_hours: tracking?.regular_hours || 0,
                        overtime_hours: tracking?.overtime_hours || 0,
                        leave_days: tracking?.leave_days || 0,
                    };
                });

                setDataMain(mergeData);
                console.log(">>> SalaryData: ", salaryData);
                console.log(">>> TrakingData: ", trackingData);
                console.log("MergeData: ", mergeData);
                const total = Math.ceil(result1.data.totalRows / result1.data.page_size);
                setTotalPage(total);
                setTotalRows(result1.data.totalRows);
                setNextPage(result1.data.next_page);
                setPreviousPage(result1.data.previous_page);
            }
        }
        fetchData(); 
    }, [departmentChoose, monthChoose, currentMonth, currentYear, currentPage]);

    const roundNumber = (num, decimals = 2) => {
        return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
    };

    return (
        <div className={`${styles.request_staff} `}>
            <div className={`${styles.request_staff_wrapper} `}>
                <div className={`${styles.subtitle} `}>
                    <h3>BẢNG TỔNG KẾT LƯƠNG</h3>
                    <ButtonExport 
                        start={3} 
                        end={9} 
                        totalCol={10} 
                        totalCheck={true} 
                        nameFile={
                            monthChoose !== '' && departmentChoose !== ''
                            ? `BẢNG BÁO CÁO LƯƠNG THÁNG ${monthChoose} BỘ PHẬN ${departmentChoose.toUpperCase()}`
                            : `BẢNG BÁO CÁO LƯƠNG THÁNG ${currentMonth} NĂM ${currentYear}`
                        } 
                    />
                </div>
                <div className='d-flex gap-5'>
                    <div className={`${styles.select_department} `}>
                        <div className={`${styles.select_option} `}>
                            <select name="name-of-select" id="id-of-select" onChange={handleChooseDepartment}>
                                <option value="" disabled selected>Bộ phận làm việc</option>
                                <option value="all">Xem tất cả</option>
                                {departmentData.map((item, index) => (
                                    <option value={item.name} key={index}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={`${styles.select_department} `}>
                        <div className={`${styles.select_option} `}>
                            <select name="name-of-select" id="id-of-select" onChange={handleChooseMonth}>
                                <option value="" disabled selected>Tháng</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        Tháng {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <hr style={{ backgroundColor: ''}}></hr>
                <div className={`${styles.table} `}>
                    <div className={`${styles.table_info} `}>
                        <table className={`${styles.custom_table} `} role='table'>
                            <thead>
                                <tr>
                                    <th className={`${styles.id_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>MSNV</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.depart_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>PHÒNG BAN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.name_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TÊN NHÂN VIÊN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.regular_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ LÀM CHÍNH</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.salary_regular_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>LƯƠNG LÀM CHÍNH</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.overtime_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ LÀM THÊM</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.salary_overtime_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>LƯƠNG LÀM THÊM</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.bonus_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TIỀN THƯỞNG</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.total_hour_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TỔNG GIỜ LÀM</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.total_salary_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TỔNG LƯƠNG</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            {dataMain.length > 0 ?
                            <>
                                {dataMain.map((item) => {
                                    return (
                                        <tbody key={item.employee_id}>
                                            <tr>
                                                <td>
                                                    <span style={{ color: '#F19828', fontWeight: '500', fontSize: '12px' }}>{item.employee_id}</span>
                                                </td>
                                                <td>
                                                    <span>{item.department}</span>
                                                </td>
                                                <td>
                                                    <span>{item.full_name}</span>
                                                </td>
                                                <td>
                                                    <span>{item.regular_hours}</span>
                                                </td>
                                                <td>
                                                    <span>{item.base_salary}</span>
                                                </td>
                                                <td>
                                                    <span>{item.overtime_hours}</span>
                                                </td>
                                                <td>
                                                    <span>{item.overtime_pay}</span>
                                                </td>    
                                                <td>
                                                    <span>{item.attendance_bonus}</span>
                                                </td>    
                                                <td>
                                                    <span>{(+item.regular_hours || 0) + (+item.overtime_hours || 0)}</span>
                                                </td>  
                                                <td>
                                                    <span>{item.gross_salary}</span>
                                                </td>                                     
                                            </tr>
                                        </tbody> 
                                    )                               
                                })}
                                <tfoot>
                                    <tr>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span></span>
                                        </td>
                                        <td>
                                            <span>{roundNumber(dataMain.reduce((total, item) => total + (parseFloat(item.regular_hours) || 0), 0))}</span>
                                        </td>
                                        <td>
                                            <span>{roundNumber(dataMain.reduce((total, item) => total + (parseFloat(item.base_salary) || 0), 0))}</span>
                                        </td>
                                        <td>
                                            <span>{roundNumber(dataMain.reduce((total, item) => total + (parseFloat(item.overtime_hours) || 0), 0))}</span>
                                        </td>
                                        <td>
                                            <span>{roundNumber(dataMain.reduce((total, item) => total + (parseFloat(item.overtime_pay) || 0), 0))}</span>
                                        </td>
                                        <td>
                                            <span>{roundNumber(dataMain.reduce((total, item) => total + (parseFloat(item.attendance_bonus) || 0), 0))}</span>
                                        </td>
                                        <td>
                                            <span>{roundNumber(dataMain.reduce((total, item) => total + (parseFloat(item.regular_hours) || 0) + (parseFloat(item.overtime_hours) || 0), 0))}</span>
                                        </td>
                                        <td>
                                            <span>{roundNumber(dataMain.reduce((total, item) => total + (parseFloat(item.gross_salary) || 0), 0))}</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </>
                            :
                                <tbody>
                                    <td colSpan={8} className='text-center'>
                                        <NoResult/>
                                    </td>
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
            </div>
            {nextPage && previousPage !== null ?
                <div className={`${styles.paginnate} mt-5`}>
                    <PaginationComponent/>
                </div>
            :
                <></>
            }
        </div>
    );
};

export default Salary;