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
const pool = require("./db");
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //req body
//ROUTES//
//create a user
app.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, display_name } = req.body;
        const newUser = yield pool.query("INSERT INTO users (email, display_name) VALUES ($1, $2);", [email, display_name]);
        res.json(newUser);
    }
    catch (error) {
        console.error(error);
    }
}));
//get all users
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    }
    catch (error) {
        console.error(error);
    }
}));
// //get a user
// app.get("/users/:id", async(req: Request, res: Response) => {
//     try {
//         const {user_id} = req.params;
//         const user = await pool.query("SELECT FROM users WHERE user_id = $1", [user_id]);
//         res.json(user.rows[0]);
//     } catch (error) {
//         console.error(error);
//     }
// })
// //update a user
// app.put("/users/:id", async(req: Request, res: Response) => {
//     try {
//         const {user_id} = req.params;
//         const {display_name} = req.body;
//         const updateUser = await pool.query("UPDATE users SET display_name = $1 WHERE user_id = $2", [display_name, user_id]);
//         res.json("User was updated.");
//     } catch (error) {
//         console.error(error);
//     }
// })
// // delete a user
// app.delete("/users/:id", async(req: Request, res: Response) => {
//     try {
//         const {user_id} = req.params;
//         const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
//         res.json("To do was deleted.");
//     } catch (error) {
//         console.error(error);
//     }
// })
const server = app.listen(8080, () => {
    console.log("Server is listning on port 8080");
});
exports.default = server;
//# sourceMappingURL=Backend.js.map