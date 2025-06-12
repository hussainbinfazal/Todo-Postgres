const pool = require('../Database/db');


const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (name, email, age) VALUES($1, $2, $3) RETURNING *",
            [name, email, age]
        );
        res.status(201).json({
            message: "User created successfully",
            user: newUser.rows[0]
        });
    } catch (err) {
        console.error(err.message);
    }
};

const getUser = async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
};




module.exports = { createUser, getUser};


