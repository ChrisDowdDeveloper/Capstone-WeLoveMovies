// Knex configuration
const path = require("path");
require("dotenv").config();

// Enviornment Variable handling
const {
  NODE_ENV = "development",
  DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
} = process.env;
const URL =
  NODE_ENV === "production"
    ? PRODUCTION_DATABASE_URL
    : DEVELOPMENT_DATABASE_URL;

// Config and export
module.exports = {
  development: {
    client: "postgresql",
    connection: URL,
    pool: { min: 0, max: 10 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    }
  },
  production: {
    client: "postgresql",
    connection: process.env.PRODUCTION_DATABASE_URL,
    pool: { min: 0, max: 10 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    }
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations")
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds")
    },
    useNullAsDefault: true,
  }
};