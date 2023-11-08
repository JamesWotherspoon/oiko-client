import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { moneyPotSlice } from '../../utils/slices';

const AddMoneyPot = ({ actionComplete }) => {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(0.00);
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const moneyPotData = { name, balance, description };
        dispatch(moneyPotSlice.addItems(moneyPotData));
        if(actionComplete) actionComplete();
    };

    return (
            <form onSubmit={handleSubmit}>
                <div>
                <TextField id="name" label="Name" variant="standard" value={name}  onChange={(e) => setName(e.target.value)}/>
                <TextField id="balance" label="Balance" type="number" variant="standard" value={balance} onChange={e => setBalance(e.target.value)}/>
                <TextField id="description" label="Description" variant="standard" value={description} onChange={e => setDescription(e.target.value)}/>
                </div>
                <button type="submit" className="btn-fill">
                    {false ? <CircularProgress size={24} /> : 'Create'}
                </button>
            </form>
    );
};

export default AddMoneyPot;
