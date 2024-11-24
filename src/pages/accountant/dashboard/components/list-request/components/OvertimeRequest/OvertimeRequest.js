import React, { useEffect, useState } from 'react';
import styles from './OvertimeRequest.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faFileLines } from '@fortawesome/free-solid-svg-icons';
import NoResult from '../../../../../../../common/NoResult/NoResult';
import { UseToast } from '../../../../../../../hooks/ToastProvider';
import { Approve_Overtime_Request, List_Overtime_Request_Manager, Reject_Overtime_Request } from '../../../../../../../apis/staffAPI';
import { useReactPaginate } from '../../../../../../../common/Pagination/useReactPaginate';
import ModalDelete from '../../../../../../../common/ModalDelete/ModalDelete';

const OvertimeRequest = () => {
    const { showToast } = UseToast();
    const [dataLeave, setDataLeave] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [contentModal, setContentModal] = useState('');
    const [showModalDele, setShowModalDele] = useState(false);
    const [isSubmitApprove, setIsSubmitApprove] = useState(false);
    const [isSubmitReject, setIsSubmitReject] = useState(false);
    const [idRequest, setIdRequest] = useState('');
  
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage, totalRows);

    const fetchDataRequest = async () => {
        try {
            const result = await List_Overtime_Request_Manager(currentPage);
            if(result.status === 200) {
                const total = Math.ceil(result.data.totalRows / result.data.page_size);
                setNextPage(result.data.next_page);
                setPreviousPage(result.data.previous_page);
                setTotalPage(total);
                setTotalRows(result.data.totalRows);
                setDataLeave(result.data.results || []);
            }
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDataRequest();
    }, [currentPage]);

    const handleApprove = (id) => {
        setIdRequest(id);
        setContentModal('Bạn có chắc chắn muốn duyệt yêu cầu này không?');
        setShowModalDele(true);
    }

    const handleReject = (id) => {
        setIdRequest(id);
        setContentModal('Bạn có chắc chắn muốn từ chối yêu cầu này không?');
        setShowModalDele(true);
    }

    useEffect(() => {
        if(isSubmitApprove) {
            try {
                const fetchData = async () => {
                    const result = await Approve_Overtime_Request({overtime_request_id: idRequest});
                    if(result.status === 200) {
                        showToast("Yêu cầu đã được duyệt thành công!", "success");
                        fetchDataRequest();
                    }
                };
                fetchData();
            } catch(error) {
                console.log(error);
            }
        }
    }, [isSubmitApprove]);

    useEffect(() => {
        if(isSubmitReject) {
            try {
                const fetchData = async () => {
                    const result = await Reject_Overtime_Request({overtime_request_id: idRequest});
                    if(result.status === 200) {
                        showToast("Yêu cầu đã bị từ chối!", "success");
                        fetchDataRequest();
                    }
                };
                fetchData();
            } catch(error) {
                console.log(error);
            }
        }
    }, [isSubmitReject]);

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

                                    <th className={`${styles.day_work_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>NGÀY ĐĂNG KÝ</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.from_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>BẮT ĐẦU TỪ</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.to_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>ĐẾN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.status_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TRẠNG THÁI</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.note_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GHI CHÚ</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.action_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TÙY CHỌN</span>
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
                                                    <span style={{ color: '#F19828', fontWeight: '500', fontSize: '12px' }}>{item.employee.employee_id}</span>
                                                </td>

                                                <td>
                                                    <span>{item.employee.department}</span>
                                                </td>

                                                <td>
                                                    <span>{item.employee.full_name}</span>
                                                </td>

                                                <td>
                                                    <span>{item.date.split('-').reverse().join('/')}</span>
                                                </td>

                                                <td>
                                                    <span>{item.from_time}</span>
                                                </td>

                                                <td>
                                                    <span>{item.to_time}</span>
                                                </td>

                                                <td>
                                                    <span>{item.status}</span>
                                                </td>

                                                <td>
                                                    <span>{item.note}</span>
                                                </td>    

                                                <td>
                                                    <div className={`${styles.custom_btn} `}>
                                                        <span className={`${styles.approve} `}>
                                                            <FontAwesomeIcon icon={faCircleCheck} onClick={() => handleApprove(item.id)}/>
                                                        </span>
                                                        <span className={`${styles.denial} `}>
                                                            <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleReject(item.id)}/>
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
                {nextPage && previousPage !== null ?
                    <div className={`${styles.paginnate} mt-5`}>
                        <PaginationComponent/>
                    </div>
                :
                    <></>
                }
            </div>

            <ModalDelete
                show={showModalDele}
                onHide={() => setShowModalDele(false)}
                content={contentModal}
                style={{
                    backgroundColor: contentModal === 'Bạn có chắc chắn muốn từ chối yêu cầu này không?' 
                        ? '#ff4646' 
                        : '#2B85EC'
                }}
                setIsButton={
                    contentModal === 'Bạn có chắc chắn muốn từ chối yêu cầu này không?' 
                        ? setIsSubmitReject
                        : setIsSubmitApprove
                }
            />
        </div>
    );
};

export default OvertimeRequest;