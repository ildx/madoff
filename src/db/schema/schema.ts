import { createId } from "@paralleldrive/cuid2";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Users
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  cuid: text("cuid")
    .notNull()
    .unique()
    .$default(() => createId()),
  username: text("username").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatar: text("avatar"),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

// Accounts
export const accounts = sqliteTable("accounts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userCuid: text("user_cuid")
    .notNull()
    .references(() => users.cuid, { onDelete: "cascade" })
    .unique(), // Ensures one account per user
  balance: real("balance").notNull().default(0), // Current account balance
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

// Expenses
export const expenses = sqliteTable("expenses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userCuid: text("user_cuid")
    .notNull()
    .references(() => users.cuid, { onDelete: "cascade" }),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  amount: real("amount").notNull(),
  date: integer("date", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  isRecurring: integer("is_recurring", { mode: "boolean" }).notNull().default(false),
  recurringFrequency: text("recurring_frequency"), // e.g., 'daily', 'weekly', 'monthly', 'yearly'
  nextOccurrence: integer("next_occurrence", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});

// Incomes
export const incomes = sqliteTable("incomes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userCuid: text("user_cuid")
    .notNull()
    .references(() => users.cuid, { onDelete: "cascade" }),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  amount: real("amount").notNull(),
  date: integer("date", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  isRecurring: integer("is_recurring", { mode: "boolean" }).notNull().default(false),
  recurringFrequency: text("recurring_frequency"), // e.g., 'daily', 'weekly', 'monthly', 'yearly'
  nextOccurrence: integer("next_occurrence", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$default(() => new Date()),
});
