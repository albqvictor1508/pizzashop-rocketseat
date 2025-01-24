import { users } from "./schema/users";
import { restaurants } from "./schema/restaurants";
import { db } from "./connection";
import { faker } from "@faker-js/faker";
import chalk from "chalk";

await db.delete(users);
await db.delete(restaurants);
//LIMPAR O BANCO

//criando gerente
const [manager] = await db
	.insert(users)
	.values([
		{
			name: faker.person.fullName(),
			email: "admin@admin.com",
			role: "manager",
		},
	])
	.returning({
		id: users.id,
	});

console.log(chalk.yellow("Created manager!!"));

//criando costumers
await db.insert(users).values([
	{
		name: faker.person.fullName(),
		email: faker.internet.email(),
		role: "costumer",
	},
	{
		name: faker.person.fullName(),
		email: faker.internet.email(),
		role: "costumer",
	},
	{
		name: faker.person.fullName(),
		email: faker.internet.email(),
		role: "costumer",
	},
	{
		name: faker.person.fullName(),
		email: faker.internet.email(),
		role: "costumer",
	},
]);
console.log(chalk.yellow("Created costumers!!"));

//criando restaurante
await db.insert(restaurants).values([
	{
		name: faker.company.name(),
		description: faker.lorem.paragraph(),
		managerId: manager.id,
	},
]);

console.log(chalk.yellow("Created restaurants!!"));

console.log(chalk.blue("Database seeded successfully."));
