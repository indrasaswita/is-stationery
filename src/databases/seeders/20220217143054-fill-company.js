'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.sequelize.query(`
      INSERT INTO companies
      VALUES 
        ('1', 'Boy', '[1,2]', NOW(), NULL),
        ('2', 'Rahayu', '[1,2]', NOW(), NULL),
        ('3', 'Graha', '[]', NOW(), NULL);
    `);

    await queryInterface.sequelize.query(`
      INSERT INTO users
      VALUES
        ('1', 'Boy', 'indrasaswita@gmail.com', '', '[1,2]', NULL, NOW(), NOW(), NULL),
        ('2', 'Kasir 1', 'kasir@gmail.com', '', '[1,2]', NULL, NOW(), NOW(), NULL),
        ('3', 'Kasir2', 'kasir2@gmail.com', '', '[]', NULL, NOW(), NOW(), NULL);
    `);

    await queryInterface.sequelize.query(`
      INSERT INTO usercompanies
      VALUES
        ('1', '1', '1', NOW()),
        ('2', '1', '2', NOW()),
        ('3', '2', '1', NOW()),
        ('4', '2', '2', NOW());
    `)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
