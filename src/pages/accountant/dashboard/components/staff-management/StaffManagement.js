import React, { useEffect, useState } from 'react';
import styles from './StaffManagement.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { UseToast } from '../../../../../hooks/ToastProvider';
import NoResult from '../../../../../common/NoResult/NoResult';
import { useReactPaginate } from '../../../../../common/Pagination/useReactPaginate';
import ModalStaffManagement from '../../../../../common/ModalStaffManagement/ModalStaffManagement';
import ModalDelete from '../../../../../common/ModalDelete/ModalDelete';
import { Delete_Account_Emp, Get_DropDown_Department, Get_List_Employee } from '../../../../../apis/staffAPI';

const StaffManagement = () => {
    const { showToast } = UseToast();
    const [showModal, setShowModal] = useState(false);
    const [showModalDele, setShowModalDele] = useState(false);
    const [modalData, setModalData] = useState({});
    const [nameModal, setNameModal] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [dataEmp, setDataEmp] = useState([]);
    const [isSubmitDelete, setIsSubmitDelete] = useState(false);
    const [idEmp, setIdEmp] = useState('');
    const [departmentData, setDepartmentData] = useState([]);
  
    const { currentPage, PaginationComponent } = useReactPaginate(totalPage, totalRows);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await Get_List_Employee('', '');
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
    }, [setDataEmp]);

    const handleClick_AddStaff = (_item) => {
        setModalData(_item);
        setNameModal('Thêm thông tin nhân viên');
        setShowModal(true);
    }

    const handleClick_Delete = (id) => {
        setShowModalDele(true);
        setIdEmp(id);
    }

    useEffect(() => {
        if(isSubmitDelete) {
            const fetchData = async () => {
                const result = await Delete_Account_Emp(idEmp);
                if(result.status === 200) {
                    showToast("Thông tin nhân viên đã được xóa thành công!", "success");
                    setIsSubmitDelete(false);
                    setIdEmp('');
                }
            };
            fetchData();
        }
    }, [isSubmitDelete]);

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

    const handleChooseDepartment = async (e) => {
        try {
            const depart = e.target.value;
            const result = await Get_List_Employee(depart === 'all' ? '' : depart, currentPage);
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
                    <h3>Thông tin nhân viên</h3>
                    <button className={`${styles.btn_add_staff} `} onClick={handleClick_AddStaff}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                        &nbsp;&nbsp;Thêm nhân viên
                    </button>
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

                                    <th className={`${styles.name_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TÊN NHÂN VIÊN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.depart_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>PHÒNG BAN</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.position_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>CHỨC VỤ</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.date_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>NGÀY BẮT ĐẦU</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.email_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>EMAIL</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.gender_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>GIỚI TÍNH</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.phone_number_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>SỐ ĐIỆN THOẠI</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.address_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>ĐỊA CHỈ</span>
                                        </div>
                                    </th>

                                    <th className={`${styles.action_tb} `}>
                                        <div className={`${styles.title} `}>
                                            <span>TÙY CHỌN</span>
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
                                                    <span style={{ color: '#F19828', fontWeight: '500', fontSize: '12px' }}>{item.employee_id}</span>
                                                </td>

                                                <td>
                                                    <span>{item.full_name}</span>
                                                </td>

                                                <td>
                                                    <span>{item.department}</span>
                                                </td>

                                                <td>
                                                    <span>{item.position}</span>
                                                </td>

                                                <td>
                                                    <span>{item.join_date.split('-').reverse().join('/')}</span>
                                                </td>

                                                <td>
                                                    <span>{item.email}</span>
                                                </td>

                                                <td>
                                                    <span>{item.gender}</span>
                                                </td>

                                                <td>
                                                    <span>{item.phone_number}</span>
                                                </td>

                                                <td>
                                                    <span>{item.address}</span>
                                                </td>

                                                <td>
                                                    <div className={`${styles.custom_btn} `}>
                                                        <span className={`${styles.delete} `}>
                                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => handleClick_Delete(item.employee_id)}/>
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

            {nextPage && previousPage !== null ?
                <div className={`${styles.paginnate} mt-5`}>
                    <PaginationComponent/>
                </div>
            :
                <></>
            }

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
                setIsButton={setIsSubmitDelete}
                content={'Bạn có chắc chắn muốn xóa nhân viên này không?'}
                style={{
                    backgroundColor: '#ff4646'
                }}
            />
        </div>
    );
};

export default StaffManagement;