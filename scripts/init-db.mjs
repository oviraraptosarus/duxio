import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const migrationPath = path.join(root, "prisma", "migrations", "000_init", "migration.sql");
const databasePath = path.join(root, "dev.db");

const db = new Database(databasePath);
const existingTables = db
  .prepare("select count(1) as count from sqlite_master where type = 'table'")
  .get().count;

if (existingTables > 0) {
  console.log(`Database already initialized at ${databasePath} with ${existingTables} tables.`);
  db.close();
  process.exit(0);
}

const sql = fs.readFileSync(migrationPath, "utf8");
db.exec(`PRAGMA foreign_keys=ON; ${sql}`);

const { count } = db
  .prepare("select count(1) as count from sqlite_master where type = 'table'")
  .get();

db.close();

console.log(`Initialized ${databasePath} with ${count} tables.`);
