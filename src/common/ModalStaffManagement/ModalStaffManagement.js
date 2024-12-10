import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { parse } from "date-fns";
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { format } from "date-fns";
import styles from './ModalStaffManagement.module.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { UseToast } from '../../hooks/ToastProvider';
import { Create_Account_Emp, Get_DropDown_Department, Get_DropDown_Position } from '../../apis/staffAPI';

const loginSchemas = Yup.object().shape({
    name: Yup.string().required('⚠ Vui lòng nhập tên nhân viên'),
    location: Yup.string().required('⚠ Vui lòng nhập địa chỉ'),
    date_join: Yup.string().required('⚠ Vui lòng nhập ngày bắt đầu làm việc'),
    email: Yup.string().required('⚠ Vui lòng nhập email nhân viên'),
    department: Yup.string().required('⚠ Vui lòng chọn bộ phận làm việc'),
    position: Yup.string().required('⚠ Vui lòng chọn chức vụ'),
    username: Yup.string().required('⚠ Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('⚠ Vui lòng nhập mật khẩu'),
});

const ModalStaffManagement = (props) => {
    const { show, onHide, title, isSubmit, modalData, setModalData, ...otherProps } = props;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [departmentData, setDepartmentData] = useState([]);
    const [positiontData, setPositiontData] = useState([]);
    const { showToast } = UseToast();

    // useEffect(() => {
    //     if (modalData.date) {
    //         setSelectedDate(parse(modalData.date, "dd/MM/yyyy", new Date()));
    //     } else {
    //         setSelectedDate(new Date());
    //     }
    // }, [modalData.date]);

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
                const result = await Get_DropDown_Position();
                if(result.status === 200) {
                    setPositiontData(result.data);
                }
            }
            fetchData();
        } catch(error) {
            console.log(error);
        }
    }, [setDepartmentData]);
    
    const handleSubmit = async (values) => {
        const formattedDate = format(new Date(values.date_join), "yyyy-MM-dd");
        const data = {
            user : {
                email: values.email,
                username: values.username,
                password: values.password
            },
            department_id: values.department,
            position_id: values.position,
            full_name: values.name,
            address: values.location,
            join_date: formattedDate
        }
        console.log(data);
        try {
            const result = await Create_Account_Emp(data);
            if(result.status === 201) {
                showToast("Thêm thông tin nhân viên thành công!", "success");
                onHide();
            }
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            {...otherProps}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ borderRadius: '10px !important' }}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className={`${styles.title} `}>
                        <h4>{title}</h4>
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className={`${styles.body_modal} `}>
                    <Formik
                        initialValues={{
                            name: modalData.em_name || '',
                            location: modalData.from || '',
                            date_join: selectedDate.toString() || '',
                            email: modalData.em_name || '',
                            department: modalData.em_item || '',
                            position: modalData.em_item || '',
                            username: '',
                            password: '12345678'
                        }}
                        validationSchema={loginSchemas}
                        onSubmit={handleSubmit}
                        >
                        {({ isSubmitting, values, setSubmitting, setFieldValue }) => (
                            <Form>
                                <div className={`${styles.field_form} `}>                       
                                    <div className='' style={{ height: '80px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Email nhân viên:</span>
                                        <Field type="email" name="email" placeholder="- - - - - -" className="form-control" 
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setFieldValue("email", value);
                                                setFieldValue("username", value); 
                                            }}
                                        />
                                        <ErrorMessage name="email" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>

                                    <div className='' style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Tên nhân viên:</span>
                                        <Field type="text" name="name" placeholder="- - - - - -" className="form-control" />
                                        <ErrorMessage name="name" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>

                                    <div className={`${styles.space_center} `}>
                                        <div className={`${styles.location} `}>
                                            <div className='' style={{ height: '90px'}}>
                                                <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Địa chỉ:</span>
                                                <Field type="text" name="location" placeholder="- - - - - -" className="form-control" />
                                                <ErrorMessage name="location" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                            </div>
                                        </div>

                                        <div className={`${styles.date_container} `} style={{ height: '90px'}}>
                                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Ngày bắt đầu:</span>
                                            <div className={`${styles.date_picker}`} style={{paddingBottom: '10px'}}>
                                                <DatePicker
                                                    name="date_join"
                                                    selected={selectedDate}
                                                    onChange={(date) => {
                                                        setSelectedDate(date);
                                                        setFieldValue("date_join", date ? date.toISOString() : "");
                                                    }}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Chọn ngày"
                                                />
                                                <FontAwesomeIcon icon={faCalendarCheck} />
                                            </div>
                                            <ErrorMessage name="date" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                        </div>
                                    </div>

                                    <div className='row mb-3'  style={{ height: '90px'}}>
                                        <div className='col-lg-6 col-md-6 mt-3'>
                                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }}>Bộ phận nhân sự:</span>
                                            <Field as="select" name="department"  className="form_select_level w-100 border-0" style={{ border: "1px solid #DEE2E6", height: '30px', outline: 'none', boxShadow: 'none'}}>
                                                <option value="">Bộ phận nhân sự</option>
                                                {departmentData.map((_data, index) => (
                                                    <option key={index} value={_data.id}>{_data.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="department" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                        </div>
                                        
                                        <div className='col-lg-6 col-md-6 mt-3'>
                                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }}>Chức vụ:</span>
                                            <Field as="select" name="position"  className="form_select_level w-100 border-0" style={{ border: "1px solid #DEE2E6", height: '30px', outline: 'none', boxShadow: 'none'}}>
                                                <option value="">Chức vụ</option>
                                                {positiontData.map((_data, index) => (
                                                    <option key={index} value={_data.id}>{_data.name}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="position" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                        </div>
                                    </div>

                                    {/* <div className={`${styles.random} `}>
                                        <span className={`${styles.random_account} `} onClick={() => handleRandom()}>Tạo tài khoản tự động</span>
                                    </div> */}
                                    <div className={`${styles.space_center} mt-2`}>
                                        <div className='' style={{ height: '90px'}}>
                                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Tên đăng nhập:</span>
                                            <Field type="text" name="username" placeholder="- - - - - -" className="form-control" />
                                            <ErrorMessage name="username" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                        </div>

                                        <div className='' style={{ height: '90px'}}>
                                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Mật khẩu:</span>
                                            <Field type="text" name="password" placeholder="- - - - - -" className="form-control" />
                                            <ErrorMessage name="password" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className={`${styles.btn_submit} d-flex gap-2 mt-4`}>
                                    <Button variant="secondary" onClick={onHide}>Hủy</Button>
                                    <Button 
                                        variant="btn btn-primary" 
                                        type="submit"
                                        disabled={isSubmitting}
                                    >Xác nhận</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal.Body>

            {/* <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="btn btn-primary" onClick={handleSubmit}>Submit</Button>
            </Modal.Footer> */}
        </Modal>  
    );
};

export default ModalStaffManagement;