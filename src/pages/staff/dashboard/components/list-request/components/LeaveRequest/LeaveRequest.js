import React, { useEffect, useState } from 'react';
import styles from './LeaveRequest.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import NoResult from '../../../../../../../common/NoResult/NoResult';

import { List_Leave_Request } from '../../../../../../../apis/staffAPI';
import { useReactPaginate } from '../../../../../../../common/Pagination/useReactPaginate';

const LeaveRequest = () => {
    const [dataLeave, setDataLeave] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
  
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage, totalRows);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await List_Leave_Request(currentPage);
                if(result.status === 200) {
                    const total = Math.ceil(result.data.totalRows / result.data.page_size);
                    setTotalPage(total);
                    setTotalRows(result.data.totalRows);
                    setDataLeave(result.data.results || []);
                }
            } catch(error) {
                console.log(error);
            }
        };
        fetchData();
    }, [setDataLeave]);

    return (
        <div className={`${styles.leave_list} `}> 
            <div className={`${styles.leave_list_container} `}>
                <div className={`${styles.table} `}>
                    <div className={`${styles.table_info} `}>
                        <table className={`${styles.custom_table} `} role='table'>
                            <thead>
                                <tr>
                                    <th className={`${styles.order_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>STT</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.from_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>NGHỈ TỪ NGÀY</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.to_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>ĐẾN NGÀY</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.status_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TRẠNG THÁI</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.file_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>MINH CHỨNG</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.note_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GHI CHÚ</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            {dataLeave.length > 0 ?
                            <>
                                {dataLeave.map((item, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td>
                                                    <span style={{ color: '#F19828', fontWeight: '500', fontSize: '12px' }}>{index + 1}</span>
                                                </td>

                                                <td>
                                                    <span>{item.from_date}</span>
                                                </td>

                                                <td>
                                                    <span>{item.to_date}</span>
                                                </td>

                                                <td>
                                                    <span>{item.status}</span>
                                                </td>

                                                <td>
                                                    <span>
                                                        <a href={item.attachments} target='_blank'>
                                                            <FontAwesomeIcon icon={faFileLines}/>
                                                        </a>
                                                    </span>
                                                </td> 

                                                <td>
                                                    <span>{item.note}</span>
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
                <div className={`${styles.paginnate} mt-5`}>
                    <PaginationComponent/>
                </div>
            </div>
        </div>
    );
};

export default LeaveRequest;