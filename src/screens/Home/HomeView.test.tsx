import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native'; 
import Geolocation from '@react-native-community/geolocation';
import {fetchWeatherData} from '../../../redux/thunks/weatherThunk';

import {useSelector} from 'react-redux';
import {HomeView} from './HomeView';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigators/RootStackParamList';

type HomeViewProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeView'>;
};

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
  requestAuthorization: jest.fn(),
}));

jest.mock('react-native/Libraries/Image/Image', () => ({
  ...jest.requireActual('react-native/Libraries/Image/Image'),
  prefetch: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({navigate: jest.fn(), setOptions: jest.fn()}),
}));

describe('HomeView component', () => {
  const mockWeatherData = {
    timezone: 'Asia/Colombo',
    current: {
      weather: [{icon: '01d', main: 'Clear', description: 'Clear sky'}],
      temp: 300,
      feels_like: 298,
      pressure: 1010,
      humidity: 50,
      dew_point: 290,
      uvi: 5,
      clouds: 20,
      visibility: 10000,
      wind_speed: 5,
      wind_deg: 180,
    },
  };
  const mockLoading = false;
  const mockError = null;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  (useSelector as jest.Mock).mockReturnValueOnce(mockWeatherData);
  (useSelector as jest.Mock).mockReturnValueOnce(mockLoading);
  (useSelector as jest.Mock).mockReturnValueOnce(mockError);

  test('renders correctly with weather data', () => {
    const mockNavigate = jest.fn();
    const {getByTestId} = render(
      <HomeView
        navigation={
          {
            navigate: mockNavigate,
            setOptions: jest.fn(),
          } as unknown as HomeViewProps['navigation']
        }
      />,
    );
    expect(getByTestId('timezone')).toBeDefined();
    expect(getByTestId('weather-main')).toBeDefined();
    expect(getByTestId('weather-description')).toBeDefined();
  });

  test('handles refresh correctly', async () => {
    const mockNavigate = jest.fn();

    const {getByTestId} = render(
      <HomeView
        navigation={
          {
            navigate: mockNavigate,
            setOptions: jest.fn(),
          } as unknown as HomeViewProps['navigation']
        }
      />,
    );

    fireEvent.press(getByTestId('refresh-button'));
    await act(async () => {
      expect(setInterval).toHaveBeenCalledTimes(1);
    });
  });

  test('requests location permission and fetches weather data on mount', async () => {
    const mockNavigate = jest.fn();

    const {getByTestId} = render(
      <HomeView
        navigation={
          {
            navigate: mockNavigate,
            setOptions: jest.fn(),
          } as unknown as HomeViewProps['navigation']
        }
      />,
    );

    (Geolocation.requestAuthorization as jest.Mock).mockResolvedValue(
      'granted',
    );
    (Geolocation.getCurrentPosition as jest.Mock).mockImplementation(
      (success, error, options) => {
        success({
          coords: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
        });
      },
    );

    expect(Geolocation.requestAuthorization).toHaveBeenCalled();
    expect(Geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(fetchWeatherData).toHaveBeenCalled();
  });

  test('handles interval correctly', () => {
    const mockNavigate = jest.fn();

    render(
      <HomeView
        navigation={
          {
            navigate: mockNavigate,
            setOptions: jest.fn(),
          } as unknown as HomeViewProps['navigation']
        }
      />,
    );

    jest.advanceTimersByTime(1000);
  });
});
