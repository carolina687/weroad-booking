import {bookings} from '../stubs/bookings'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  bookings.push({
    ...body,
    id: Math.floor(Math.random() * 10000) + 1
  })
  return { bookings };
  });