import { Dialect, Sequelize } from 'sequelize'
const dbconfig = require('../../databases/config/config.json')

const conenv: {
	username: string,
	password: string,
	database: string,
	host: string,
	dialect: Dialect,
} = dbconfig.development

export const sequelize = new Sequelize(
	conenv.database, 
	conenv.username,
	conenv.password,
	{
		host: conenv.host,
		dialect: conenv.dialect,
	},
)