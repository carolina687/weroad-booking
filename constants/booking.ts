import { PaymentTypes, type Booking } from "~/types/bookings";

export const emptyBooking: Booking = {
    travel: {
        name: "",
        id: "",
        departureDate: "",
        arrivalDate: "",
        image: "",
        description: "",
        price: 0,
        rating: 0,
        type: "",
      },
      customer: {
        name: "",
        phone: "",
        email: "",
        age: 0,
        gender: "",
      },
      payment: PaymentTypes.CREDIT_TRANSFER,
      notes: "",
}