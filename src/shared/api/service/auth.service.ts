import HTTP_CLIENT from "../controller/HTTP_CLIENT";
import { API_CONFIG } from "../config";

export const AUTH_SERVICE = {
  googleLogin: (data: { idToken: string }) => {
    const url = API_CONFIG.AUTH.googleLogin;
    return HTTP_CLIENT.post(url, data);
  },
};
