-- must change your name and databasename, passward.
CREATE ROLE car_admin LOGIN PASSWORD 'car_psql';
CREATE DATABASE car_admin;
GRANT ALL PRIVILEGES ON DATABASE car_admin TO car_admin;
ALTER ROLE car_admin WITH CREATEROLE CREATEDB SUPERUSER;
