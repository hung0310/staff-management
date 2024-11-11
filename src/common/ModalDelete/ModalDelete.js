import React from 'react';
import styles from './ModalDelete.module.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
    const { show, onHide, setIsDelete, ...otherProps } = props;

    const handleSubmit = () => {
        setIsDelete(true);
        onHide();
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            {...otherProps}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className={styles.customModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Bạn có chắc chắn muốn xóa không?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Hủy</Button>
                <Button variant="btn btn-danger" onClick={handleSubmit}>Xác nhận</Button>
            </Modal.Footer>
        </Modal>  
    );
};

export default ModalDelete;