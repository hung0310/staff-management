import React, { useState } from 'react';
import styles from './LeaveRequest.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faClock, faFileLines } from '@fortawesome/free-solid-svg-icons';

import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';

const mockDatas = [
    {em_id: '#EMP : 00001', em_name: 'Nguyễn Văn A', leave_type: 'Xin nghỉ phép'},
    {em_id: '#EMP : 00002', em_name: 'Nguyễn Văn B', leave_type: 'Xin nghỉ phép'},
    {em_id: '#EMP : 00003', em_name: 'Nguyễn Văn C', leave_type: 'Làm thêm giờ'},
    {em_id: '#EMP : 00004', em_name: 'Nguyễn Văn D', leave_type: 'Làm thêm giờ'},
    {em_id: '#EMP : 00005', em_name: 'Nguyễn Văn E', leave_type: 'Làm thêm giờ'},
]

const LeaveRequest = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
  
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage);

    return (
        <div className={`${styles.request_staff} `}>
            <div className={`${styles.request_staff_wrapper} `}>
                <div className={`${styles.subtitle} `}>
                    <h3>Leave Request</h3>
                </div>
                <hr style={{ backgroundColor: ''}}></hr>
                <div className={`${styles.table} `}>
                    <div className={`${styles.table_info} `}>
                        <table className={`${styles.custom_table} `} role='table'>
                            <thead>
                                <tr>
                                    <th className={`${styles.id_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>EMPLOYEE ID</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.name_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>EMPLOYEE NAME</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.type_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>LEAVE TYPE</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.file_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>LEAVE APPLICATION</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.action_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>ACTION</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            {mockDatas.length > 0 ?
                            <>
                                {mockDatas.map((item, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <span style={{ color: '#F19828', fontWeight: '500' }}>{item.em_id}</span>
                                                </td>
                                                <td>
                                                    <span>{item.em_name}</span>
                                                </td>
                                                <td>
                                                    <span>{item.leave_type}</span>
                                                </td>
                                                <td>
                                                    <span>
                                                        {
                                                            item.leave_type === 'Xin nghỉ phép'
                                                        ?
                                                            <a href='/demo_xin_phep.pdf' target='_blank'>
                                                                <FontAwesomeIcon icon={faFileLines}/>
                                                            </a>
                                                        :
                                                            <FontAwesomeIcon icon={faClock} />
                                                        }
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className={`${styles.custom_btn} `}>
                                                        <span className={`${styles.approve} `}>
                                                            <FontAwesomeIcon icon={faCircleCheck} />
                                                        </span>
                                                        <span className={`${styles.denial} `}>
                                                            <FontAwesomeIcon icon={faCircleXmark} />
                                                        </span>
                                                    </div>
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
            <div className={`${styles.paginnate} mt-5`}>
                <PaginationComponent/>
            </div>
        </div>
    );
};

export default LeaveRequest;