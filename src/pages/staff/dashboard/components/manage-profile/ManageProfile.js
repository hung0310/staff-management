import React, { useEffect, useState } from 'react';
import styles from './ManageProfile.module.scss';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import avatar_default from '../../../../../assets/images/dashboard/user_default.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faBookmark, faCalendarCheck, faUserLock } from "@fortawesome/free-solid-svg-icons";
import DatePicker from 'react-datepicker';
import { UseToast } from '../../../../../hooks/ToastProvider';
import { Get_Profile_Emp, Update_Profile, Upload_Avatar_Emp } from '../../../../../apis/staffAPI';

const ProfileSchema = Yup.object().shape({
    email: Yup.string().required('⚠ Vui lòng nhập email'),
    full_name: Yup.string().required('⚠ Vui lòng nhập tên'),
    phone_number: Yup.string().required('⚠ Vui lòng nhập số điện thoại'),
    address: Yup.string().required('⚠ Vui lòng nhập địa chỉ'),
    date: Yup.string().required('⚠ Vui lòng nhập ngày sinh'),
});

const ManageProfile = () => {
    const [avatarUser, setAvatarUser] = useState(avatar_default);
    const [dataProfile, setDataProfile] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { showToast } = UseToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Get_Profile_Emp();
                if(result.status === 200) {
                    setDataProfile(result.data);
                    setAvatarUser(result.data.avatar ? `${result.data.avatar}` : avatar_default);
                    console.log(result.data);
                }
            } catch(error) {
                console.log(error);
            }
        };
        fetchData();
    }, [setDataProfile, setAvatarUser]);

    useEffect(() => {
        if (dataProfile?.date_of_birth) {
            setSelectedDate(new Date(dataProfile.date_of_birth));
        }
    }, [dataProfile]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const data = {
                full_name: values.full_name,
                date_of_birth: values.date.split('T')[0],
                gender: values.gender === 'True' ? 'Nam' : 'Nữ',
                address: values.address,
                phone_number: values.phone_number,
                email: values.email,
            }
            console.log(data);
            const result = await Update_Profile(data);
            showToast("Thông tin của bạn đã được cập nhật thành công!", "success");
            setSubmitting(false);
        } catch (error) {
            console.error("Error:", error.response || error.message);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUser(reader.result);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('avatar', file); 

            try {
                const rsp_avatar = await Upload_Avatar_Emp(formData);
                showToast("Ảnh đã được cập nhật thành công", "success");
            } catch(error) {
                console.error('Error uploading avatar:', error.response?.data || error.message);
            }
        } else {
            showToast("Lỗi", "error");
        }
    };

    return (
        <div className={`${styles.profile_wrapper} `}>
            <div className={`${styles.profile_container} container`}>
                <div className={`${styles.update_profile_container}`}>
                    <div className={`${styles.upload_avatar_container} mt-5`}>
                        {avatarUser && (
                            <img src={avatarUser} alt='user avatar' width={200} height={200} style={{ border: '1px solid #E3E6EA', borderRadius: '5px' }}/>
                        )}
                        <div className={`${styles.upload_container} mt-3 px-3 py-2 text-center text-white fw-medium rounded-2`} style={{ color: '#293749' }}>
                            <input 
                                type="file" 
                                id="upload" 
                                accept='.jpg, .jpeg, .png'
                                onChange={handleImageChange}
                                style={{ display: 'none' }} 
                            />
                            <label htmlFor="upload" className={`${styles.upload_btn} `}>
                                <FontAwesomeIcon icon={faArrowUp} />
                                <span className='ms-3'>Thay đổi avatar</span>
                            </label>
                        </div>
                    </div>

                    <div className={`${styles.form_data} `}>
                        <div className={`${styles.update_info_container} mt-5`}>
                            <Formik 
                                enableReinitialize
                                initialValues={{ 
                                    email: dataProfile?.email || '',
                                    full_name: dataProfile?.full_name || '',
                                    phone_number: dataProfile?.phone_number || '',
                                    date: dataProfile?.date_of_birth || '',
                                    department: dataProfile?.department || '',
                                    position: dataProfile?.position || '',
                                    address: dataProfile?.address || '',
                                    gender: dataProfile?.gender === 'Nam' ? 'True' : 'False',
                                }}
                                validationSchema={ProfileSchema}
                                onSubmit={handleSubmit}>
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form>
                                        <div className={`${styles.field_form} `}>
                                            <div className='d-flex gap-3'>
                                                <div className='w-100' style={{ height: '90px'}}>
                                                    <span className='fw-bold pt-2' style={{ color: "#293749", fontSize: '13px' }}>Email:</span>
                                                    <div className='w-100'>
                                                        <Field type="email" name="email" placeholder="- - - - - - -" className="form-control" />
                                                        <ErrorMessage name="email" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />  
                                                    </div>
                                                </div>

                                                <div className='w-100' style={{ height: '90px'}}>
                                                    <span className='fw-bold pt-2' style={{ color: "#293749", fontSize: '13px', width: '130px' }}>Họ tên:</span>
                                                    <div className='w-100'>
                                                        <Field type="text" name="full_name" placeholder="- - - - - - -" className="form-control" />
                                                        <ErrorMessage name="full_name" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />  
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='d-flex gap-3'>
                                                <div className='w-100' style={{ height: '80px'}}>
                                                    <span className='fw-bold mt-3' style={{ color: "#293749", fontSize: '13px', width: '130px' }}>Giới tính:</span>
                                                    <div className='w-100' style={{ marginTop: '12px'}}>
                                                        <Field type="radio" name="gender" value="True" /> <span style={{fontSize: '15px'}}>Nam</span>
                                                        <Field type="radio" name="gender" value="False" className='ms-5' /> <span style={{fontSize: '15px'}}>Nữ</span>
                                                    </div>
                                                </div>

                                                <div className='w-100' style={{ height: '90px'}}>
                                                    <span className='fw-bold pt-2' style={{ color: "#293749", fontSize: '13px', width: '130px' }}>Địa chỉ:</span>
                                                    <div className='w-100'>
                                                        <Field type="text" name="address" placeholder="- - - - - - -" className="form-control" />
                                                        <ErrorMessage name="address" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />  
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='d-flex gap-3'>
                                                <div className='w-100' style={{ height: '90px'}}>
                                                    <span className='fw-bold pt-2' style={{ color: "#293749", fontSize: '13px'}}>Số điện thoại:</span>
                                                    <div className='w-100'>
                                                        <Field type="text" name="phone_number" placeholder="- - - - - - -" className="form-control" />
                                                        <ErrorMessage name="phone_number" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />  
                                                    </div>
                                                </div>    

                                                <div className={`${styles.date_container} `} style={{ height: '90px'}}>
                                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }} >Ngày sinh:</span>
                                                    <div className={`${styles.date_picker} w-100`} style={{paddingBottom: '10px'}}>
                                                    <DatePicker
                                                        name="date"
                                                        selected={selectedDate}
                                                        onChange={(date) => {
                                                            setSelectedDate(date);
                                                            setFieldValue("date", date ? date.toISOString() : "");
                                                        }}
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Chọn ngày"
                                                    />
                                                        <FontAwesomeIcon icon={faCalendarCheck} />
                                                    </div>
                                                    <ErrorMessage name="date" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                                </div>                                                  
                                            </div>

                                            <div className='d-flex gap-3'>
                                                <div className='w-100' style={{ height: '90px'}}>
                                                    <span className='fw-bold pt-2' style={{ color: "#293749", fontSize: '13px', width: '130px' }}>Phòng ban:</span>
                                                    <div className='w-100'>
                                                        <Field type="text" name="department" className="form-control" readOnly/> 
                                                    </div>
                                                </div>

                                                <div className='w-100' style={{ height: '90px'}}>
                                                    <span className='fw-bold pt-2' style={{ color: "#293749", fontSize: '13px', width: '130px' }}>Chức vụ:</span>
                                                    <div className='w-100'>
                                                        <Field type="text" name="position" className="form-control" readOnly/> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles.btn_submit} d-flex justify-content-center align-items-center mt-4`}>
                                            <button type="submit" className={`${styles.custom_btn} py-2 px-5 fw-bold rounded`} disabled={isSubmitting}>
                                                <span className='me-2'>Lưu thay đổi</span>
                                                <FontAwesomeIcon icon={faBookmark} />
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProfile;