 -cd .\Frontend\
 -cd .\car-warehouse-app\
 -node start

 sql
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;

- mysql cars.sql

- cd.\Backend\
- npm i
- npm start
