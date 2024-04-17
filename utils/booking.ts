import { email, helpers, required } from "@vuelidate/validators";

const phone = helpers.regex(/^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/)

export const customerRules = {
  name: { required },
  email: { required, email },
  phone: { required, phone: helpers.withMessage('Value is not a valid phone number', phone) },
  age: { required },
  gender: { required },
};