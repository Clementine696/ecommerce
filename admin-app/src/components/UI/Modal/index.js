import React from "react";
import { Modal, Button } from 'react-bootstrap'

const NewModal = (props) => {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {props.children}
            </Modal.Body>
            <Modal.Footer>
                {
                    props.buttons && props.buttons.map((btn, index) => 
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                        )
                }
                <Button variant="secondary" style={{backgroundColor: '#333'}} {...props} className="btn-sm"onClick={props.handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" style={{backgroundColor: '#333'}} {...props} className="btn-sm" onClick={props.handleClose}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewModal;
