export const environment = {
  production: true,
  crons: {
    fetch: {
      season: Number(process.env.FETCH_CRON_SEASON),
      round: Number(process.env.FETCH_CRON_ROUND),
    },
  },
  services: {
    entities: {
      url: process.env.ENTITIES_SERVICE_URL,
    },
  },
  apis: {
    ergast: {
      url: process.env.ERGAST_API_URL,
    },
  },
};
