import {createAsyncThunk} from '@reduxjs/toolkit';
import ApiService from '../../src/services/ApiService';

const apiService = ApiService.getInstance();

interface FetchWeatherDataParams {
  lat: number;
  lon: number;
}

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchData',
  async (params: FetchWeatherDataParams, {rejectWithValue}) => {
    try {
      const data = await apiService.fetchWeatherData(params.lat, params.lon);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
