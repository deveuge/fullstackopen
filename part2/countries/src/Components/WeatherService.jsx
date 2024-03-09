import axios from "axios";
const baseUrl = "https://api.open-meteo.com/v1/forecast";

const get = (latitude, longitude) => {
  const data = { latitude, longitude, current: "temperature_2m,wind_speed_10m" };
  const request = axios.get(baseUrl, { params: data });
  return request.then((response) => response.data);
};

export default {
  get,
};
