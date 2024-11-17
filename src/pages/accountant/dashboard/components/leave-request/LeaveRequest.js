import React, { useState } from 'react';
import styles from './LeaveRequest.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faClock, faFileLines } from '@fortawesome/free-solid-svg-icons';

import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';

const mockDatas = [
    {em_id: '00001', depart_em: 'Chuyên viên tư vấn', em_name: 'Nguyễn Văn A', time_em: '17/11 - 18/11', note_em: 'Có việc đột xuất. Mong đơn được duyệt ạ!'},
    {em_id: '00001', depart_em: 'Chuyên viên tư vấn', em_name: 'Nguyễn Văn A', time_em: '17/11 - 18/11', note_em: 'Có việc đột xuất. Mong đơn được duyệt ạ!'},
    {em_id: '00001', depart_em: 'Chuyên viên tư vấn', em_name: 'Nguyễn Văn A', time_em: '17/11 - 18/11', note_em: 'Có việc đột xuất. Mong đơn được duyệt ạ!'},
    {em_id: '00001', depart_em: 'Chuyên viên tư vấn', em_name: 'Nguyễn Văn A', time_em: '17/11 - 18/11', note_em: 'Có việc đột xuất. Mong đơn được duyệt ạ!'},
    {em_id: '00001', depart_em: 'Chuyên viên tư vấn', em_name: 'Nguyễn Văn A', time_em: '17/11 - 18/11', note_em: 'Có việc đột xuất. Mong đơn được duyệt ạ!'},
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
                                            <span>MSNV</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.depart_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>BỘ PHẬN LÀM VIỆC</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.name_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TÊN NHÂN VIÊN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.time_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>THỜI GIAN NGHỈ PHÉP</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.note_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GHI CHÚ</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.file_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>MINH CHỨNG</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.action_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TÙY CHỌN</span>
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
                                                    <span style={{ color: '#F19828', fontWeight: '500', fontSize: '12px' }}>{item.em_id}</span>
                                                </td>

                                                <td>
                                                    <span>{item.depart_em}</span>
                                                </td>

                                                <td>
                                                    <span>{item.em_name}</span>
                                                </td>

                                                <td>
                                                    <span>{item.time_em}</span>
                                                </td>

                                                <td>
                                                    <span>{item.note_em}</span>
                                                </td>

                                                <td>
                                                    <span>
                                                        <a href='/demo_xin_phep.pdf' target='_blank'>
                                                            <FontAwesomeIcon icon={faFileLines}/>
                                                        </a>
                                                        {/* {
                                                            item.leave_type === 'Xin nghỉ phép'
                                                        ?
                                                            <a href='/demo_xin_phep.pdf' target='_blank'>
                                                                <FontAwesomeIcon icon={faFileLines}/>
                                                            </a>
                                                        :
                                                            <FontAwesomeIcon icon={faClock} />
                                                        } */}
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