import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"; //tomar cuidado pra n importar do banco errado
import { users } from "./users";
import { relations } from "drizzle-orm";

export const restaurants = pgTable("restaurants", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	managerId: text("manager_id").references(() => users.id, {
		onDelete: "set null",
	}),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const restaurantsRelations = relations(restaurants, ({ one }) => {
	return {
		manager: one(users, {
			fields: [restaurants.managerId],
			references: [users.id],
			relationName: "restaurant_manager",
		}),
	};
});
