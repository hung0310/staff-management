import React, { useRef, useState } from 'react';
import styles from './LeaveApplication.module.scss';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCheck, faCloudArrowDown, faCloudArrowUp, faFileLines, faX } from '@fortawesome/free-solid-svg-icons';

const loginSchemas = Yup.object().shape({
    id_emp: Yup.string().required('⚠ Please enter your employee code'),
    name: Yup.string().required('⚠ Please enter your name'),
    item: Yup.string().required('⚠ Please enter your department'),
    day: Yup.string().required('⚠ Please enter day'),
});

const LeaveApplication = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        fileInputRef.current.value = null; 
    }
    
    const handleSubmit = (values) => {

    }

    return (
        <div className={`${styles.leave_application}`}>
            <div className={`${styles.leave_application_container}`}>
                <Formik
                    initialValues={{
                        id_emp: '',
                        name: '',
                        item: '',
                        day: '',
                        note: '',
                    }}
                    validationSchema={loginSchemas}
                    onSubmit={handleSubmit}
                    >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            <div className={`${styles.field_form} mb-4`}>   

                                <div className={`${styles.space_center} `}>
                                    <div className={`${styles.location} `}>
                                        <div className='' style={{ height: '90px'}}>
                                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Mã số nhân viên ✱:</span>
                                            <Field type="text" name="id_emp" placeholder="- - - - - -" className="form-control" />
                                            <ErrorMessage name="id_emp" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                        </div>
                                    </div>
                                    <div className={`${styles.location} `}>
                                        <div className='' style={{ height: '90px'}}>
                                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Bộ phận làm việc ✱:</span>
                                            <Field type="text" name="item" placeholder="- - - - - -" className="form-control" />
                                            <ErrorMessage name="item" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className='' style={{ height: '90px'}}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Tên nhân viên ✱:</span>
                                    <Field type="text" name="name" placeholder="- - - - - -" className="form-control" />
                                    <ErrorMessage name="name" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                </div>

                                <div className={`${styles.space_center} `}>
                                    <div className={`${styles.date_container} `} style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Nghỉ từ ngày ✱:</span>
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

                                    <div className={`${styles.date_container} `} style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Đến ngày ✱:</span>
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

                                <div className={`${styles.textarea_custom} `} style={{ height: '90px'}}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Ghi chú:</span>
                                    <textarea></textarea>
                                </div>
                            </div>

                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >File minh chứng:</span>
                            <div className={`${styles.upload}`}>
                                {selectedFile ?
                                    <div className={`${styles.file_upload}`}>
                                        <div className={`${styles.content}`}>
                                            <FontAwesomeIcon icon={faFileLines} />
                                            <span className="ms-3">
                                                {selectedFile.name}
                                            </span>
                                        </div>
                                        <FontAwesomeIcon icon={faX} className={`${styles.cus_ico} `} onClick={handleRemoveFile}/>
                                    </div>
                                :
                                    <span>Browser File To Upload</span>
                                }

                                <div className={`${styles.upload_cloud}`} onClick={() => document.getElementById('file-upload').click()}>
                                    <FontAwesomeIcon icon={faCloudArrowUp} />
                                    <input
                                        ref={fileInputRef}
                                        id="file-upload"
                                        type="file"
                                        className={styles.hidden_input}
                                        onChange={handleFileUpload}
                                        accept=".doc"
                                    />
                                </div>
                            </div>

                            {/* {selectedFile ?

                            :
                                <></>
                            } */}

                            <div className={`${styles.custom_btn} mt-5`}>
                                <button>
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

export default LeaveApplication;