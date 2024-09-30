import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CharityState {
  charities: any[];
}

const initialState: CharityState = {
  charities: [],
};

const charitySlice = createSlice({
  name: 'charity',
  initialState,
  reducers: {
    setCharities: (state, action: PayloadAction<any[]>) => {
      state.charities = action.payload;
    },
  },
});

export const { setCharities } = charitySlice.actions;
export default charitySlice.reducer;
