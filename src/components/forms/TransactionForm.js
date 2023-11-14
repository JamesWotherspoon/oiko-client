import React, { useEffect, useState } from 'react';
import OptionsSelect from '../../sharedComponents/OptionsSelect';
import MoneyTypeFieldset from '../../sharedComponents/MoneyTypeFieldset';
import CategorySelect from '../../sharedComponents/CategorySelect';
import DateSelect from '../../sharedComponents/DateSelect';
import { useSelector } from 'react-redux';
import { transactionValidate } from '../../utils/validator';
import { format } from 'date-fns';
import { validateHelper, sanitizePayload } from '../../utils/helpers';

const TransactionForm = ({ children, onSubmit, transaction }) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const initialFormState = {
    categoryId: transaction?.categoryId || null,
    amount: parseFloat(transaction?.amount) || 0.0,
    transactionType: transaction?.transactionType || 'expense',
    moneyPotId: transaction?.moneyPotId || moneyPots[0]?.id,
    transactionDate: transaction?.transactionDate || currentDate,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({})
    if (transaction) {
      setFormData({
        categoryId: transaction.categoryId,
        amount: parseFloat(transaction.amount),
        transactionType: transaction.transactionType,
        moneyPotId: transaction.moneyPotId,
        transactionDate: transaction.transactionDate,
      });
    }
  }, [transaction]);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedData = sanitizePayload(formData, ['categoryId', 'name', 'description']);
    const { valid, errors } = validateHelper(transactionValidate, sanitizedData);
    if (!valid) {
      setErrors(errors);
      return
    }
    onSubmit(sanitizedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="date-money-fieldset">
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
      </fieldset>
      <fieldset>
        <OptionsSelect
          label="Account"
          selectedId={formData.moneyPotId}
          handleSelectedIdChange={(value) => handleChange('moneyPotId', value)}
          options={moneyPots}
          error={errors.moneyPotId}
        />
      </fieldset>
      <fieldset>
        <h5 className="form-sub-heading">
          Category <span className="info-text">(optional)</span>
        </h5>
        <CategorySelect
          selectedCategoryId={formData.categoryId}
          handleCategoryIdChange={(value) => handleChange('categoryId', value)}
          error={errors.categoryId}
        />
      </fieldset>
      <div className="submit-btn-cont">{children}</div>
    </form>
  );
};

export default TransactionForm;
