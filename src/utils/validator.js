import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // apply for date validation

const transactionBodySchema = {
  type: 'object',
  properties: {
    categoryId: { type: ['integer', 'null'] },
    transactionType: { type: 'string', enum: ['income', 'expense'] },
    name: { type: 'string' },
    amount: { type: 'number', minimum: 0.01 },
    transactionDate: { type: 'string', format: 'date' },
    description: { type: 'string', maxLength: 250 },
    moneyPotId: { type: 'integer' },
  },
  required: ['moneyPotId', 'transactionType', 'amount', 'transactionDate'],
  additionalProperties: false,
};

export const transactionValidate = ajv.compile(transactionBodySchema);

const categoryBodySchema = {
  type: 'object',
  properties: {
    type: { type: 'string', enum: ['income', 'expense', ''] },
    name: { type: 'string', minLength: 1 },
    description: { type: 'string' },
  },
  required: ['name'],
  additionalProperties: false,
};

export const categoryValidate = ajv.compile(categoryBodySchema);

const scheduledActionBodySchema = {
  type: 'object',
  properties: {
    moneyPotId: { type: 'integer' },
    categoryId: { type: ['integer', 'null'] },
    transactionType: { type: 'string', enum: ['income', 'expense'] },
    name: { type: 'string' },
    amount: { type: 'number', minimum: 0.01  },
    recurrenceType: { type: 'string', enum: ['daily', 'weekly', 'monthly', 'quarterly', 'biannually', 'annually'] },
    dayOfWeek: { type: 'string', enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
    dateOfMonth: { type: 'integer', minimum: 1, maximum: 31 },
    monthOfYear: {
      type: 'string',
      enum: [
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
      ],
    },
    selectedTransactionDate: { type: 'string', format: 'date' },
    active: { type: 'boolean' },
    description: { type: 'string' },
  },
  required: ['transactionType', 'name', 'amount', 'recurrenceType'],
  additionalProperties: false,
};
export const scheduledActionValidate = ajv.compile(scheduledActionBodySchema);

const credentialsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
  required: ['email', 'password'],
  additionalProperties: true,
};
export const credentialsValidate = ajv.compile(credentialsSchema);

const MoneyPotsBodySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    balance: { type: 'number' },
    description: { type: 'string' },
  },
  required: ['name'],
  additionalProperties: false,
};
export const moneyPotValidate = ajv.compile(MoneyPotsBodySchema);

const MoneyPotsTransferBodySchema = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
    fromPotId: { type: 'integer' },
    toPotId: { type: 'integer' },
  },
  required: ['amount', 'fromPotId', 'toPotId'],
  additionalProperties: false,
};
export const moneyPotTransferValidate = ajv.compile(MoneyPotsTransferBodySchema);
