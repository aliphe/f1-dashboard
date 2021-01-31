export const environment = {
  production: true,
  crons: {
    fetch: {
      season: Number(process.env.FETCH_CRON_SEASON),
      round: Number(process.env.FETCH_CRON_ROUND),
    },
  },
  services: {
    f1Api: {
      url: process.env.F1_API_URL,
      apiKey: process.env.F1_API_KEY,
    },
  },
  apis: {
    ergast: {
      url: process.env.ERGAST_API_URL,
    },
  },
};
