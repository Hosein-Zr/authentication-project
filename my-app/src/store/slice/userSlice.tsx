import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  selectedUserId: number | null;
}

const initialState: UserState = {
  selectedUserId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number>) => {
      console.log('Updating selectedUserId to:', action.payload);
      state.selectedUserId = action.payload;
    },
  },
});

export const { setSelectedUserId } = userSlice.actions;

export default userSlice.reducer;
