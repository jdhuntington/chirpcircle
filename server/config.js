const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter-3',
  port: process.env.PORT || 8000,
  appInsights: process.env.APPLICATION_INSIGHTS
};

export default config;
