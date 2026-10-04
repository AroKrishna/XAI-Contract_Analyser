const api = {
  baseURL: '/api',
  get: async (url) => {
    console.log(`GET ${url}`);
    return null;
  },
  post: async (url, data) => {
    console.log(`POST ${url}`, data);
    return data;
  },
};

export default api;
