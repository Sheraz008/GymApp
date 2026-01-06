const API_URL = "https://gym-backend-seven-alpha.vercel.app";

const API_CONFIG = {
  BASE_URL: API_URL,
  AUTH: {
    googleLogin: "auth/google",
  },
  SLOTS: {
    create: "slots",
    getByDate: "slots",
    delete: (id: string) => `slots/${id}`,
  },
};

export { API_CONFIG };
