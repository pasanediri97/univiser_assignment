import axios, {AxiosInstance} from 'axios';

class ApiService {
  private apiInstance: AxiosInstance;

  private constructor() {
    this.apiInstance = axios.create({
      baseURL: process.env.BASE_URL,
      timeout: 5000,
      params: {
        appid: process.env.OPEN_WEATHER_APP_ID,  
      },
    });
  }

  static getInstance(): ApiService {
    return new ApiService();
  }

  get = async (url: string, params?: any) => {
    try {
      const response = await this.apiInstance.get(url, {params});
      return response.data;
    } catch (error) {
      throw error;
    }
  }; 

  fetchWeatherData = async (lat: number, lon: number) => {
    const endpoint = '/onecall';
    const params = {
      lat,
      lon,
      exclude: 'minutely,hourly,daily,alerts',
    };

    try {
      const weatherData = await this.get(endpoint, params);
      return weatherData;
    } catch (error) {
      throw error;
    }
  };
}

export default ApiService;
