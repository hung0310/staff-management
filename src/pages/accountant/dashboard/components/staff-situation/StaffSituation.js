import React, { useState } from 'react';
import styles from './StaffSituation.module.scss';
import TextareaAutosize from 'react-textarea-autosize';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';
import ButtonExport from '../../../../../components/ButtonExport/ButtonExport';

const mockDatas = [
    {em_id: '#EMP : 00001', em_item: 'Marketing',em_name: 'Nguyễn Văn A', date: '26/10/2024', day: '22', hour: '205', day_off: '1', total: '205', status: 'Trễ giờ 1 lần', evalute: 'Khá'},
    {em_id: '#EMP : 00002', em_item: 'Hành chính, nhân sự', em_name: 'Nguyễn Văn B', date: '26/10/2024', day: '22', hour: '205', day_off: '0', total: '205',status: 'Đúng giờ', evalute: 'Tốt'},
    {em_id: '#EMP : 00003', em_item: 'Tài chính, kế toán', em_name: 'Nguyễn Văn C', date: '26/10/2024', day: '22', hour: '205', day_off: '1', total: '205',status: 'Trễ giờ 1 lần', evalute: 'Khá'},
    {em_id: '#EMP : 00004', em_item: 'Sale', em_name: 'Nguyễn Văn D', date: '26/10/2024', day: '22', hour: '205', day_off: '1', total: '205',status: 'Trễ giờ 1 lần', evalute: 'Khá'},
    {em_id: '#EMP : 00005', em_item: 'Kỹ Thuật, sản xuất', em_name: 'Nguyễn Văn E', date: '26/10/2024', day: '22', hour: '205', day_off: '1', total: '205',status: 'Trễ giờ 1 lần', evalute: 'Khá'},
]

const StaffSituation = () => {
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
  
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage);

    return (
        <div className={`${styles.request_staff} `}>
            <div className={`${styles.request_staff_wrapper} `}>
                <div className={`${styles.subtitle} `}>
                    <h3>Staff Management</h3>
                    <ButtonExport totalCol={12} totalCheck={false} nameFile={'Staff_Situation_Report'} />
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
                                            <span>PHÒNG BAN</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.name_tb} `}>
                                            <span>TÊN NHÂN VIÊN</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.date_tb} `}>
                                            <span>NGÀY VÀO LÀM</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.day_tb} `}>
                                            <span>NGÀY CÔNG TRONG THÁNG</span>
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

                                    <th>
                                        <div className={`${styles.status} `}>
                                            <span>TÌNH TRẠNG CHẤM CÔNG</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.evalute_tb} `}>
                                            <span>ĐÁNH GIÁ</span>
                                        </div>
                                    </th>

                                    <th>
                                        <div className={`${styles.note_tb} `}>
                                            <span>GHI CHÚ</span>
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
                                                    <span>{item.em_item}</span>
                                                </td>
                                                <td>
                                                    <span>{item.em_name}</span>
                                                </td>
                                                <td>
                                                    <span>{item.date}</span>
                                                </td>
                                                <td>
                                                    <span>{item.day}</span>
                                                </td>
                                                <td>
                                                    <span>{item.hour}</span>
                                                </td>    
                                                <td>
                                                    <span>{item.day_off}</span>
                                                </td>   
                                                <td>
                                                    <span>{item.total}</span>
                                                </td>   
                                                <td>
                                                    <span>{item.status}</span>
                                                </td>   
                                                <td>
                                                    <span>{item.evalute}</span>
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
        </div>
    );
};

export default StaffSituation;