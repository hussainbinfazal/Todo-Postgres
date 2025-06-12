const pool = require('../Database/db');


const createTodo = async (req, res) => {
    try {
        //user_id should be taken from the token of the user //
        const { title, description, status, } = req.body;
        let existingTodo;

        if (description) {
            // Check if a todo with the same title and description exists
            existingTodo = await pool.query(
                "SELECT * FROM todo WHERE title = $1 AND description = $2 LIMIT 1",
                [title, description]
            );
        } else {
            // If no description is provided, check if a todo with the same title exists
            existingTodo = await pool.query(
                "SELECT * FROM todo WHERE title = $1 LIMIT 1",
                [title]
            );
        }

        if (existingTodo.rows.length > 0) {
            // If the todo already exists, return an error or message
            return res.status(400).json({
                message: "Todo already exists",
            });
        }
        let newTodo;
        if (description === "") {
            newTodo = await pool.query(
                "INSERT INTO todo (title,status) VALUES($1, $2) RETURNING *",
                [title, status]
            );
        } else {
            newTodo = await pool.query(
                "INSERT INTO todo (title, description, status) VALUES($1, $2, $3) RETURNING *",
                [title, description, status]
            );
        }
        console.log("Todo created successfully", newTodo.rows[0]);
        res.status(201).json({
            message: "Todo created successfully",
            todo: newTodo.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message || "Server error" });
    }
};
const getTodos = async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.status(200).json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message || "Server error" });
    }
};

const getParticularTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [todoId]);

        res.status(200).json({
            "message": "Todo fetched successfully",
            "todo": todo.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message || "Server error" });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { title, description, status } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET  status = $1,title = $2, description = $3, updated_at = CURRENT_TIMESTAMP WHERE todo_id = $4 RETURNING *",
            [status, title, description, todoId]
        );
        res.status(200).json({
            "message": "Todo updated successfully",
            "todo": updateTodo.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message || "Server error" });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [todoId]);
        res.status(200).json({
            "message": "Todo deleted successfully",
            "todo": deleteTodo.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message || "Server error" });
    }
};

const completeTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { status } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE todo_id = $2 RETURNING *",
            [status, todoId]
        );
        res.status(200).json({
            "message": "Todo updated successfully",
            "todo": updateTodo.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message || "Server error" });
    }
};

module.exports = {
    createTodo,
    getTodos,
    getParticularTodo,
    updateTodo,
    deleteTodo,
    completeTodo
};