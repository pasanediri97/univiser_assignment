import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchWeatherData} from '../thunks/weatherThunk';
import {RootState} from '../store';
import WeatherData from '../models/weather_data';

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWeatherData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherData.fulfilled,
        (state, action: PayloadAction<WeatherData>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

// Selectors
export const selectWeatherData = (state: WeatherState) => state.data;
export const selectWeatherLoading = (state: WeatherState) => state.loading;
export const selectWeatherError = (state: WeatherState) => state.error;

export default weatherSlice.reducer;
