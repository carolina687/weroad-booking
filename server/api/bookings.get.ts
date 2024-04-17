import {bookings} from '../stubs/bookings'

export default defineEventHandler((event) => {
    return {
      bookings
    }
  })