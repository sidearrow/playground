import Ajv from 'ajv';

export function apiResponseValidation(data: any, schema: Object) {
  const validate = new Ajv().compile(schema);
  const valid = validate(data);

  return valid ? null : validate.errors;
}
