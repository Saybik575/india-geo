const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const normalizeUrl = (value) => {
	if (!value) {
		return "";
	}

	return value.trim().replace(/^['\"]|['\"]$/g, "");
};

const pool = new Pool({ connectionString: normalizeUrl(process.env.DATABASE_URL) });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
