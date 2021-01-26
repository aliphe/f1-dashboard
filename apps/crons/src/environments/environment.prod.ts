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
      url: '',
    },
  },
  apis: {
    ergast: {
      url: 'http://ergast.com/api',
    },
  },
};
