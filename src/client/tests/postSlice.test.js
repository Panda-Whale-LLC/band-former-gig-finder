import postReducer, { addPost, initialState } from '../slices/postSlice';
import { configureStore } from '@reduxjs/toolkit';

// Mocking the fetch request 
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ id: 1, title: 'Test Post', description: 'Test post description'})
    }))