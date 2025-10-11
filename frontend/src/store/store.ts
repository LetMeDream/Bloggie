import { configureStore, createSlice } from '@reduxjs/toolkit'

/* Define a slice for authentication */
const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: {
      user_id: null,
      username: null,
      email: null,
    }
  },
  reducers: {
    // Here go the reducers
    setReduxUser(state, action) {
      state.user = action.payload
    }
  }
})

/* Define a slice for base state */
const baseSlice = createSlice({
  name: 'base',
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
})

/* Export required actions */
export const { setReduxUser } = authSlice.actions;
export const { setLoading, setError } = baseSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    base: baseSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch