import {travels} from '../stubs/travels'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const index = travels.findIndex((travel) => travel.id === body.id)

  travels.splice(index, 1, body)
  return { travels };
  });