export FETCH_CRON_SEASON=2020 \
export F1_API_URL=http://localhost:3333/api \
export ERGAST_API_URL=http://ergast.com/api \
export F1_API_KEY=apiKey 

for i in {1..17}
do
  FETCH_CRON_ROUND=$i node dist/apps/crons/main.js
done