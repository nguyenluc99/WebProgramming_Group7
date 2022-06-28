killall -9 postgres || true
rm -rf /tmp/webProgramming  && \
./../postgresql-14.0/library/bin/initdb /tmp/webProgramming && \
./../postgresql-14.0/library/bin/pg_ctl -D /tmp/webProgramming -l logfile start
node ./init/initdb.js && node ./init/test.js && node ./init/initUser.js

echo "JOB DONE!"