import React, { useEffect, useState } from 'react';
import { parse } from "date-fns";
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ModalStaffManagement.module.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const loginSchemas = Yup.object().shape({
    name: Yup.string().required('⚠ Please enter employee name'),
    location: Yup.string().required('⚠ Please enter location'),
    date: Yup.string().required('⚠ Please enter date of birth'),
    department: Yup.string().required('⚠ Please enter employee department'),
    username: Yup.string().required('⚠ Please enter username'),
    password: Yup.string().required('⚠ Please enter password'),
});

const ModalStaffManagement = (props) => {
    const { show, onHide, title, isSubmit, modalData, setModalData, ...otherProps } = props;
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (modalData.date) {
            setSelectedDate(parse(modalData.date, "dd/MM/yyyy", new Date()));
        } else {
            setSelectedDate(new Date());
        }
    }, [modalData.date]);
    
    const handleSubmit = (values) => {
        
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
                            date: modalData.date || '',
                            department: modalData.em_item || '',
                            username: '',
                            password: ''
                        }}
                        validationSchema={loginSchemas}
                        onSubmit={handleSubmit}
                        >
                        {({ isSubmitting, values, setSubmitting }) => (
                            <Form>
                                <div className={`${styles.field_form} `}>                       
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
                                                    name="date"
                                                    selected={selectedDate}
                                                    onChange={(date) => setSelectedDate(date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Chọn ngày"
                                                />
                                                <FontAwesomeIcon icon={faCalendarCheck} />
                                            </div>
                                            <ErrorMessage name="date" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                        </div>
                                    </div>

                                    <div className='' style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Tên bộ phận:</span>
                                        <Field type="text" name="department" placeholder="- - - - - -" className="form-control" />
                                        <ErrorMessage name="department" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />  
                                    </div>

                                    {title === 'Thêm thông tin nhân viên'
                                    ?
                                        <div className={`${styles.space_center} `}>
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
                                    :
                                        <></>
                                    }
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