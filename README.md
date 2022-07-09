# WebProgramming_Group7

## Local machine deployment:
### Postresql installation:
```
wget https://ftp.postgresql.org/pub/source/v14.0/postgresql-14.0.tar.gz
tar -xvzf ./postgresql-14.0.tar.gz
cd postgresql-14.0
./configure --prefix=$PWD/library --enable-cassert --enable-debug CFLAGS="-O0 -g -fno-omit-frame-pointer"
make -j4 && make install
cd ../
```

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
Open the web browser, go directly to the address: http://localhost:3000 and the program will be served.

### Check database status during development

``` 
cd ./postgresql-14.0/library/bin
./psql webprogramming
```

## Docker container deployment:
Make sure to clone the PostgreSQL 14.0 in prior:
```
wget https://ftp.postgresql.org/pub/source/v14.0/postgresql-14.0.tar.gz
```

Start docker daemon and run following command:
```
docker build . -t pickme
docker images
```
A docker images named `pickme` will be created. Run the image:
```
docker run -dp 3000:3000 pickme
```
The port 3000 is mapped between the docker machine and host machine.
Open the web browser of the host machine, go directly to the address: http://localhost:3000 and the program will be served.
