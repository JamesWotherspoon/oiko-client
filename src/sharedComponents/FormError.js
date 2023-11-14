import React from 'react'
import { Error } from '@mui/icons-material';

export default function FormError({ errorMessage }) {

    if (!errorMessage) return null;
    return (
        <div className='error-cont'>
            <Error className='error-icon' />
            <p className='error-text'>
                {errorMessage}
            </p>
        </div>
    );
}
