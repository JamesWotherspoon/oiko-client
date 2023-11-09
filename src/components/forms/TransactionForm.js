import React, { useState } from 'react';
import MoneyPotSelect from '../../sharedComponents/MoneyPotSelect';
import MoneyTypeFieldset from '../../sharedComponents/MoneyTypeFieldset';
import CategoryUnitSelect from '../../sharedComponents/CategoryUnitSelect';
import DateSelect from '../../sharedComponents/DateSelect';
import { useSelector } from 'react-redux';
import { transactionValidate as validate } from '../../utils/validator';
import { format } from 'date-fns';

const TransactionForm = ({ children, onSubmit, transaction }) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd')
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const initialFormState = {
    categoryId: transaction?.categoryId || null,
    amount: transaction?.amount || 0.0,
    transactionType: transaction?.transactionType || 'expense',
    moneyPotId: transaction?.moneyPotId || moneyPots?.[0].id,
    transactionDate: transaction?.transactionDate || currentDate,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data against schema
    const valid = validate(formData);

    if (!valid) {
      console.log(validate.errors);
      const validationErrors = validate.errors.reduce((accumulator, error) => {
        console.log(error);
        const key = error.instancePath.slice(1);
        accumulator[key] = error.message;
        return accumulator;
      }, {});
      setErrors(validationErrors);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MoneyPotSelect
        moneyPotId={formData.moneyPotId}
        handleMoneyPotIdChange={(value) => handleChange('moneyPotId', value)}
        moneyPots={moneyPots}
        error={errors.moneyPotId}
      />
      <fieldset>
        <div className="horizontal-flex">
          <MoneyTypeFieldset
            transactionType={formData.transactionType}
            handleTransactionTypeChange={(value) => handleChange('transactionType', value)}
            amount={formData.amount}
            handleAmountChange={(value) => handleChange('amount', value)}
            error={errors.amount + errors.transactionType}
          />
          <DateSelect
            label=""
            date={formData.transactionDate}
            handleDateChange={(value) => handleChange('transactionDate', value)}
            error={errors.transactionDate}
          />
        </div>
      </fieldset>
      <CategoryUnitSelect
        cateoryId={formData.categoryId}
        handleCategoryIdChange={(value) => handleChange('categoryId', value)}
        error={errors.categoryId}
      />
      <div className="submit-btn-cont">{children}</div>
    </form>
  );
};

export default TransactionForm;
