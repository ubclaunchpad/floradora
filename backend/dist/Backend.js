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
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //req body
// local listener
const server = app.listen(8080, () => {
    console.log("Server is listning on port 8080");
});
exports.default = server;
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
// update a user
app.put("/users/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, email, display_name } = req.body;
        yield db_1.default.query("UPDATE users SET display_name = $1, email = $2 WHERE user_id = $3", [display_name, email, user_id]);
        res.json("User " + user_id + " was updated.");
    }
    catch (error) {
        console.error(error);
    }
}));
//delete a user
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
//create an observation
app.post("/observations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, plant_type_id, date_created, image_url, confidence_score, longitude, latitude, description } = req.body;
        const newObservation = yield db_1.default.query("INSERT INTO observations (user_id, plant_type_id, date_created, image_url, "
            + "confidence_score, longitude, latitude, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", [user_id, plant_type_id, date_created, image_url, confidence_score, longitude, latitude, description]);
        res.json(newObservation);
    }
    catch (error) {
        console.error(error);
    }
}));
//get all observations
app.get("/observations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allObservations = yield db_1.default.query("SELECT * FROM observations");
        res.json(allObservations.rows);
    }
    catch (error) {
        console.error(error);
    }
}));
//get an observation
app.get("/observations/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { observation_id } = req.body;
        const observation = yield db_1.default.query("SELECT * FROM observations WHERE observation_id = $1", [observation_id]);
        res.json(observation.rows[0]);
    }
    catch (error) {
        console.error(error);
    }
}));
// delete an observation
app.delete("/observations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { observation_id } = req.body;
        yield db_1.default.query("DELETE FROM observations WHERE observation_id = $1", [observation_id]);
        res.json("Observation" + observation_id + "was deleted.");
    }
    catch (error) {
        console.error(error);
    }
}));
// perform plant_types operations
app.post("/plant_types", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plant_name } = req.body;
        const newPlantType = yield db_1.default.query("INSERT INTO plant_types (plant_name) VALUES ($1);", [plant_name]);
        res.json(newPlantType);
    }
    catch (error) {
        console.error(error);
    }
}));
//get all plant_types
app.get("/plant_types", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPlantTypes = yield db_1.default.query("SELECT * FROM plant_types");
        res.json(allPlantTypes.rows);
    }
    catch (error) {
        console.error(error);
    }
}));
//get a plant_type by id
app.get("/plant_types/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plant_type_id } = req.body;
        const plantType = yield db_1.default.query("SELECT * FROM plant_types WHERE plant_type_id = $1", [plant_type_id]);
        res.json(plantType.rows[0]);
    }
    catch (error) {
        console.error(error);
    }
}));
//update a plant_name by its id
app.put("/plant_types/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plant_type_id, plant_name } = req.body;
        yield db_1.default.query("UPDATE plant_types SET plants_name = $1 WHERE plant_type_id = $2", [plant_name, plant_type_id]);
        res.json("Plant " + plant_type_id + " was updated.");
    }
    catch (error) {
        console.error(error);
    }
}));
// // delete a plant_type
app.delete("/plant_types", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plant_type_id } = req.body;
        yield db_1.default.query("DELETE FROM plant_types WHERE plant_type_id = $1", [plant_type_id]);
        res.json("Plant Type" + plant_type_id + "was deleted.");
    }
    catch (error) {
        console.error(error);
    }
}));
//# sourceMappingURL=Backend.js.map