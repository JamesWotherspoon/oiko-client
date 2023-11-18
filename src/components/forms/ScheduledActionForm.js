import React, { useState, useEffect } from 'react';
import OptionsSelect from '../../sharedComponents/OptionsSelect';
import MoneyTypeFieldset from '../../sharedComponents/MoneyTypeFieldset';
import CategorySelect from '../../sharedComponents/CategorySelect';
import DateSelect from '../../sharedComponents/DateSelect';
import { useSelector } from 'react-redux';
import { scheduledActionValidate } from '../../utils/validator';
import { format } from 'date-fns';
import TextField from '../../sharedComponents/TextField';
import { sanitizePayload, validateHelper } from '../../utils/helpers';

const ScheduledActionForm = ({ children, onSubmit, scheduledAction }) => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const moneyPots = useSelector((state) => state.moneyPot.items);
  const initialFormState = {
    categoryId: scheduledAction?.categoryId || null,
    amount: parseFloat(scheduledAction?.amount) || 0.0,
    transactionType: scheduledAction?.transactionType || 'negative',
    moneyPotId: scheduledAction?.moneyPotId || moneyPots[0]?.id,
    name: scheduledAction?.name || '',
    recurrenceType: scheduledAction?.recurrenceType || 'monthly',
    dayOfWeek: scheduledAction?.dayOfWeek || null,
    dateOfMonth: scheduledAction?.dateOfMonth || null,
    monthOfYear: scheduledAction?.monthOfYear || null,
  };
  const [nextTransactionDate, setNextTransactionDate] = useState(scheduledAction?.nextTransactionDate || null);
  const monthOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const recurrenceType = ['daily', 'weekly', 'monthly', 'quarterly', 'biannually', 'annually'];
  const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dateOfMonth = Array.from(Array(31).keys()).map((i) => i + 1);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    if (scheduledAction) {
      setFormData(initialFormState);
    }
  }, [scheduledAction]);

  const handleChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedData = sanitizePayload(formData, ['dayOfWeek', 'dateOfMonth', 'monthOfYear', 'categoryId']);
    const { valid, errors } = validateHelper(scheduledActionValidate, sanitizedData);
    console.log(valid)
    if (!valid) {
      setErrors(errors);
      return
    }
    onSubmit(sanitizedData);
  };
  // Conditonally displayed fields based on selected recurrance type
  const addtionalScheduledActionFields = [];
  const actionMonthSelect = { label: 'Month of Year', key: 'monthOfYear', options: monthOfYear };
  const actionDaySelect = { label: 'Day of Week', key: 'dayOfWeek', options: dayOfWeek };
  const actionDateSelect = { label: 'Date of Month', key: 'dateOfMonth', options: dateOfMonth };

  if (formData.recurrenceType === 'monthly') {
    addtionalScheduledActionFields.push(actionDateSelect);
  } else if (formData.recurrenceType === 'weekly') {
    addtionalScheduledActionFields.push(actionDaySelect);
  } else if (formData.recurrenceType === 'annually') {
    addtionalScheduledActionFields.push(actionMonthSelect);
    addtionalScheduledActionFields.push(actionDateSelect);
  }

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
        {nextTransactionDate && <h3>{nextTransactionDate}</h3>}
      </fieldset>
      <fieldset>
        <TextField
          label="Action name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
        />
        <OptionsSelect
          label="Account"
          selectedId={formData.moneyPotId}
          handleSelectedIdChange={(value) => handleChange('moneyPotId', value)}
          options={moneyPots}
          error={errors.moneyPotId}
        />
      </fieldset>
      <fieldset className="horizontal-flex">
        <OptionsSelect
          label="Recurrence Type"
          selectedId={formData.recurrenceType}
          handleSelectedIdChange={(value) => handleChange('recurrenceType', value)}
          options={recurrenceType}
          error={errors.recurrenceType}
        />
      </fieldset>
      {addtionalScheduledActionFields.length > 0 && (
        <fieldset className="horizontal-flex">
          {addtionalScheduledActionFields.map((field) => {
            return (
              <OptionsSelect
                key={field.key}
                label={field.label}
                selectedId={formData[field.key]}
                handleSelectedIdChange={(value) => handleChange(field.key, value)}
                options={field.options}
                error={errors[field.key]}
              />
            );
          })}
        </fieldset>
      )}

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

export default ScheduledActionForm;
