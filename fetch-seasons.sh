export F1_API_URL=http://localhost:3333/api \
export ERGAST_API_URL=http://ergast.com/api \
export F1_API_KEY=apiKey 

for i in {1980..2010}
do
  FETCH_CRON_SEASON=$i node dist/apps/crons/main.js
done