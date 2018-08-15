-- Create database
create database api_restful default character set utf8 default collate utf8_general_ci;

-- Create table syntax for TABLE 'categories'
create table categories (
    id int(11) unsigned not null auto_increment,
    name varchar(255) not null,
    primary key(id)
);

-- Create table syntax for TABLE 'users'
create table users (
    id int(11) unsigned not null auto_increment,
    email varchar(70) not null,
    pass varchar(40) not null,
    primary key(id)
);
