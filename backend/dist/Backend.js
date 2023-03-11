"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //req body
//ROUTES//
//create a user
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, display_name } = req.body;
        const newUser = yield db_1.default.query("INSERT INTO users (email, display_name) VALUES ($1, $2);", [email, display_name]);
        res.json(newUser);
    }
    catch (error) {
        console.error(error);
    }
}));
//get all users
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield db_1.default.query("SELECT * FROM users");
        res.json(allUsers.rows);
    }
    catch (error) {
        console.error(error);
    }
}));
//get a user
app.get("/users/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const user = yield db_1.default.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        res.json(user.rows[0]);
    }
    catch (error) {
        console.error(error);
    }
}));
// //update a user
app.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, email, display_name } = req.body;
        yield db_1.default.query("UPDATE users SET display_name = $1, email = $2 WHERE user_id = $3", [display_name, email, user_id]);
        res.json("User " + user_id + "was updated.");
    }
    catch (error) {
        console.error(error);
    }
}));
// // delete a user
app.delete("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        yield db_1.default.query("DELETE FROM users WHERE user_id = $1", [user_id]);
        res.json("User" + user_id + "was deleted.");
    }
    catch (error) {
        console.error(error);
    }
}));
const server = app.listen(8080, () => {
    console.log("Server is listning on port 8080");
});
exports.default = server;
//# sourceMappingURL=Backend.js.map