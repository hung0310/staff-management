import React, { useRef, useState } from 'react';
import styles from './LeaveApplication.module.scss';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UseToast } from '../../../../../hooks/ToastProvider';
import { faCalendarCheck, faCloudArrowUp, faFileLines, faX } from '@fortawesome/free-solid-svg-icons';
import { Get_Leave_Count, Send_Leave_Request } from '../../../../../apis/staffAPI';

const loginSchemas = Yup.object().shape({
    date_start: Yup.string().required('⚠ Vui lòng chọn ngày'),
    date_end: Yup.string()
        .required('⚠ Vui lòng chọn ngày')
        .test('is-after-start', '⚠ Ngày kết thúc phải sau hoặc bằng ngày bắt đầu', function(value) {
            const { date_start } = this.parent;
            if (!date_start || !value) return false;
            
            const startDate = new Date(date_start);
            const endDate = new Date(value);
            
            return endDate >= startDate;
        }),
});

const LeaveApplication = () => { 
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [selectedDateStart, setSelectedDateStart] = useState(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
    const { showToast } = UseToast();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        fileInputRef.current.value = null; 
    }
    
    const handleSubmit = async (values) => {
        try {
            const check = await Get_Leave_Count();
            if(check.status === 200) {
                if(check.data.leave_requests_count < 2) {
                    const formData = new FormData();
                    formData.append('from_date', values.date_start.split('T')[0]);
                    formData.append('to_date', values.date_end.split('T')[0]);
                    formData.append('attachments', selectedFile);
                    formData.append('note', values.note);
        
                    const result = await Send_Leave_Request(formData);
        
                    showToast("Yêu cầu của bạn đã được gửi!", "success");
                } else {
                    showToast("Bạn đã hết phép xin nghỉ trong tháng này!", "error");
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={`${styles.leave_application}`}>
            <div className={`${styles.leave_application_container}`}>
                <Formik
                    initialValues={{
                        date_start: selectedDateStart.toString(),
                        date_end: selectedDateEnd.toString(),
                        note: '',
                    }}
                    validationSchema={loginSchemas}
                    onSubmit={handleSubmit}
                    >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            <div className={`${styles.field_form} mb-4`}>
                                <div className={`${styles.space_center} `}>
                                    <div className={`${styles.date_container} `} style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Nghỉ từ ngày ✱:</span>
                                        <div className={`${styles.date_picker}`} style={{paddingBottom: '10px'}}>
                                            <DatePicker
                                                name="date_start"
                                                selected={selectedDateStart}
                                                onChange={(date) => {
                                                    setSelectedDateStart(date);
                                                    setFieldValue("date_start", date ? date.toISOString() : "");
                                                    if (selectedDateEnd && date && date > selectedDateEnd) {
                                                        setSelectedDateEnd(date);
                                                        setFieldValue("date_end", date.toISOString());
                                                    }
                                                }}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Chọn ngày"
                                            />
                                            <FontAwesomeIcon icon={faCalendarCheck} />
                                        </div>
                                        <ErrorMessage name="date_start" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>

                                    <div className={`${styles.date_container} `} style={{ height: '90px'}}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Đến ngày ✱:</span>
                                        <div className={`${styles.date_picker}`} style={{paddingBottom: '10px'}}>
                                            <DatePicker
                                                name="date_end"
                                                selected={selectedDateEnd}
                                                minDate={selectedDateStart}
                                                onChange={(date) => {
                                                    setSelectedDateEnd(date);
                                                    setFieldValue("date_end", date ? date.toISOString() : "");
                                                }}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Chọn ngày"
                                            />
                                            <FontAwesomeIcon icon={faCalendarCheck} />
                                        </div>
                                        <ErrorMessage name="date_end" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>
                                </div>

                                <div className={`${styles.textarea_custom} `}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Ghi chú:</span>
                                    <Field as="textarea" name="note" placeholder="- - - - - - -" className="form-control" style={{ height: '100px' }} />
                                </div>
                            </div>

                            <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Tệp minh chứng:</span>
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
                                    <span>Tệp minh chứng</span>
                                }

                                <div className={`${styles.upload_cloud}`} onClick={() => document.getElementById('file-upload').click()}>
                                    <FontAwesomeIcon icon={faCloudArrowUp} />
                                    <input
                                        ref={fileInputRef}
                                        id="file-upload"
                                        type="file"
                                        className={styles.hidden_input}
                                        onChange={handleFileUpload}
                                    />
                                </div>
                            </div>

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