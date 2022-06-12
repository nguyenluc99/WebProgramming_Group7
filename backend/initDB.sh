rm -rf /tmp/webProgramming 
killall -9 postgres && \
./../postgresql/library/bin/initdb /tmp/webProgramming && \
./../postgresql/library/bin/pg_ctl -D /tmp/webProgramming -l logfile start
node ./init/initdb.js && node ./init/test.js

echo "JOB DONE!"