import { createSlice } from "@reduxjs/toolkit";

import axios from 'axios';


const initialState = {
    todos: [],
    loading: false,
    error: null,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        createTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        getTodos: (state, action) => {
            state.todos = action.payload;
            

        },
        updateTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo.todo_id === action.payload.todo_id);
            if (index !== -1) {
              // To make sure the array is replaced immutably
              state.todos = [
                ...state.todos.slice(0, index),
                action.payload,
                ...state.todos.slice(index + 1),
              ];
            }
          },
        completed: (state, action) => {
            const index = state.todos.findIndex(todo => todo.todo_id === action.payload.todo_id);
            if (index !== -1) {
                state.todos[index].status = action.payload.status;  // Update the status of the specific todo
            }
            
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.todo_id !== action.payload.todo_id);  // Remove the todo from the array
           
        }


    }
});

export const { createTodo, getTodos, updateTodo, deleteTodo,completed } = todoSlice.actions;
export default todoSlice.reducer;