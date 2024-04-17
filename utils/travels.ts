import { required, url } from "@vuelidate/validators";

export const travelRules = {
    name: { required },
    type: { required },
    price: { required },
    image: { required, url },
    description: { required },
  }

export const priceFormat = (price: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    price
  );