'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TABLE merks (
        id int unsigned PRIMARY KEY auto_increment,
        name varchar(48) NOT NULL,
        customerservice JSON,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        updated_at TIMESTAMP NULL
      );
      
      CREATE TABLE companies (
        id int unsigned PRIMARY KEY auto_increment,
        name varchar(32) NOT NULL,
        useremployee_ids JSON,
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
      
      CREATE TABLE users (
        id int unsigned PRIMARY KEY auto_increment,
        company_id int unsigned NOT NULL,
        name varchar(32) NOT NULL,
        email varchar(100) NOT NULL,
        password varchar(200) NULL,
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
      
      CREATE TABLE storages (
        id int unsigned PRIMARY KEY auto_increment,
        company_id int unsigned NULL,
        name varchar(32) NOT NULL,
        address text NULL,
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
      
      CREATE TABLE racks (
        id int unsigned primary key auto_increment,
        storage_id int unsigned NOT NULL,
        name varchar(48) not null,
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
      
      CREATE TABLE items (
        id int unsigned primary key auto_increment,
        merk_id int unsigned NULL,
        rack_id int unsigned not null,
        barcode varchar(32) not null,
        name varchar(32) not null,
        longname varchar(32) not null,
        sellprice int unsigned not null,
        sellprice_ids JSON,
        buyprice int unsigned not null,
        is_availablestock boolean NOT NULL DEFAULT false,
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
      
      CREATE TABLE itemprices (
        id int unsigned primary key auto_increment,
        item_id int unsigned not null,
        name varchar(32) not null,
        minqty int unsigned not null default 1,
        price int unsigned not null,
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
      
      CREATE TABLE itempricehistories (
        id int unsigned primary key auto_increment,
        itemprice_id int unsigned not null,
        item_id int unsigned not null,
        old_name varchar(32) not null,
        new_name varchar(32) not null,
        old_minqty int unsigned not null,
        new_minqty int unsigned not null,
        old_price int unsigned not null,
        new_price int unsigned not null,
        created_at timestamp not null default current_timestamp()
      );
      
      CREATE TABLE itemstocks (
        id int unsigned primary key auto_increment,
        item_id int unsigned not null,
        storage_id int unsigned NOT NULL,
        stock int not null default 0,
        stocklimitmin int unsigned null,
        stocklimitmax int unsigned null,
        itemstockretail_id int unsigned null,
        retailmultiplier int unsigned null,
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
      
      CREATE TABLE purchases (
        id int unsigned primary key auto_increment,
        totalitem int unsigned NOT NULL DEFAULT 0,
        totalamount int unsigned NOT NULL DEFAULT 0,
        totalmerchant int unsigned NOT NULL DEFAULT 0,
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
      
      CREATE TABLE purchaseitems (
        id int unsigned primary key auto_increment,
        purchase_id int unsigned not null,
        vendor_id int unsigned not null,
        item_id int unsigned not null,
        newstockretail int unsigned not null,
        itemstock_id int unsigned not null,
        newstock int unsigned not null,
        buyprice int unsigned not null,
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
      
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
        created_at timestamp not null default current_timestamp(),
        updated_at timestamp null
      );
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS companies;
      DROP TABLE IF EXISTS itempricehistories;
      DROP TABLE IF EXISTS itemprices;
      DROP TABLE IF EXISTS items;
      DROP TABLE IF EXISTS itemstocks;
      DROP TABLE IF EXISTS merks;
      DROP TABLE IF EXISTS purchases;
      DROP TABLE IF EXISTS purchaseitems;
      DROP TABLE IF EXISTS racks;
      DROP TABLE IF EXISTS storages;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS vendors;
    `)
  }
};