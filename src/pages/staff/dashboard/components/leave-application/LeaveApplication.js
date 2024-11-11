import React, { useState } from 'react';
import styles from './LeaveApplication.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCloudArrowDown, faCloudArrowUp, faFileLines } from '@fortawesome/free-solid-svg-icons';

const LeaveApplication = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleDownFile = () => {
        const fileUrl = '/don-xin-nghi-phep_cong-ty.doc';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'mau_don_xin_phep.doc';
        link.click();
    }

    return (
        <div className={`${styles.leave_application}`}>
            <div className={`${styles.leave_application_container}`}>
                <div className={`${styles.download}`}>
                    <FontAwesomeIcon icon={faCloudArrowDown} onClick={handleDownFile}/>
                    <span>Tải form mẫu</span>
                </div>

                <div className={`${styles.upload}`}>
                    {selectedFile ?
                        <div className={`${styles.file_upload}`}>
                            <div className={`${styles.content}`}>
                                <FontAwesomeIcon icon={faFileLines} />
                                <span className="ms-3">
                                    {selectedFile.name}
                                </span>
                            </div>
                            {selectedFile && <FontAwesomeIcon icon={faCheck} />}
                        </div>
                    :
                        <span>Browser File To Upload</span>
                    }

                    <div className={`${styles.upload_cloud}`} onClick={() => document.getElementById('file-upload').click()}>
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                        <input
                            id="file-upload"
                            type="file"
                            className={styles.hidden_input}
                            onChange={handleFileUpload}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveApplication;