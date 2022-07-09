# WebProgramming_Group7

### Postresql installation:
```
wget https://ftp.postgresql.org/pub/source/v14.0/postgresql-14.0.tar.gz
tar -xvzf ./postgresql-14.0.tar.gz
cd postgresql-14.0
./configure --prefix=$PWD/library --enable-cassert --enable-debug CFLAGS="-O0 -g -fno-omit-frame-pointer"
make -j4 && make install
cd ../
```
### Initialize database (1st time)
sudo apt install postgresql
sudo -u postgres psql (Open postgres terminal)
    alter user postgres with password 'webprogramming';
    show hba_file; (copy result of this link to pg_hba.conf)
    \q
sudo gedit /etc/postgresql/14/main/pg_hba.conf (paste link above after sudo gedit)
    Scroll down and change peer to md5 at row 90 and 95, then save file
sudo service postgresql restart (done)
### PostgreSQL database start and initialization:
```
npm install
chmod +x initDB.sh
./initDB.sh
```

### Application launch
#### Run in development:
```
npm run dev
```

#### Run in production:
```
npm start
```
Open the web browser and go directly to the address: http://localhost:3000 and the program will be served.

### Check database status during development

``` 
cd ./postgresql-14.0/library/bin
./psql webprogramming
```
