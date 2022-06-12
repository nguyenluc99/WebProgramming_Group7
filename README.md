# WebProgramming_Group7

### Postresql installation:
```
git clone git://git.postgresql.org/git/postgresql.git
cd postgresql
./configure --prefix=$PWD/library --enable-cassert --enable-debug CFLAGS="-O0 -g -fno-omit-frame-pointer"
make -j4 && make install
cd ../
```

### PostgreSQL database start and initialization:
```
cd ./backend
npm install
chmod +x initDB.sh
./initDB.sh
```

### Frontend installation and launch:
```
cd ./frontend
npm install
php -S localhost:8000
```
Open the web browser and go directly to the address: http://localhsot:8000 and the program will be served.

### Check database status during development

``` 
cd ./postgresql/library/bin
./psql webprogramming
```
