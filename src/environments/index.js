const dev = {
  BACKEND_URL: 'http://13.232.120.105:30003',
  BACKEND_API_USERNAME: 'testuser',
  BACKEND_API_PASSWORD: 'testuserpassword',
  GRAFANA_DASHBOARD_URL:
    'http://aae750b93d72643679cad9eb5f89ffc0-1788895437.ap-south-1.elb.amazonaws.com/d/xNi6Rlqnz/job-dashboard?var-job_name=JOBNAME&var-searchable_pattern=INFO&orgId=1&theme=light',
};

const prod = {
  BACKEND_URL: 'http://13.232.120.105:30003',
  BACKEND_API_USERNAME: 'testuser',
  BACKEND_API_PASSWORD: 'testuserpassword',
  GRAFANA_DASHBOARD_URL:
    'http://aae750b93d72643679cad9eb5f89ffc0-1788895437.ap-south-1.elb.amazonaws.com/d/xNi6Rlqnz/job-dashboard?var-job_name=JOBNAME&var-searchable_pattern=INFO&orgId=1&theme=light',
};

const config = {
  // Add common config values here
  isDevelopment: process.env.CLIENT_ENV !== 'prod',
  // Default to dev if not set
  ...(process.env.CLIENT_ENV === 'prod' ? prod : dev),
};

export default config;
