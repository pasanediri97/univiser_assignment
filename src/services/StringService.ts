class StringService {
  static strings = {
    celcius: '°C',
    welcome: 'Welcome',
    goodbye: 'Goodbye',
  };

  static indicators = {
    celcius: '°C',
    pressure: 'hPa',
    percentage: '%',
    meters: 'm',
    speed: 'm/s',
    degrees: '°',
  };

  static weatherDetails = {
    feelsLike: 'Feels Like',
    pressure: 'Pressure',
    humidity: 'Humidity',
    dew_point: 'Dew Point',
    uvi: 'UV Index',
    clouds: 'Clouds',
    visibility: 'Visibility',
    wind_speed: 'Wind Speed',
    wind_deg: 'Wind Direction',
    wind_gust: 'Wind Gust',
  };

  static errorMessages = {
    notFound: 'Resource not found',
    serverError: 'Internal server error',
  };

  static permissionStrings = {
    locationAccessRequired: 'Location Access Required',
    thisAppNeedsAccessLocation: 'This App needs to Access your location',
    allow: 'Allow',
  };
}

export default StringService;
