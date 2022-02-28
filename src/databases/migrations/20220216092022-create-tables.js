'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE merks (
        id int unsigned PRIMARY KEY auto_increment,
        name varchar(48) NOT NULL,
        customerservice JSON,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        updatedAt TIMESTAMP NULL
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE companies (
        id int unsigned PRIMARY KEY auto_increment,
        name varchar(32) NOT NULL,
        useremployeeIds JSON,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE users (
        id int unsigned PRIMARY KEY auto_increment,
        name varchar(32) NOT NULL,
        email varchar(100) NOT NULL,
        password varchar(200) NULL,
        companyIds JSON,
        veriftoken varchar(4) NULL,
        verified_at timestamp null,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE usercompanies (
        id int unsigned PRIMARY KEY auto_increment,
        userId int unsigned NOT NULL,
        companyId int unsigned NOT NULL,
        createdAt timestamp not null default current_timestamp()
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE storages (
        id int unsigned PRIMARY KEY auto_increment,
        companyId int unsigned NULL,
        name varchar(32) NOT NULL,
        address text NULL,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE racks (
        id int unsigned primary key auto_increment,
        storageId int unsigned NOT NULL,
        name varchar(48) not null,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE items (
        id int unsigned primary key auto_increment,
        merkId int unsigned NULL,
        rackId int unsigned not null,
        barcode varchar(32) not null,
        name varchar(32) not null,
        longname varchar(32) not null,
        sellprice int unsigned not null,
        sellpriceIds JSON,
        buyprice int unsigned not null,
        isAvailablestock boolean NOT NULL DEFAULT false,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE itemprices (
        id int unsigned primary key auto_increment,
        itemId int unsigned not null,
        name varchar(32) not null,
        minqty int unsigned not null default 1,
        price int unsigned not null,
        isActive boolean NOT NULL DEFAULT true,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE itempricehistories (
        id int unsigned primary key auto_increment,
        itempriceId int unsigned not null,
        itemId int unsigned not null,
        old_name varchar(32) not null,
        new_name varchar(32) not null,
        old_minqty int unsigned not null,
        new_minqty int unsigned not null,
        old_price int unsigned not null,
        new_price int unsigned not null,
        createdAt timestamp not null default current_timestamp()
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE itemstocks (
        id int unsigned primary key auto_increment,
        itemId int unsigned not null,
        storageId int unsigned NOT NULL,
        stock int not null default 0,
        stocklimitmin int unsigned null,
        stocklimitmax int unsigned null,
        itemstockretailId int unsigned null,
        retailmultiplier int unsigned null,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE purchases (
        id int unsigned primary key auto_increment,
        totalitem int unsigned NOT NULL DEFAULT 0,
        totalamount int unsigned NOT NULL DEFAULT 0,
        totalmerchant int unsigned NOT NULL DEFAULT 0,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE purchaseitems (
        id int unsigned primary key auto_increment,
        purchaseId int unsigned not null,
        vendorId int unsigned not null,
        itemId int unsigned not null,
        newstockretail int unsigned not null,
        itemstockId int unsigned not null,
        newstock int unsigned not null,
        buyprice int unsigned not null,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);

    await queryInterface.sequelize.query(`
      CREATE TABLE vendors (
        id int unsigned primary key auto_increment,
        name varchar(100) not null,
        address varchar(1024) null,
        description text null,
        phone1 varchar(32) null,
        phone2 varchar(32) null,
        phone3 varchar(32) null,
        agentsales1 varchar(32) null,
        agentsales2 varchar(32) null,
        agentsales3 varchar(32) null,
        createdAt timestamp not null default current_timestamp(),
        updatedAt timestamp null
      );
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS companies;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS itempricehistories;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS itemprices;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS items;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS itemstocks;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS merks;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS purchases;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS purchaseitems;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS racks;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS storages;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS users;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS usercompanies;
    `);

    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS vendors;
    `)
  }
};