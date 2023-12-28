import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWeatherData} from '../../../redux/thunks/weatherThunk';
import {
  AppDispatch,
  selectWeatherData,
  selectWeatherError,
  selectWeatherLoading,
} from '../../../redux';
import Geolocation from '@react-native-community/geolocation';
import {globalStyles} from '@/theme/style';
import {styles} from './styles';
import moment from 'moment';
import {convertKelvinToCelsius} from '@/utils/weatherUtils';
import {InfoContainer} from '@/components/InfoContainer/InfoContainer';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@/navigators/RootStackParamList';
import {useNavigation} from '@react-navigation/native';
import {Loader} from '@/components/loader';
import images from '@/theme/assets/Images/images';
import StringService from '@/services/StringService';

type HomeViewProps = {
  navigation: StackNavigationProp<RootStackParamList, 'HomeView'>;
};

const HomeView: React.FC<HomeViewProps> = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeView'>>();

  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useSelector(selectWeatherData);
  const loading = useSelector(selectWeatherLoading);
  const apiError = useSelector(selectWeatherError);

  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, [dispatch]);

  useEffect(() => {}, [apiError]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const formattedDateTime = moment().format('MMMM Do YYYY, h:mm:ss a');
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    requestLocationPermission();
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: StringService.permissionStrings.locationAccessRequired,
            message: StringService.permissionStrings.thisAppNeedsAccessLocation,
            buttonPositive: StringService.permissionStrings.allow,
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation();
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        dispatch(
          fetchWeatherData({lat: currentLatitude, lon: currentLongitude}),
        );
      },
      error => {},
      {
        enableHighAccuracy: false,
      },
    );
  };

  return (
    <SafeAreaView style={globalStyles.containerPrimary}>
      <View style={[globalStyles.mr10,globalStyles.mt10,globalStyles.alignEnd]}>
        <TouchableOpacity onPress={handleRefresh} testID="refresh-button">
          <Image style={styles.refreshIcon} source={images.ic_refresh} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        {weatherData != null && (
          <View style={styles.mainContainer}>
            <Text style={[styles.text1, globalStyles.pt16]} testID="timezone">
              {weatherData.timezone}
            </Text>
            <Text style={[styles.text2, globalStyles.pt16]}>
              {currentDateTime}
            </Text>

            <View style={styles.weatherImageContainer}>
              <Image
                resizeMode="contain"
                style={styles.weatherImage}
                source={{
                  uri: `${process.env.WEATHER_IMAGE_BASE_URL}${weatherData.current.weather[0].icon}@2x.png`,
                }}
              />
              <Text style={[styles.text4]} testID="weather-main">
                {weatherData.current.weather[0].main}
              </Text>
              <Text style={[styles.text5]} testID="weather-description">
                {weatherData.current.weather[0].description}
              </Text>
            </View>

            <View style={styles.tempContainer}>
              <Text style={styles.text3}>
                {convertKelvinToCelsius(weatherData.current.temp)}{' '}
              </Text>
              <Text style={styles.celsiusIndicator}>°C</Text>
            </View>
            <View style={[styles.infoContainerList, globalStyles.pt16]}>
              <InfoContainer
                value={convertKelvinToCelsius(weatherData.current.feels_like)}
                label={StringService.weatherDetails.feelsLike}
                indicator={StringService.indicators.celcius}
              />

              <InfoContainer
                value={weatherData.current.pressure}
                label={StringService.weatherDetails.pressure}
                indicator={StringService.indicators.pressure}
              />

              <InfoContainer
                value={weatherData.current.humidity}
                label={StringService.weatherDetails.humidity}
                indicator={StringService.indicators.percentage}
              />

              <InfoContainer
                value={convertKelvinToCelsius(weatherData.current.dew_point)}
                label={StringService.weatherDetails.dew_point}
                indicator={StringService.indicators.celcius}
              />

              <InfoContainer
                value={weatherData.current.uvi}
                label={StringService.weatherDetails.uvi}
                indicator={''}
              />

              <InfoContainer
                value={weatherData.current.clouds}
                label={StringService.weatherDetails.clouds}
                indicator={StringService.indicators.percentage}
              />

              <InfoContainer
                value={weatherData.current.visibility}
                label={StringService.weatherDetails.visibility}
                indicator={StringService.indicators.meters}
              />

              <InfoContainer
                value={weatherData.current.wind_speed}
                label={StringService.weatherDetails.wind_speed}
                indicator={StringService.indicators.speed}
              />

              <InfoContainer
                value={weatherData.current.wind_deg}
                label={StringService.weatherDetails.wind_deg}
                indicator={StringService.indicators.degrees}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {(loading || !weatherData) && <Loader />}
    </SafeAreaView>
  );
};

export {HomeView};
