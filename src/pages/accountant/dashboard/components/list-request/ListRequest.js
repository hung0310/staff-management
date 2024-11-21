import React, { useState } from 'react';
import styles from './ListRequest.module.scss'
import LeaveRequest from './components/LeaveRequest/LeaveRequest';
import OverTimeRequest from './components/OvertimeRequest/OvertimeRequest';

const ListRequest = () => {
    const [selectedContent, setSelectedContent] = useState('');
    const [active, setActive] = useState(true);

    const renderContent = () => {
        switch (selectedContent) {
            case 'leave_reuqest':
                return <LeaveRequest />;
            case 'overtime_request':
                return <OverTimeRequest />;
            default:
                return <LeaveRequest />;
        }
    };

    const handleLeave = () => {
        setSelectedContent('leave_request');
        setActive(true);
    }

    const handleOver = () => {
        setSelectedContent('overtime_request');
        setActive(false);
    }

    return (
        <div className={`${styles.list_request} `}>
            <div className={`${styles.list_request_container} `}>
                <div className={`${styles.header_nav} `}>
                    <div className={`${styles.leave_request} ${active ? styles.active : ''}`} onClick={handleLeave}>
                        <span>Yêu cầu nghỉ phép</span>
                    </div>

                    <div className={`${styles.overtime_request} ${active ? '' : styles.active}`} onClick={handleOver}>
                        <span>Yêu cầu làm thêm giờ</span>
                    </div>
                </div>

                <div className={`${styles.content_list} `}>
                    <div className={`${styles.content} `}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListRequest;