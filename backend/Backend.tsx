import express from "express";
const app = express();
import cors from "cors";
import pool from "./db";
import {Request, Response} from 'express'
import { Server } from "http";

// middleware
app.use(cors())
app.use(express.json()); //req body

// local listener
const server: Server = app.listen(8080, () => {
    console.log("Server is listning on port 8080")
});
export default server;


//ROUTES//

//create a user

app.post("/users", async(req: Request, res: Response) => {
    try {
        const {email, display_name} = req.body;
        const newUser = await pool.query("INSERT INTO users (email, display_name) VALUES ($1, $2);", [email, display_name]);

        res.json(newUser);
    } catch (error) {
        console.error(error);
    }
});


//get all users

app.get("/users", async(req: Request, res: Response) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (error) {
        console.error(error);
    }
})

//get a user

app.get("/users/id", async(req: Request, res: Response) => {
    try {
        const {user_id} = req.body;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error);
    }
})

// update a user

app.put("/users/id", async(req: Request, res: Response) => {
    try {
        const {user_id, email, display_name} = req.body;
        await pool.query("UPDATE users SET display_name = $1, email = $2 WHERE user_id = $3", [display_name, email, user_id]);
        res.json("User " + user_id + " was updated.");
    } catch (error) {
        console.error(error);
    }
})

//delete a user

app.delete("/users", async(req: Request, res: Response) => {
    try {
        const {user_id} = req.body;
        await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
        res.json("User" + user_id + "was deleted.");
    } catch (error) {
        console.error(error);
    }
})

//create an observation

app.post("/observations", async(req: Request, res: Response) => {
    try {
        const {user_id, plant_type_id, date_created, 
            image_url, confidence_score, longitude, latitude, description} = req.body;
        const newObservation = await pool.query("INSERT INTO observations (user_id, plant_type_id, date_created, image_url, "
            + "confidence_score, longitude, latitude, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", 
            [user_id, plant_type_id, date_created, image_url, confidence_score, longitude, latitude, description]);

        res.json(newObservation);
    } catch (error) {
        console.error(error);
    }
});

//get all observations

app.get("/observations", async(req: Request, res: Response) => {
    try {
        const allObservations = await pool.query("SELECT * FROM observations");
        res.json(allObservations.rows);
    } catch (error) {
        console.error(error);
    }
})

//get an observation

app.get("/observations/id", async(req: Request, res: Response) => {
    try {
        const {observation_id} = req.body;
        const user = await pool.query("SELECT * FROM observations WHERE observation_id = $1", [observation_id]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error);
    }
})

// delete an observation

app.delete("/observations", async(req: Request, res: Response) => {
    try {
        const {observation_id} = req.body;
        await pool.query("DELETE FROM observations WHERE observation_id = $1", [observation_id]);
        res.json("Observation" + observation_id + "was deleted.");
    } catch (error) {
        console.error(error);
    }
})

// perform plant_types operations
app.post("/plant_types", async(req: Request, res: Response) => {
    try {
        const {plant_name} = req.body;
        const newPlantType = await pool.query("INSERT INTO plant_types (plant_name) VALUES ($1);", [plant_name]);

        res.json(newPlantType);
    } catch (error) {
        console.error(error);
    }
});


//get all plant_types

app.get("/plant_types", async(req: Request, res: Response) => {
    try {
        const allPlantTypes = await pool.query("SELECT * FROM plant_types");
        res.json(allPlantTypes.rows);
    } catch (error) {
        console.error(error);
    }
})

//get a plant_type by id

app.get("/plant_types/id", async(req: Request, res: Response) => {
    try {
        const {plant_type_id} = req.body;
        const plantType = await pool.query("SELECT * FROM plant_types WHERE plant_type_id = $1", [plant_type_id]);
        res.json(plantType.rows[0]);
    } catch (error) {
        console.error(error);
    }
})

//update a plant_name by its id

app.put("/plant_types/id", async(req: Request, res: Response) => {
    try {
        const {plant_type_id, plant_name} = req.body;
        await pool.query("UPDATE plant_types SET plants_name = $1 WHERE plant_type_id = $2", [plant_name, plant_type_id]);
        res.json("Plant " + plant_type_id + " was updated.");
    } catch (error) {
        console.error(error);
    }
})

// // delete a plant_type

app.delete("/plant_types", async(req: Request, res: Response) => {
    try {
        const {plant_type_id} = req.body;
        await pool.query("DELETE FROM plant_types WHERE plant_type_id = $1", [plant_type_id]);
        res.json("Plant Type" + plant_type_id + "was deleted.");
    } catch (error) {
        console.error(error);
    }
})