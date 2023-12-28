import { Dispatch } from "redux";
import WeatherData from "./models/weather_data";

export const SET_DATA = 'SET_DATA';

export const setData = (weatherData: WeatherData) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: 'SET_DATA',
      payload: weatherData,
    });
  };
};