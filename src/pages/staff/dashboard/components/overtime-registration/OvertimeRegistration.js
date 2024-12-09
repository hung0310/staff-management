import React, { useState } from 'react';
import styles from './OvertimeRegistration.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { Send_Overtime_Request } from '../../../../../apis/staffAPI';
import { UseToast } from '../../../../../hooks/ToastProvider';

const loginSchemas = Yup.object().shape({
    day_work: Yup.string().required('⚠ Vui lòng chọn ngày muốn đăng ký'),
    hour_start: Yup.string().required('⚠ Vui lòng chọn thời gian bắt đầu'),
    hour_end: Yup.string()
        .required('⚠ Vui lòng chọn thời gian kết thúc')
        .test('is-after-start', '⚠ Thời gian kết thúc phải sau thời gian bắt đầu', function(value) {
            const { hour_start } = this.parent;
            if (!hour_start || !value) return false;
            
            const startTime = new Date(hour_start);
            const endTime = new Date(value);
            
            return endTime > startTime;
        }),
});

const OvertimeRegistration = () => {
    const { showToast } = UseToast();
    const [selectedDay, setSelectedDay] = useState(new Date());
    const [selectedHourStart, setSelectedHourStart] = useState();
    const [selectedHourEnd, setSelectedHourEnd] = useState();

    const formatTime = (date) => {
        if (!date) return "";
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}:00`;
    };
    
    const handleSubmit = async (values) => {
        try {
            const data = {
                date: values.day_work.split('T')[0],
                from_time: formatTime(selectedHourStart),
                to_time: formatTime(selectedHourEnd),
                note: values.note
            }
            const result = await Send_Overtime_Request(data);
            if(result.status === 201) {
                showToast("Yêu cầu của bạn đã được gửi!", "success");
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={`${styles.overtime} `}>
            <div className={`${styles.overtime_form} `}>
                <Formik
                    initialValues={{
                        day_work: selectedDay.toISOString(),
                        hour_start: '',
                        hour_end: '',
                        note: '',
                    }}
                    validationSchema={loginSchemas}
                    onSubmit={handleSubmit}
                    >
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form>
                            <div className={`${styles.field_form} `}>   
                                <div className={`${styles.day_container}`} style={{ height: '90px'}}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Ngày đăng ký:</span>
                                    <div className={`${styles.date_picker}`} style={{paddingBottom: '10px'}}>
                                        <DatePicker
                                            name="day_work"
                                            selected={selectedDay}
                                            onChange={(date) => {
                                                setSelectedDay(date);
                                                setFieldValue("day_work", date ? date.toISOString() : "");
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Chọn ngày"
                                        />
                                        <FontAwesomeIcon icon={faCalendarCheck} />
                                    </div>
                                    <ErrorMessage name="day_work" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                </div>

                                <div className={`${styles.space_center}`}>
                                    <div className={`${styles.date_container}`} style={{ height: '90px' }}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }}>Bắt đầu từ:</span>
                                        <div className={`${styles.date_picker}`} style={{ paddingBottom: '10px' }}>
                                            <DatePicker
                                                name="hour_start"
                                                selected={selectedHourStart}
                                                onChange={(hour_start) => {
                                                    setSelectedHourStart(hour_start);
                                                    setFieldValue("hour_start", hour_start ? hour_start.toISOString() : "");
                                                    if (selectedHourEnd && hour_start && hour_start >= selectedHourEnd) {
                                                        setSelectedHourEnd(null);
                                                        setFieldValue("hour_end", "");
                                                    }
                                                }}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeCaption="Thời gian"
                                                dateFormat="HH:mm"
                                                minTime={new Date(new Date().setHours(18, 0, 0, 0))}
                                                maxTime={new Date(new Date().setHours(23, 0, 0, 0))}
                                                placeholderText="Chọn giờ bắt đầu"
                                                autoComplete="off"
                                            />
                                            <FontAwesomeIcon icon={faClock} />
                                        </div>
                                        <ErrorMessage name="hour_start" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>

                                    <div className={`${styles.date_container}`} style={{ height: '90px' }}>
                                        <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }}>Kết thúc lúc:</span>
                                        <div className={`${styles.date_picker}`} style={{ paddingBottom: '10px' }}>
                                            <DatePicker
                                                name="hour_end"
                                                selected={selectedHourEnd}
                                                onChange={(hour_end) => {
                                                    setSelectedHourEnd(hour_end);
                                                    setFieldValue("hour_end", hour_end ? hour_end.toISOString() : "");
                                                }}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeCaption="Thời gian"
                                                dateFormat="HH:mm"
                                                minTime={selectedHourStart ? new Date(selectedHourStart.getTime() + 60000) : new Date(new Date().setHours(17, 30, 0, 0))}
                                                maxTime={new Date(new Date().setHours(23, 0, 0, 0))}
                                                placeholderText="Chọn giờ kết thúc"
                                                autoComplete="off"
                                            />
                                            <FontAwesomeIcon icon={faClock} />
                                        </div>
                                        <ErrorMessage name="hour_end" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                    </div>
                                </div>

                                <div className={`${styles.textarea_custom} `}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Ghi chú:</span>
                                    <Field as="textarea" name="note" placeholder="- - - - - - -" className="form-control" style={{ height: '200px' }} />
                                </div>
                            </div>

                            <div className='w-100 d-flex justify-content-center align-items-center mt-4'>
                                <button className={`${styles.custom_btn} `} type='submit'>
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