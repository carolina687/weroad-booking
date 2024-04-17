import { RequestMethod, type Travel } from "~/types/travels";

  export const requestTravel = async (method: RequestMethod, data: Travel | string) => {
    const response = await $fetch("/api/travels", {
      method,
      body: method === RequestMethod.DELETE ? { data } : data
    });
 
    return response.travels;
  }