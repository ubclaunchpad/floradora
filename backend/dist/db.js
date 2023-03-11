"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const Pool = pg_1.default.Pool;
const pool = new Pool({
    user: "postgres",
    password: "7uNkXN4A8j8wTx35yW34",
    host: "virtual-collection.cywueo0ars7u.us-west-2.rds.amazonaws.com",
    port: 5432,
    database: "postgres"
});
exports.default = pool;
//# sourceMappingURL=db.js.map