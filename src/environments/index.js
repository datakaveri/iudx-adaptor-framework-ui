const dev = {
  BACKEND_URL: 'http://localhost:8080',
  BACKEND_API_USERNAME: 'testuser',
  BACKEND_API_PASSWORD: 'testuserpassword',
  GRAFANA_DASHBOARD_URL:
    'http://af77dba53c48d498ca5abc2bca196637-1952972883.ap-south-1.elb.amazonaws.com/d/xNi6Rlqnz/job-dashboard?var-job_name=JOBNAME&var-searchable_pattern=INFO&orgId=1&theme=light',
};

const prod = {
  BACKEND_URL: 'http://13.126.4.143:30003',
  BACKEND_API_USERNAME: 'testuser',
  BACKEND_API_PASSWORD: 'testuserpassword',
  GRAFANA_DASHBOARD_URL:
    'http://af77dba53c48d498ca5abc2bca196637-1952972883.ap-south-1.elb.amazonaws.com/d/xNi6Rlqnz/job-dashboard?var-job_name=JOBNAME&var-searchable_pattern=INFO&orgId=1&theme=light',
};

const config = {
  // Add common config values here
  isDevelopment: process.env.CLIENT_ENV !== 'prod',
  // Default to dev if not set
  ...(process.env.CLIENT_ENV === 'prod' ? dev : dev),
};

export default config;
