import type { Travel } from "./travels";

export interface Booking {
    travel: Travel
    customer: CustomerData;
    payment: PaymentTypes;
    notes: string;
}

export interface CustomerData {
    name: string,
    email: string,
    phone: string,
    age: number,
    gender: string,
}

export enum PaymentTypes {
    CREDIT_TRANSFER = "Credit transfer",
    PAYPAL = "Paypal",
    REVOLUT = "Revolut"
}

export enum Gender {
    MALE = "Male",
    FEMALE = "Female"
}

export enum WizardSteps {
    TRAVEL = "Travel details",
    PERSONAL = "Personal info",
    PAYMENT = "Payment info"
}