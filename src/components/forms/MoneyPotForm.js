import React, { useState, useEffect } from 'react';
import OptionsSelect from '../../sharedComponents/OptionsSelect';
import { useSelector } from 'react-redux';
import { moneyPotValidate } from '../../utils/validator';
import { validateHelper, sanitizePayload } from '../../utils/helpers';
import TextField from '../../sharedComponents/TextField';
import MoneyTypeFieldset from '../../sharedComponents/MoneyTypeFieldset';

const MoneyPotForm = ({ children, onSubmit, moneyPot }) => {
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const initialFormState = {
    name: moneyPot?.name || '',
    balance: parseFloat(moneyPot?.balance) || 0.0,
    description: moneyPot?.description || '',
  };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({})
    if (moneyPot) {
      setFormData({
        name: moneyPot?.name,
        balance: parseFloat(moneyPot?.balance),
        description: moneyPot?.description,
      });
    }
  }, [moneyPot]);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedData = sanitizePayload(formData, ['balance', 'description']);
    const { valid, errors } = validateHelper(moneyPotValidate, sanitizedData);
    if (!valid) {
      setErrors(errors);
      return
    }
    onSubmit(sanitizedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <TextField
          label="Account name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
        />
      </fieldset>
      <fieldset>
        <MoneyTypeFieldset
          transactionType={'income'}
          handleTransactionTypeChange={(value) => console.log(value)}
          amount={formData.balance}
          handleAmountChange={(value) => handleChange('balance', value)}
          error={errors.balance}
        />
      </fieldset>
      <fieldset>
        <TextField
          label="Notes"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          error={errors.description}
        />
      </fieldset>
      <div className="submit-btn-cont">{children}</div>
    </form>
  );
};

export default MoneyPotForm;
