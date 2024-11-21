import React from 'react';
import styles from './ModalDelete.module.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDelete = (props) => {
    const { show, onHide, setIsButton, content, style, ...otherProps } = props;

    const handleSubmit = () => {
        setIsButton(true);
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
                <p>{content}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Hủy</Button>
                <Button 
                    onClick={handleSubmit}
                    style={style}
                >Xác nhận</Button>
            </Modal.Footer>
        </Modal>  
    );
};

export default ModalDelete;