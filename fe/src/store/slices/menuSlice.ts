import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Menu {
  id: string;
  name: string;
  depth: number;
}

interface MenuState {
  data: Menu[];
  option: Menu[];
  depth: number;
}

const initialState: MenuState = {
  data: [],
  option: [],
  depth: 0,
};

const menuSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setDataMenu: (state, action: PayloadAction<MenuState['data']>) => {
      state.data = action.payload;
    },
    setDepth: (state, action: PayloadAction<MenuState['depth']>) => {
      state.depth = action.payload;
    },
  },
});

export const { setDataMenu, setDepth } = menuSlice.actions;
export default menuSlice.reducer;
