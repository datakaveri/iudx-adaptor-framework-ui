const dev = {
  BACKEND_URL: '',
};

const prod = {
  BACKEND_URL: '',
};

const config = {
  // Add common config values here
  isDevelopment: process.env.CLIENT_ENV !== 'prod',
  // Default to dev if not set
  ...(process.env.CLIENT_ENV === 'prod' ? prod : dev),
};

export default config;