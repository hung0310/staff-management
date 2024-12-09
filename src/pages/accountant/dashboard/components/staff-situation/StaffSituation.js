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
    const [previousPage, setPreviousPage] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [departmentData, setDepartmentData] = useState([]);
    const [dataEmp, setDataEmp] = useState([]);
    const [departmentFile, setDepartmentFile] = useState('');
    const [content, setContent] = useState('');
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage, totalRows);

    const handleBlur = (e) => {
      setContent(e.target.innerText);
    };

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
                    setPreviousPage(result.data.previous_page);
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
            const nameFile = e.target.value.toUpperCase();
            setDepartmentFile(nameFile);

            const depart = e.target.value;
            const result = await Get_Tracking_Time_Employee(depart === 'all' ? '' : depart, currentPage);
            if(result.status === 200) {
                const total = Math.ceil(result.data.totalRows / result.data.page_size);
                setTotalPage(total);
                setTotalRows(result.data.totalRows);
                setNextPage(result.data.next_page);
                setPreviousPage(result.data.previous_page);
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
                    <ButtonExport totalCol={9} totalCheck={false} 
                        nameFile={departmentFile !== '' ? `BẢNG BÁO CÁO TÌNH HÌNH NHÂN SỰ BỘ PHẬN ${departmentFile}` : 'BẢNG BÁO CÁO TÌNH HÌNH NHÂN SỰ'} />
                </div>
                <div className={`${styles.select_department} `}>
                    <div className={`${styles.select_option} `}>
                        <select name="name-of-select" id="id-of-select" onChange={handleChooseDepartment}>
                            <option value="" disabled selected>Bộ phận nhân sự</option>
                            <option value="all">Xem tất cả</option>
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
                                    <th className={`${styles.id_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>MSNV</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.item_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>PHÒNG BAN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.name_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TÊN NHÂN VIÊN</span>
                                        </div>
                                    </th> 

                                    <th className={`${styles.day_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>NGÀY CÔNG</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.hour_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ LÀM CHÍNH</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.hour_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỜ LÀM THÊM</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.day_off_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>NGÀY NGHỈ PHÉP</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.total_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TỔNG GIỜ LÀM</span>
                                        </div>
                                    </th>

                                    {/* <th>
                                        <div className={`${styles.status} `}>
                                            <span>TÌNH TRẠNG CHẤM CÔNG</span>
                                        </div>
                                    </th> */}

                                    <th className={`${styles.evalute_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>ĐÁNH GIÁ</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.note_tb} `}>
                                        <div className={`${styles.title} `}>
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
                                                    <span style={{ color: '#F19828', fontWeight: '500', fontSize: '12px' }}>{item.employee.employee_id}</span>
                                                </td>
                                                <td>
                                                    <span>{item.employee.department}</span>
                                                </td>
                                                <td>
                                                    <span>{item.employee.full_name}</span>
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
                                                </td>    */}
                                                <td>
                                                    <TextareaAutosize
                                                        className={`${styles.textarea_evalute} `}
                                                        minRows={1}
                                                        maxRows={2}
                                                        placeholder="..."
                                                        value={item.content}
                                                    />
                                                </td>    
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

export default StaffSituation;