import Ajv from "ajv";
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // apply for date validation

const transactionBodySchema = {
  type: 'object',
  properties: {
    categoryId: { type:  ["integer", "null"] },
    transactionType: { type: 'string', enum: ['income', 'expense'] },
    name: { type: 'string' },
    amount: { type: 'number' },
    transactionDate: { type: 'string', format: 'date' },
    description: { type: 'string', maxLength: 250 },
    moneyPotId: { type: 'integer' },
  },
  required: ['moneyPotId', 'transactionType', 'amount', 'transactionDate'],
  additionalProperties: false,
};


export const transactionValidate = ajv.compile(transactionBodySchema);
