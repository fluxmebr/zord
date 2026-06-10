-- ZORD — PostgreSQL initialization
-- Creates shadow database for Prisma migrations

CREATE DATABASE zord_shadow;
GRANT ALL PRIVILEGES ON DATABASE zord_shadow TO zord;

-- Enable extensions
\c zord_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

\c zord_shadow
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
