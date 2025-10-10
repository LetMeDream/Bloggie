import { configureStore, createSlice } from '@reduxjs/toolkit'

const baseSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: {
      id: null,
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

export const { setReduxUser } = baseSlice.actions;

export const newStore = configureStore({
  reducer: {
    auth: baseSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof newStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof newStore.dispatch