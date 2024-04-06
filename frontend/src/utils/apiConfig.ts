const mode = import.meta.env.MODE;
const local = import.meta.env.VITE_API_URL_LOCAL;
const railway = import.meta.env.VITE_API_URL_RAILWAY;
let API_URL: string;

if (mode === 'development' && local) {
  API_URL = local;
} else if (mode === 'production' && railway) {
  API_URL = railway;
} else {
  throw new Error(
    'API URL is not defined for the current environment.'
  );
}

export default API_URL;
