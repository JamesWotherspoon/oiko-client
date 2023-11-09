import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MoneyInput from '../../sharedComponents/MoneyInput';
import { useSelector } from 'react-redux';
import CategoryUnit from '../../sharedComponents/CategoryUnit';
import { IconButton } from '@mui/material';

const FormTransaction = ({ children, onSubmit, transaction }) => {
  const currentDate = new Date();
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const categories = useSelector((state) => state.category.items);
  const [formData, setFormData] = useState(
    transaction
      ? transaction
      : {
          categoryId: null,
          amount: 0.00,
          transactionType: 'expense',
          moneyPotId: moneyPots[0]?.id,
          transactionDate: currentDate,
        },
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label className="form-sub-heading">Account</label>
        <Select name="moneyPotId" variant="standard" value={formData.moneyPotId} onChange={handleChange}>
          {moneyPots.map((moneyPot) => (
            <MenuItem key={moneyPot.id} value={moneyPot.id}>
              {moneyPot.name}
            </MenuItem>
          ))}
        </Select>
      </fieldset>
      <fieldset>
        <div className="horizontal-flex">
          <div className="transaction-type-amount-cont">
            <IconButton
              onClick={() =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  transactionType: prevFormData.transactionType === 'income' ? 'expense' : 'income',
                }))
              }
              className="expense-income-btn"
            >
              {formData.transactionType === 'income' ? (
                <span className="plus">+</span>
              ) : (
                <span className="minus">-</span>
              )}
            </IconButton>
            <MoneyInput
              onChange={(value) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  amount: value,
                }))
              }
              amount={formData.amount}
            />
          </div>
          <DatePicker
            label=""
            value={formData.date}
            onChange={(selectedDate) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                date: selectedDate,
              }))
            }
            className="transaction-date-picker"
          />
        </div>
      </fieldset>
      <fieldset>
        <h5 className="form-sub-heading">
          Category <span className="info-text">(optional)</span>{' '}
        </h5>
        <div className="category-btn-cont">
          <CategoryUnit
            category={{ id: null, name: 'None', type: '' }}
            handleClick={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                categoryId: null,
              }))
            }
            selectedItem={formData.categoryId}
          />
          {categories.map((category) => (
            <CategoryUnit
              key={category.id}
              category={category}
              handleClick={(id) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  categoryId: id,
                }))
              }
              selectedItem={formData.categoryId}
            />
          ))}
        </div>
      </fieldset>
      <div className="submit-btn-cont">{children}</div>
    </form>
  );
};

export default FormTransaction;
