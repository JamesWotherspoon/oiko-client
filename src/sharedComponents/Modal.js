import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ title, onClose, children }) => {

    return (
        <div className='modal'>
            <div className='modal-overlay' onClick={onClose} />
            <div className='modal-content'>
                <IconButton className='modal-close-icon' onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <h2 className='modal-title'>{title}</h2>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.node,
};

export default Modal;
