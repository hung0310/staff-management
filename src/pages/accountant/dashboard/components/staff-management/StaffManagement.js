import React, { useEffect, useState } from 'react';
import styles from './StaffManagement.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';
import ModalStaffManagement from '../../../../../common/ModalStaffManagement/ModalStaffManagement';
import ModalDelete from '../../../../../common/ModalDelete/ModalDelete';

const mockDatas = [
    {em_id: '#EMP : 00001', em_item: 'Marketing',em_name: 'Nguyễn Văn A', phone_number: '0868155371', from: 'Hà Nội', email: 'nth0626zz@gmail.com', date: '26/10/2024'},
    {em_id: '#EMP : 00001', em_item: 'Marketing',em_name: 'Nguyễn Văn A', phone_number: '0868155371', from: 'Hà Nội', email: 'nth0626zz@gmail.com', date: '26/10/2024'},
    {em_id: '#EMP : 00001', em_item: 'Marketing',em_name: 'Nguyễn Văn A', phone_number: '0868155371', from: 'Hà Nội', email: 'nth0626zz@gmail.com', date: '26/10/2024'},
    {em_id: '#EMP : 00001', em_item: 'Marketing',em_name: 'Nguyễn Văn A', phone_number: '0868155371', from: 'Hà Nội', email: 'nth0626zz@gmail.com', date: '26/10/2024'},
    {em_id: '#EMP : 00001', em_item: 'Marketing',em_name: 'Nguyễn Văn A', phone_number: '0868155371', from: 'Bà Rịa Vũng Tàu', email: 'nth0626zz@gmail.com', date: '26/10/2024'},
]

const StaffManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalDele, setShowModalDele] = useState(false);
    const [modalData, setModalData] = useState({});
    const [nameModal, setNameModal] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [dataEmp, setDataEmp] = useState([]);
  
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage);

    const handleClick_AddStaff = (_item) => {
        if(_item.em_id) {
            setModalData(_item);
            setNameModal('Chỉnh sửa thông tin nhân viên');
        } else {
            setModalData({});
            setNameModal('Thêm thông tin nhân viên');
        }
        setShowModal(true);
    }

    const handleClick_Delete = () => {
        setShowModalDele(true);
    }

    return (
        <div className={`${styles.request_staff} `}>
            <div className={`${styles.request_staff_wrapper} `}>
                <div className={`${styles.subtitle} `}>
                    <h3>Staff Management</h3>
                    <button className={`${styles.btn_add_staff} `} onClick={handleClick_AddStaff}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                        &nbsp;&nbsp;Thêm nhân viên
                    </button>
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
                                            <span>BỘ PHẬN LÀM VIỆC</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.name_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TÊN NHÂN VIÊN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.number_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>SỐ ĐIỆN THOẠI</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.from_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>QUÊ QUÁN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.email_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>EMAIL</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.date_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>NGÀY BẮT ĐẦU</span>
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
                                                    <span>{item.em_item}</span>
                                                </td>

                                                <td>
                                                    <span>{item.em_name}</span>
                                                </td>

                                                <td>
                                                    <span>{item.phone_number}</span>
                                                </td>

                                                <td>
                                                    <span>{item.from}</span>
                                                </td>

                                                <td>
                                                    <span>{item.email}</span>
                                                </td>

                                                <td>
                                                    <span>{item.date}</span>
                                                </td>

                                                <td>
                                                    <div className={`${styles.custom_btn} `}>
                                                        <span className={`${styles.delete} `}>
                                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => handleClick_Delete()}/>
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

            <ModalStaffManagement 
                show={showModal}
                onHide={() => setShowModal(false)}
                modalData={modalData}
                setModalData={setModalData}
                title={nameModal}
            />

            <ModalDelete
                show={showModalDele}
                onHide={() => setShowModalDele(false)}
                content={'Bạn có chắc chắn muốn xóa nhân viên này không?'}
                style={{
                    backgroundColor: '#ff4646'
                }}
            />
        </div>
    );
};

export default StaffManagement;