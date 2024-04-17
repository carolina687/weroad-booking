import type { Booking } from "~/types/bookings";

export const createBooking = async (data: Booking) => {
      const response = await $fetch("/api/bookings", {
        method: "post",
        body: data,
      });
   
      return response.bookings;
  };