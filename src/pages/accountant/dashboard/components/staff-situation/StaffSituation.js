import React, { useEffect, useState } from 'react';
import styles from './StaffSituation.module.scss';
import TextareaAutosize from 'react-textarea-autosize';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';
import ButtonExport from '../../../../../components/ButtonExport/ButtonExport';
import { Get_DropDown_Department, Get_Tracking_Time_Employee } from '../../../../../apis/staffAPI';

const StaffSituation = () => {
    const [nextPage, setNextPage] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [departmentData, setDepartmentData] = useState([]);
    const [dataEmp, setDataEmp] = useState([]);
  
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage, totalRows);

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
                const result = await Get_Tracking_Time_Employee('', '');
                if(result.status === 200) {
                    setNextPage(result.data.next_page);
                    setDataEmp(result.data.results || []);
                }
            }
            fetchData();
        } catch(error) {
            console.log(error);
        }
    }, []);

    const handleChooseDepartment = async (e) => {
        try {
            const result = await Get_Tracking_Time_Employee(e.target.value, currentPage);
            if(result.status === 200) {
                const total = Math.ceil(result.data.totalRows / result.data.page_size);
                setTotalPage(total);
                setTotalRows(result.data.totalRows);
                setDataEmp(result.data.results || []);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={`${styles.request_staff} `}>
            <div className={`${styles.request_staff_wrapper} `}>
                <div className={`${styles.subtitle} `}>
                    <h3>Staff Management</h3>
                    <ButtonExport totalCol={12} totalCheck={false} nameFile={'Staff_Situation_Report'} />
                </div>
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
                <hr style={{ backgroundColor: ''}}></hr>
                <div className={`${styles.table} `}>
                    <div className={`${styles.table_info} `}>
                        <table className={`${styles.custom_table} `} role='table'>
                            <thead>
                                <tr>
                                    <th>
                                        <div className={`${styles.id_tb} `}>
                                            <span> MÃ NHÂN VIÊN</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.item_tb} `}>
                                            <span>BỘ PHẬN NHÂN SỰ</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.name_tb} `}>
                                            <span>TÊN NHÂN VIÊN</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.day_tb} `}>
                                            <span>NGÀY CÔNG TRONG THÁNG</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.hour_tb} `}>
                                            <span>GIỜ LÀM CHÍNH</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.hour_tb} `}>
                                            <span>GIỜ LÀM THÊM</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.day_off_tb} `}>
                                            <span>NGÀY NGHỈ PHÉP</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.total_tb} `}>
                                            <span>TỔNG SỐ GIỜ LÀM</span>
                                        </div>
                                    </th>

                                    {/* <th>
                                        <div className={`${styles.status} `}>
                                            <span>TÌNH TRẠNG CHẤM CÔNG</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.evalute_tb} `}>
                                            <span>ĐÁNH GIÁ</span>
                                        </div>
                                    </th> */}

                                    <th>
                                        <div className={`${styles.note_tb} `}>
                                            <span>GHI CHÚ</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            {dataEmp.length > 0 ?
                            <>
                                {dataEmp.map((item, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <span style={{ color: '#F19828', fontWeight: '500' }}>{item.employee_id}</span>
                                                </td>
                                                <td>
                                                    <span>{item.department}</span>
                                                </td>
                                                <td>
                                                    <span>{item.full_name}</span>
                                                </td>
                                                <td>
                                                    <span>{item.working_days ?? 0}</span>
                                                </td>
                                                <td>
                                                    <span>{item.regular_hours ?? 0}</span>
                                                </td>
                                                <td>
                                                    <span>{item.overtime_hours ?? 0}</span>
                                                </td>    
                                                <td>
                                                    <span>{item.leave_days ?? 0}</span>
                                                </td>   
                                                <td>
                                                    <span>{(+item.regular_hours || 0) + (+item.overtime_hours || 0)}</span>
                                                </td>   
                                                {/* <td>
                                                    <span>{item.status}</span>
                                                </td>   
                                                <td>
                                                    <span>{item.evalute}</span>
                                                </td>    */}
                                                <td>
                                                    <TextareaAutosize
                                                        minRows={1}
                                                        maxRows={10}
                                                        placeholder="..."
                                                        className="your-textarea-class"
                                                    />
                                                </td>                                           
                                            </tr>
                                        </tbody> 
                                    )                               
                                })}
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

            {nextPage !== null ?
                <div className={`${styles.paginnate} mt-5`}>
                    <PaginationComponent/>
                </div>
            :
                <></>
            }
        </div>
    );
};

export default StaffSituation;