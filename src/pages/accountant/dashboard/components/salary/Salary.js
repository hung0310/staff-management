import React, { useEffect, useState } from 'react';
import styles from './Salary.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';
import ButtonExport from '../../../../../components/ButtonExport/ButtonExport';
import { Get_DropDown_Department, Get_Salary_Month } from '../../../../../apis/staffAPI';

const Salary = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [departmentData, setDepartmentData] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage);
    const [dataSalary, setDataSalary] = useState([]);
    const [monthChoose, setMonthChoose] = useState('');

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

    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await Get_Salary_Month('', '', '', '');
                if(result.status === 200) {
                    setNextPage(result.data.next_page);
                    setPreviousPage(result.data.previous_page);
                    setDataSalary(result.data.results || []);
                }
            }
            fetchData();
        } catch(error) {
            console.log(error);
        }
    }, []);

    const handleChooseDepartment = async (e) => {
        try {
            
        } catch(error) {
            console.log(error);
        }
    }

    const handleChooseMonth = async (e) => {
        try {
            const selectedMonth = e.target.value;
            setMonthChoose(selectedMonth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`${styles.request_staff} `}>
            <div className={`${styles.request_staff_wrapper} `}>
                <div className={`${styles.subtitle} `}>
                    <h3>BẢNG TỔNG KẾT LƯƠNG</h3>
                    <ButtonExport start={3} end={7} totalCol={8} totalCheck={true} nameFile={`BẢNG BÁO CÁO LƯƠNG THÁNG ${monthChoose}`} />
                </div>
                <div className='d-flex gap-5'>
                    <div className={`${styles.select_department} `}>
                        <div className={`${styles.select_option} `}>
                            <select name="name-of-select" id="id-of-select" onChange={handleChooseDepartment}>
                                <option value="" disabled selected>Bộ phận nhân sự</option>
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
                                            <span>BỘ PHẬN NHÂN SỰ</span>
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
                                            <span>TỔNG SỐ GIỜ LÀM</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.total_salary_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TỔNG LƯƠNG</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            {dataSalary.length > 0 ?
                            <>
                                {dataSalary.map((item, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <span style={{ color: '#F19828', fontWeight: '500', fontSize: '12px' }}>{item.em_id}</span>
                                                </td>
                                                <td>
                                                    <span>{item.em_item}</span>
                                                </td>
                                                <td>
                                                    <span>{item.em_name}</span>
                                                </td>
                                                <td>
                                                    <span>{item.regular}</span>
                                                </td>
                                                <td>
                                                    <span>{item.overtime}</span>
                                                </td>
                                                <td>
                                                    <span>{item.total_hour}</span>
                                                </td>
                                                <td>
                                                    <span>{item.day_off}</span>
                                                </td>    
                                                <td>
                                                    <span>{item.bonuses}</span>
                                                </td>    
                                                <td>
                                                    <span>{item.salary}</span>
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
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
                                        </td>
                                        <td>
                                            <span>TOTAL</span>
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