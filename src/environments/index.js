const dev = {
  BACKEND_URL: 'http://localhost:8080',
  BACKEND_API_USERNAME: 'testuser',
  BACKEND_API_PASSWORD: 'testuserpassword',
  GRAFANA_ETL_DASHBOARD_URL:
    'http://a89cb241f60104d3fa0e141b75312b1e-409771948.ap-south-1.elb.amazonaws.com/d/xNi6Rlqnz/job-dashboard?var-job_name=JOBNAME&var-searchable_pattern=INFO&orgId=1&theme=light',
  GRAFANA_RULES_DASHBOARD_URL:
    'http://a89cb241f60104d3fa0e141b75312b1e-409771948.ap-south-1.elb.amazonaws.com/d/33JdFJ44z/rules-dashboard?var-job_name=JOBNAME&var-searchable_pattern=INFO&orgId=1&theme=light',
};

const prod = {
  BACKEND_URL: 'http://localhost:8080',
  BACKEND_API_USERNAME: 'testuser',
  BACKEND_API_PASSWORD: 'testuserpassword',
  GRAFANA_ETL_DASHBOARD_URL:
    'http://a89cb241f60104d3fa0e141b75312b1e-409771948.ap-south-1.elb.amazonaws.com/d/xNi6Rlqnz/job-dashboard?var-job_name=JOBNAME&var-searchable_pattern=INFO&orgId=1&theme=light',
  GRAFANA_RULES_DASHBOARD_URL:
    'http://a89cb241f60104d3fa0e141b75312b1e-409771948.ap-south-1.elb.amazonaws.com/d/33JdFJ44z/rules-dashboard?var-job_name=JOBNAME&var-searchable_pattern=INFO&orgId=1&theme=light',
};

const config = {
  // Add common config values here
  isDevelopment: process.env.CLIENT_ENV !== 'prod',
  // Default to dev if not set
  ...(process.env.CLIENT_ENV === 'prod' ? dev : dev),
};

export default config;
