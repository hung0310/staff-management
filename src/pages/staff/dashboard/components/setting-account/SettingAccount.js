import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import styles from './SettingAccount.module.scss';
import { OAuth_ChangePassword } from '../../../../../apis/staffAPI';
import { UseToast } from '../../../../../hooks/ToastProvider';

const SettingAccountSchema = Yup.object().shape({
    oldpass: Yup.string().required('⚠ Vui lòng nhập mật khẩu cũ'),
    newpass: Yup.string().required('⚠ Vui lòng nhập mật khẩu mới'),
    confirm: Yup.string().oneOf([Yup.ref('newpass')], '⚠ Mật khẩu không trùng khớp').required('⚠ Vui lòng xác nhận mật khẩu mới'),
});

const SettingAccount = () => {
    const { showToast } = UseToast();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const data = {
                old_password: values.oldpass,
                new_password: values.newpass
            }
            const result = await OAuth_ChangePassword(data);
            if(result.status === 200) 
                showToast("Cập nhật mật khẩu thành công!", "success");
            setSubmitting(false);
        } catch (error) {
            showToast("Mật khẩu cũ không chính xác!", "error");
            console.error("Error:", error.response || error.message);
        }
    };

    return (
        <div className={`${styles.change_password} d-flex justify-content-center align-item-center px-5`} style={{ marginTop: '10px' }}>
            <div className={`${styles.content} `}>
                <div>
                    <span className='d-flex justify-content-center align-item-center fw-bold mb-3' style={{ fontSize: '28px', color: '#293749' }}>Cập nhật mật khẩu</span>
                </div>

                <Formik initialValues={{ oldpass: '', newpass: '', confirm: '' }}
                        validationSchema={SettingAccountSchema}
                        onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={`${styles.field_form} `}>
                                <div style={{ height: '90px'}}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }}>Mật khẩu cũ:</span>
                                    <Field type="password" name="oldpass" placeholder="⚬⚬⚬⚬⚬⚬⚬⚬⚬" className="form-control" />
                                    <ErrorMessage name="oldpass" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                </div>

                                <div style={{ height: '90px'}}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }}>Mật khẩu mới:</span>
                                    <Field type="password" name="newpass" placeholder="⚬⚬⚬⚬⚬⚬⚬⚬⚬" className="form-control" />
                                    <ErrorMessage name="newpass" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                </div>

                                <div style={{ height: '90px'}}>
                                    <span className='fw-bold' style={{ color: "#293749", fontSize: '13px' }}>Xác nhận mật khẩu mới:</span>
                                    <Field type="password" name="confirm" placeholder="⚬⚬⚬⚬⚬⚬⚬⚬⚬" className="form-control" />
                                    <ErrorMessage name="confirm" component="div" className={`${styles.error_message}`} style={{ color: "red", fontSize: '12px' }} />
                                </div>
                            </div>
                            <div className={`${styles.btn_submit} d-flex justify-content-center align-items-center mt-4`}>
                                <button type="submit" className={`${styles.custom_btn} py-2 px-5 fw-bold rounded w-100`} disabled={isSubmitting}>
                                    <span className='me-2'>Xác nhận</span>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SettingAccount;