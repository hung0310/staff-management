import React, { useState } from 'react';
import styles from './StaffManagement.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';
import ModalStaffManagement from '../../../../../common/ModalStaffManagement/ModalStaffManagement';
import ModalDelete from '../../../../../common/ModalDelete/ModalDelete';

const mockDatas = [
    {em_id: '#EMP : 00001', em_item: 'Marketing',em_name: 'Nguyễn Văn A', date: '26/10/2024', from: 'Hà Nội'},
    {em_id: '#EMP : 00002', em_item: 'Hành chính, nhân sự', em_name: 'Nguyễn Văn B', date: '26/10/2024', from: 'Hà Nội'},
    {em_id: '#EMP : 00003', em_item: 'Tài chính, kế toán', em_name: 'Nguyễn Văn C', date: '26/10/2024', from: 'Đà Nẵng'},
    {em_id: '#EMP : 00004', em_item: 'Sale', em_name: 'Nguyễn Văn D', date: '26/10/2024', from: 'Đà Nẵng'},
    {em_id: '#EMP : 00005', em_item: 'Kỹ Thuật, sản xuất', em_name: 'Nguyễn Văn E', date: '26/10/2024', from: 'Thành phố Hồ Chí Minh'},
]

const StaffManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalDele, setShowModalDele] = useState(false);
    const [modalData, setModalData] = useState({});
    const [nameModal, setNameModal] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
  
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
                                            <span>EMPLOYEE ID</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.item_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>ITEM</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.name_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>EMPLOYEE NAME</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.date_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>DATE START</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.from_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>FROM</span>
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
                                                    <span>{item.em_item}</span>
                                                </td>
                                                <td>
                                                    <span>{item.em_name}</span>
                                                </td>
                                                <td>
                                                    <span>{item.date}</span>
                                                </td>
                                                <td>
                                                    <span>{item.from}</span>
                                                </td>
                                                <td>
                                                    <div className={`${styles.custom_btn} `}>
                                                        <span className={`${styles.edit} `}>
                                                            <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleClick_AddStaff(item)}/>
                                                        </span>
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
            />
        </div>
    );
};

export default StaffManagement;