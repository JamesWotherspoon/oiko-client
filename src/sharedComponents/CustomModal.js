import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const Modal = ({ title, onClose, children }) => {

    const modalOverlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        zIndex: 1000,
    };
    const modalContentStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1100,
        borderRadius: '8px',
    };
    const modalCloseStyle = {
        position: 'absolute',
        top: '8px',
        right: '8px',
    };

    return (
        <div>
            <div style={modalOverlayStyle} onClick={onClose} />
            <div style={modalContentStyle}>
                <IconButton style={modalCloseStyle} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                <h5 className='modal-title'>{title}</h5>

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
