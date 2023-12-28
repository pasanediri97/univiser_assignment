export const convertKelvinToCelsius = (kelvin: number): string => {
  return (kelvin - 273.15).toFixed(1);
};
