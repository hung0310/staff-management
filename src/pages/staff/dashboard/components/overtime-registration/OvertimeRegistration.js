import React, { useState } from 'react';
import styles from './OvertimeRegistration.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const loginSchemas = Yup.object().shape({
    id_emp: Yup.string().required('⚠ Please enter your employee code'),
    name: Yup.string().required('⚠ Please enter your name'),
    item: Yup.string().required('⚠ Please enter your department'),
    day: Yup.string().required('⚠ Please enter day'),
    hour_start: Yup.string().required('⚠ Please enter hour start'),
    hour_end: Yup.string().required('⚠ Please enter hour end'),
});

const OvertimeRegistration = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const handleSubmit = (values) => {

    }

    return (
        <div className={`${styles.overtime} `}>
            <div className={`${styles.overtime_form} `}>
                <Formik
                    initialValues={{
                        id_emp: '',
                        name: '',
                        item: '',
                        day: '',
                        hour_start: '',
                        hour_end: '',
                        note: '',
                    }}
                    validationSchema={loginSchemas}
                    onSubmit={handleSubmit}
                    >
                    {({ isSubmitting, values, setSubmitting }) => (
                        <Form>
                            <div className={`${styles.field_form} `}>   
                                <div className={`${styles.location} `}>
                                    <div className='' style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Mã số nhân viên:</span>
                                        <Field type="text" name="id_emp" placeholder="- - - - - -" className="form-control" />
                                        <ErrorMessage name="id_emp" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>
                                </div>

                                <div className='' style={{ height: '90px'}}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Tên nhân viên:</span>
                                    <Field type="text" name="name" placeholder="- - - - - -" className="form-control" />
                                    <ErrorMessage name="name" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                </div>

                                <div className={`${styles.space_center} `}>
                                    <div className={`${styles.location} `}>
                                        <div className='' style={{ height: '90px'}}>
                                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Bộ phận làm việc:</span>
                                            <Field type="text" name="item" placeholder="- - - - - -" className="form-control" />
                                            <ErrorMessage name="item" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                        </div>
                                    </div>

                                    <div className={`${styles.date_container} `} style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Ngày bắt đầu:</span>
                                        <div className={`${styles.date_picker}`} style={{paddingBottom: '10px'}}>
                                            <DatePicker
                                                name="day"
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Chọn ngày"
                                            />
                                            <FontAwesomeIcon icon={faCalendarCheck} />
                                        </div>
                                        <ErrorMessage name="day" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>
                                </div>

                                <div className={`${styles.space_center} `}>
                                    <div className={`${styles.date_container} `} style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Bắt đầu từ:</span>
                                        <div className={`${styles.date_picker}`} style={{paddingBottom: '10px'}}>
                                            <DatePicker
                                                name="hour_start"
                                                onChange={(date) => setSelectedDate('')}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeCaption="Thời gian"
                                                dateFormat="HH:mm"
                                                placeholderText="Chọn giờ bắt đầu"
                                            />
                                            <FontAwesomeIcon icon={faCalendarCheck} />
                                        </div>
                                        <ErrorMessage name="hour_start" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>

                                    <div className={`${styles.date_container} `} style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Kết thúc lúc:</span>
                                        <div className={`${styles.date_picker}`} style={{paddingBottom: '10px'}}>
                                            <DatePicker
                                                name="hour_end"
                                                onChange={(date) => setSelectedDate('')}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeCaption="Thời gian"
                                                dateFormat="HH:mm"
                                                placeholderText="Chọn giờ kết thúc"
                                            />
                                            <FontAwesomeIcon icon={faCalendarCheck} />
                                        </div>
                                        <ErrorMessage name="hour_end" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>
                                </div>

                                <div className={`${styles.textarea_custom} `} style={{ height: '90px'}}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Ghi chú:</span>
                                    <textarea></textarea>
                                </div>
                            </div>

                            <div className='w-100 d-flex justify-content-center align-items-center mt-4'>
                                <button className={`${styles.custom_btn} `}>
                                    Xác nhận
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default OvertimeRegistration;