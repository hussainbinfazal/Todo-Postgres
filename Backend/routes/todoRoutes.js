const express = require('express');
const router = express.Router();
const { getTodos,completeTodo, createTodo, updateTodo, deleteTodo,getParticularTodo } = require('../controllers/todoController');


router.get('/', getTodos);
router.post('/', createTodo);
router.get('/:todoId', getParticularTodo);
router.delete('/:todoId', deleteTodo);
router.put('/:todoId', updateTodo);
router.put('/status/:todoId', completeTodo);

module.exports = router;