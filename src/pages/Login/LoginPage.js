import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginPage.module.scss';
import { UseToast } from '../../hooks/ToastProvider';

const loginSchemas = Yup.object().shape({
    username: Yup.string().required('⚠ Please enter your username'),
    password: Yup.string().required('⚠ Please enter your password'),
});


const LoginPage = () => {
    const navigate = useNavigate();
    const { showToast } = UseToast();
    const [IsUsername, setIsUsername] = useState(false);
    const [IsPassword, setIsPassword] = useState(false);

    const initialValues = {
        username: '',
        password: ''
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        if(values.username === 'hello' && values.password === 'hello') {
            showToast("Login successfully!", "success");
            navigate('/accountant/dashboard');
            return;
        } 
        if (values.username === 'bye' && values.password === 'bye') {
            showToast("Login successfully!", "success");
            navigate('/staff/dashboard');
            return;
        } 
        showToast("Failed to sign in. Please try again later!", "error");
        setSubmitting(false);
        // try {

        // } catch (error) {
        //     console.error("Login error:", error);

        // } finally {
        //     setSubmitting(false);
        // }
    };

    return (
        <div className={`${styles.login} `}>
            <div className={`${styles.login_wrapper} `}>
                <div className={`${styles.login_container} `}>
                    <div className={`${styles.login_form} `}>
                        <div className={`${styles.title} `}>
                            <h2>Login</h2>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={loginSchemas}
                            onSubmit={handleSubmit}
                            >
                            {({ isSubmitting, values, setFieldValue }) => (
                                <Form>
                                    <div className={`${styles.field_form} `}>
                                        <div className={`${styles.input_box} `} style={{ height: '80px'}}>
                                            <ion-icon name="mail-outline"></ion-icon>
                                            <Field type="username" name="username" autocomplete="off" className={`${styles.form_control} ${IsUsername ? styles.has_value_user : ''} `} onChange={(e) => {setFieldValue('username', e.target.value); setIsUsername(!!e.target.value); }} />
                                            <label className='fw-bold'>Username:</label>
                                            <ErrorMessage name="username" component="div" className={`${styles.error_message}`} style={{ color: "white", fontSize: '12px' }} />  
                                        </div>
                                        
                                        <div className={`${styles.input_box} `} style={{ height: '80px'}}>
                                            <ion-icon name="lock-closed-outline"></ion-icon>
                                            <Field type="password" name="password" autocomplete="off" className={`${styles.form_control} ${IsPassword ? styles.has_value_pass : ''} `} onChange={(e) => {setFieldValue('password', e.target.value); setIsPassword(!!e.target.value); }}/>
                                            <label className='fw-bold'>Password:</label>
                                            <ErrorMessage name="password" component="div" className={`${styles.error_message}`} style={{ color: "white", fontSize: '12px' }} />
                                        </div>
                                    </div>
                                    
                                    <div className={`${styles.btn_submit} d-flex justify-content-center align-items-center`} style={{ marginTop: '40px'}}>
                                        <button
                                            type="submit"
                                            className={`${styles.custom_btn} text-center py-2 px-5 fw-bold rounded w-100`}
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;