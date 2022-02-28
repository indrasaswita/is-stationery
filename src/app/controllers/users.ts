import express, { Request, Response } from 'express'
import { sequelize } from 'databases/config/mysql';

const Company = require('../../databases/models/company')(sequelize)

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
	await Company
		.findAll()
		.then((companies: any) => {
			console.log(companies);
			sequelize.close();

			res
				.status(200)
				.json(
					companies
						.map((company: any) => {
							const value: any = company.dataValues
							return {
								id: value.id,
								name: value.name,
							}
						})
				);
		});

})

module.exports = router;