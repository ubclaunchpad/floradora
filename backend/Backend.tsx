import express from "express";
const app = express();
import cors from "cors";
import pool from "./db";
import {Request, Response} from 'express'
import { Server } from "http";

//middleware
app.use(cors())
app.use(express.json()); //req body


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

// //update a user

app.put("/users/:id", async(req: Request, res: Response) => {
    try {
        const {user_id, email, display_name} = req.body;
        await pool.query("UPDATE users SET display_name = $1, email = $2 WHERE user_id = $3", [display_name, email, user_id]);
        res.json("User " + user_id + " was updated.");
    } catch (error) {
        console.error(error);
    }
})

// // delete a user

app.delete("/users", async(req: Request, res: Response) => {
    try {
        const {user_id} = req.body;
        await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
        res.json("User" + user_id + "was deleted.");
    } catch (error) {
        console.error(error);
    }
})

const server: Server = app.listen(8080, () => {
    console.log("Server is listning on port 8080")
});
export default server;