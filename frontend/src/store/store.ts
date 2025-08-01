import { JwtPayload } from 'jwt-decode';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

type User = {
  user_id: number | null;
  username: string | null;
}

type BaseState = {
  // Define your state properties here
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

type AuthState = {
  allUserData: User | null ;
  userLoading: boolean;
  setUserLoading: (userLoading: boolean) => void;
  user: () => User;
  setUser: (user: User | null) => void;
  isLoggedIn: () => boolean;
}

type BloggieStore = BaseState & AuthState;

/* Creating base state */
const createBaseSlice = (
  devtools<BaseState>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
  }),
  { name: 'base' } 
)
);


/* Creating auth state */
const createAuthSlice = (
  devtools<AuthState>(
    (set, get) => ({
      // Define the 'allUserData' state variable and initialize it to null.
      allUserData: null, // Use this to store all user data

      // Define the 'loading' state variable and initialize it to false.
      userLoading: false,

      // Define a function 'user' that returns an object with user-related data.
      user: () => ({
        user_id: get().allUserData?.user_id || null,
        username: get().allUserData?.username || null
      }),

      // Define a function 'setUser' that allows setting the 'allUserData' state.
      setUser: (user: User | null) => set({ allUserData: user }),

      // Define a function 'setLoading' that allows setting the 'loading' state.
      setUserLoading: (userLoading) => set({ userLoading }),

      // Define a function 'isLoggedIn' that checks if 'allUserData' is not null.
      isLoggedIn: () => get().allUserData !== null
    }),
    { name: 'auth' } 
  )
);

/* Mixed them slices into a unified store */
export const useBloggieStore = create<BloggieStore>()(
  devtools((...args) => ({
    ...createBaseSlice(...args),
    ...createAuthSlice(...args)
  })),
)
