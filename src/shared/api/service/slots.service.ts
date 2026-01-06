import HTTP_CLIENT from "../controller/HTTP_CLIENT";
import { API_CONFIG } from "../config";

export const SLOTS_SERVICE = {
  create: (data: { date: string; startTime: string; endTime: string }) => {
    const url = API_CONFIG.SLOTS.create;
    return HTTP_CLIENT.post(url, data);
  },
  getByDate: (date: string) => {
    const url = API_CONFIG.SLOTS.getByDate;
    return HTTP_CLIENT.get(url, { params: { date } });
  },
  delete: (id: string) => {
    const url = API_CONFIG.SLOTS.delete(id);
    return HTTP_CLIENT.delete(url);
  },
};
