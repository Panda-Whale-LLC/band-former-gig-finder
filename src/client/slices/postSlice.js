import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  posts: [],
  status: 'idle', 
  error: null,
};

// Async thunk action for fetching posts
export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
 
  const response = await fetch('/posts');
  if(!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
});

//Async thunk for adding new post
export const addNewPost = createAsyncThunk('post/addNewPost', async (newPost)=> {
  const response = await fetch('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error('Failed to add new post');
  }
  return response.json();
});

//Async thunk for deleting post
export const deletePost = createAsyncThunk('post/deletePost', async (postId, { rejectWithValue })=> {
  try {
    const response = await fetch(`/posts/${postId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Delete failed with status: ${response.status}`);
    }
    return postId;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice
const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // would add synchronous reducers here e.g. filterposts
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // assuming the payload is an array of posts
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Assuming the payload is a single post object
        state.posts.push(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        // Assuming the payload is the id of the post to delete
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message; // or action.payload if that is what is intended
      });
  },
});

export const postActions = { fetchPosts, addNewPost, deletePost };

export default postSlice.reducer;
