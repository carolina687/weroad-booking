import {travels} from '../stubs/travels'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  travels.push({
    ...body,
    id: Math.floor(Math.random() * 10000) + 1
  })
  return { travels };
  });