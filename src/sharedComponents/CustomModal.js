import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const Modal = ({ isOpen, onClose, children }) => {
    const theme = useTheme();
    if (!isOpen) {
        return null;
    }
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
        borderRadius: theme.shape.borderRadius,
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
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
